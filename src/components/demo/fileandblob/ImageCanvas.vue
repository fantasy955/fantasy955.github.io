<template>
    <div class="d-flex w-100 p-3 flex-wrap">
        <input type="file" ref="btnInput" class="btn" accept="image/png, image/jpeg" @change="handleFileChange" />
        <a class="btn btn-primary" ref="btnDownload" href="javascript:void(0)" @click="downloadCanvas">保存文件</a>
        <div class="border w-100 m-2 d-flex flex-wrap">
            <button class="btn btn-secondary m-1" @click="graying">黑白化</button>
        </div>
        <div class="d-block w-100 overflow-auto">
            <canvas ref="canvas" class="mw-100"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const canvas = ref(null);
const btnDownload = ref(null);
const btnInput = ref(null);
const handleFileChange = (e) => {
    const file = e.target.files[0];
    const context = canvas.value.getContext('2d');
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
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
</script>

<style scoped>

</style>