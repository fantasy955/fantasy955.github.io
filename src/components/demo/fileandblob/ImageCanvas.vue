<template>
    <div class="d-flex w-100 p-3 flex-wrap">
        <input type="file" ref="btnInput" class="btn" accept="image/png, image/jpeg" @change="handleFileChange" />
        <a class="btn btn-primary" ref="btnDownload" href="javascript:void(0)" @click="downloadCanvas">保存文件</a>
        <div class="border w-100 d-flex mb-2 mt-2 flex-wrap">
            <button class="btn btn-secondary m-1" @click="graying">黑白化</button>
            <button class="btn m-1" :class="activateAddBox ? `btn-primary` : `btn-secondary`"
                @click="addBoxEvent">绘制矩形框</button>
        </div>
        <div class="d-block w-100 border" style="position: relative; overflow: hidden;">
            <canvas ref="canvas" class="mw-100"></canvas>
            <canvas ref="modCanvas" class="mw-100" style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { debounce } from '@/utils/common';
import { Canvas } from '@antv/g-canvas';

const canvas = ref(null);
const btnDownload = ref(null);
const btnInput = ref(null);
const activateAddBox = ref(false);
const modCanvas = ref(null);
let ratio = 1;
let preRation = 1;

const handleFileChange = (e) => {
    const file = e.target.files[0];
    const context = canvas.value.getContext('2d');
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
    uninstallAllEvent();
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            canvas.value.width = modCanvas.value.width = img.width;
            canvas.value.height = modCanvas.value.height = img.height;
            // 先是参考自己的本身画布大小进行绘制，绘制完毕，由style指定的大小，渲染在浏览器页面
            context.drawImage(img, 0, 0);
            updateCanvasRatio();
        }
    }
}

const downloadCanvas = () => {
    if (btnInput.value.files[0]) {
        const targetCanvas =document.createElement("canvas");
        const availableCanvasList = document.querySelectorAll('canvas');
        targetCanvas.width = canvas.value.width;
        targetCanvas.height = canvas.value.height;
        const context = targetCanvas.getContext('2d');
        for(const _canvas of availableCanvasList){
            context.drawImage(_canvas, 0, 0);
        }
        var imgURL = targetCanvas.toDataURL({ format: "image/png" });
        btnDownload.value.download = `_${btnInput.value.files[0].name}`;
        btnDownload.value.href = imgURL;
    }
}

const graying = (e) => {
    const option = window.confirm('此过程不可逆，是否继续');
    if (!option) { return }
    const context = canvas.value.getContext('2d');
    const imgData = context.getImageData(0, 0, canvas.value.width, canvas.value.height);   //获取图片数据对象
    if (!imgData) {
        return;
    }
    const data = imgData.data;  //获取图片数据数组，该数组中每个像素用4个元素来保存，分别表示红、绿、蓝和透明度值
    let average = 0;
    for (var i = 0; i < data.length; i += 4) {
        average = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);  //将红、绿、蓝色值求平均值后得到灰度值
        data[i] = data[i + 1] = data[i + 2] = average; //将每个像素点的色值重写
    }
    context.putImageData(new ImageData(data, canvas.value.width, canvas.value.height), 0, 0);  //将处理后的图像数据重写至Canvas画布，此时画布中图像变为黑白色
}

function offset(el) {
    // get the client offset of the target element
    let top = el.offsetTop
    let left = el.offsetLeft
    while (el.offsetParent) {
        el = el.offsetParent
        top += el.offsetTop
        left += el.offsetLeft
    }
    return {
        left: left,
        top: top
    }
}

function getEventPosition(ev) {
    let x, y;
    //注：使用这个函数，需要给Canvas元素的position设为absolute。
    if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return { x: x, y: y };
}
/**
 * 
 * @param {*} event 事件
 * @param {*} el 事件所在element
 * @param {*} absolute 事件所在element是否是绝对定位
 */
function getEventPositionOffset(event, el, absolute) {
    const { x: ex, y: ey } = getEventPosition(event);
    if (absolute) {
        return { x: ex, y: ey };
    }
    console.log('指针坐标', ex, ey);
    const { left, top } = offset(el);
    console.log('偏移', left, top);
    const [x, y] = [ex - left, ey - top];
    return { x, y };
}

// get the ration of true imageWidh / canvas width
const updateCanvasRatio = () => {
    // the border of canvas will effect canvas.value.clientWidth
    const clientWidth = canvas.value.clientWidth;
    const imageWidth = canvas.value.width;
    ratio = imageWidth / clientWidth;
    // console.log('更新ratio: ', ratio, clientWidth, imageWidth);
    return ratio;
}

// can't be defined in addBoxEvent
// must keep canvasClickHandlerBox be the same Function Object
let boxStartPoint = null;
const canvasClickHandlerBox = (e) => {
    // console.log(ratio);
    const { x, y } = getEventPositionOffset(e, modCanvas.value, true);
    // console.log(x, y);
    if (boxStartPoint === null) {
        boxStartPoint = { x, y };
    } else {
        // clean work
        boxStartPoint = null;
        boxEndPoint = null;
    }
}

let boxEndPoint = null;
const canvasMousemoveHandlerBox = debounce((e) => {
    const context = modCanvas.value.getContext('2d');
    if (boxStartPoint !== null) {
        if (boxEndPoint !== null) {
            // 清空之前的box
            context.clearRect(boxStartPoint.x * preRation, boxStartPoint.y * preRation,
                (boxEndPoint.x - boxStartPoint.x) * preRation, (boxEndPoint.y - boxStartPoint.y) * preRation);
        }
        const { x, y } = getEventPositionOffset(e, canvas.value, true);
        boxEndPoint = { x, y };
        // 绘制

        context.beginPath();
        context.fillStyle = "#34c24e";
        context.fillRect(boxStartPoint.x * ratio, boxStartPoint.y * ratio,
            (boxEndPoint.x - boxStartPoint.x) * ratio, (boxEndPoint.y - boxStartPoint.y) * ratio);
        context.closePath();
        // console.log(`(${boxStartPoint.x}, ${boxStartPoint.y}) -> (${x}, ${y})`);
        preRation = ratio;
    }

}, 0);

const uninstallBoxEvent = () => {
    // console.log('卸载事件');
    boxStartPoint = null;
    boxEndPoint = null;
    modCanvas.value.removeEventListener('click', canvasClickHandlerBox, true);
    modCanvas.value.removeEventListener('mousemove', canvasMousemoveHandlerBox, true);
}

const addBoxEvent = () => {
    activateAddBox.value = !activateAddBox.value;
    if (activateAddBox.value) {
        // console.log('添加事件');
        // the only option removeEventListener() checks is 
        // the capture/useCapture flag. Its value must match for removeEventListener() to match, 
        // but the other values don't.
        modCanvas.value.addEventListener('click', canvasClickHandlerBox, true);
        modCanvas.value.addEventListener('mousemove', canvasMousemoveHandlerBox, true);
    } else {
        uninstallBoxEvent();
    }
}
const uninstallAllEvent = () => {
    if (activateAddBox.value) {
        activateAddBox.value = false;
        uninstallBoxEvent();
    }
}
onMounted(() => {
    updateCanvasRatio();
    window.addEventListener('resize', updateCanvasRatio);
})
onUnmounted(() => {
    window.removeEventListener('resize', updateCanvasRatio);
})
</script>

<style scoped>

</style>