<template>
    <div class="cantainer">
        <canvas class="background"></canvas>
        <div>没有内容</div>
        <div class="friends"></div>
    </div>
</template>

<script setup>
import { Particles } from 'particlesjs';
import { onMounted } from "vue";

var particles = null;

onMounted(() => {
    particles = Particles.init({
        selector: '.background',
        connectParticles: true,
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
    width: 100%;
    height: 100%;
    min-height: 900px;
}

.background {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 0;
}
</style>