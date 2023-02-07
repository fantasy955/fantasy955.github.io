<template>
    <div class="d-flex w-100 p-3 flex-wrap">
        <input type="file" class="btn" accept="image/png, image/jpeg" @change="handleFileChange" />
        <div class="d-block w-100 overflow-auto">
            <canvas ref="canvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const canvas = ref(null);
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            // console.log(img.width, img.height);
            // canvas.value.style.width = `${img.width}px`;
            // canvas.value.style.height = `${img.height}px`;
            canvas.value.width = img.width;
            canvas.value.height = img.height;
            const context = canvas.value.getContext('2d');
            context.clearRect(0, 0, canvas.value.width, canvas.value.height);
            context.drawImage(img, 0, 0);
        }
        canvas.value.si
    }
}
</script>

<style scoped>

</style>