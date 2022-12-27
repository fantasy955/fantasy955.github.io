<template>
    <div class="cantainer">
        <vue-particles class="canvas" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle"
            :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
            :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
            clickMode="push">
        </vue-particles>
        <IntroductionPanel />
        <div class="friends"></div>
        <component src="./assets/js/MathJaxConfig.js" :is="'script'"></component>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import IntroductionPanel from '@/components/home/IntroductionPanel.vue';

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
    padding: 12px;
    text-align: center;
}

.canvas {
    position: absolute;
    inset: 0;
}
</style>