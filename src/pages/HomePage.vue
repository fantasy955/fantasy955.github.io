<template>
    <div class="cantainer">
        <canvas class="background"></canvas>
        <div>没有内容</div>
        <div class="friends"></div>
    </div>
</template>

<script setup>
import { Particles } from 'particlesjs';
import { onMounted, watch } from 'vue';
// import { useScreenSize } from '@/stores/screenWidth';
// import { debounce } from '@/utils/common';

var particles = null;

onMounted(() => {
    particles = Particles.init({
        selector: '.background'
    });
})

</script>

<style scoped>
.friends {
    display: flex;
    flex-wrap: wrap;
}

.friends>.friends__item {}

.cantainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    min-height: 900px;
    z-index: 1;
}

.background {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 0;
}
</style>