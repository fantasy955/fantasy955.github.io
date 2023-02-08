<template>
    <div class="d-flex w-100 p-3 flex-wrap">
        <input type="file" ref="btnInput" class="btn" accept="image/png, image/jpeg" @change="handleFileChange" />
        <a class="btn btn-primary" ref="btnDownload" href="javascript:void(0)" @click="downloadCanvas">保存文件</a>
        <div class="border w-100 d-flex mb-2 mt-2 flex-wrap">
            <button class="btn btn-secondary m-1" @click="graying">黑白化</button>
            <button class="btn m-1" :class="activateAddBox ? `btn-primary` : `btn-secondary`"
                @click="addBoxEvent">绘制矩形框</button>
        </div>
        <div class="d-block w-100 overflow-auto border">
            <canvas ref="canvas" class="mw-100"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { debounce } from '@/utils/common';

const canvas = ref(null);
const btnDownload = ref(null);
const btnInput = ref(null);
const activateAddBox = ref(false);

const handleFileChange = (e) => {
    const file = e.target.files[0];
    const context = canvas.value.getContext('2d');
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
    uninstallAllEvent();
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            canvas.value.width = img.width;
            canvas.value.height = img.height;
            // 先是参考自己的本身画布大小进行绘制，绘制完毕，由style指定的大小，渲染在浏览器页面
            context.drawImage(img, 0, 0);
        }
    }
}

const downloadCanvas = () => {
    if (btnInput.value.files[0]) {
        var imgURL = canvas.value.toDataURL({ format: "image/png" });
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

function getEventPositionOffset(event, el) {
    const { x: ex, y: ey } = getEventPosition(event);
    const { left, top } = offset(el);
    const [x, y] = [ex - left, ey - top];
    return { x, y };
}

// get the ration of true imageWidh / canvas width
const getCanvasRatio = () => {
    // the border of canvas will effect canvas.value.clientWidth
    const clientWidth = canvas.value.clientWidth;
    const imageWidth = canvas.value.width;
    const ratio = imageWidth / clientWidth;
    return ratio;
}

// can't be defined in addBoxEvent
// must keep canvasClickHandlerBox be the same Function Object
let boxStartPoint = null;
const canvasClickHandlerBox = (e) => {
    // console.log(ratio);
    const { x, y } = getEventPositionOffset(e, canvas.value);
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
    const context = canvas.value.getContext('2d');
    if (boxStartPoint !== null) {
        if (boxEndPoint !== null) {
            // 清空之前的box
            context.clearRect(boxStartPoint.x, boxStartPoint.y,
                boxEndPoint.x - boxStartPoint.x, boxEndPoint.y - boxStartPoint.y);
        }
        const { x, y } = getEventPositionOffset(e, canvas.value);
        boxEndPoint = { x, y };
        // 绘制
        const ratio = getCanvasRatio();
        context.beginPath();
        context.fillStyle = "#34c24e";
        context.fillRect(boxStartPoint.x, boxStartPoint.y,
            boxEndPoint.x - boxStartPoint.x, boxEndPoint.y - boxStartPoint.y);
        context.closePath();
        // console.log(`(${boxStartPoint.x}, ${boxStartPoint.y}) -> (${x}, ${y})`);
    }

}, 0);

const uninstallBoxEvent = () => {
    // console.log('卸载事件');
    boxStartPoint = null;
    boxEndPoint = null;
    canvas.value.removeEventListener('click', canvasClickHandlerBox, true);
    canvas.value.removeEventListener('mousemove', canvasMousemoveHandlerBox, true);
}

const addBoxEvent = () => {
    activateAddBox.value = !activateAddBox.value;
    if (activateAddBox.value) {
        // console.log('添加事件');
        // the only option removeEventListener() checks is 
        // the capture/useCapture flag. Its value must match for removeEventListener() to match, 
        // but the other values don't.
        canvas.value.addEventListener('click', canvasClickHandlerBox, true);
        canvas.value.addEventListener('mousemove', canvasMousemoveHandlerBox, true);
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
</script>

<style scoped>

</style>