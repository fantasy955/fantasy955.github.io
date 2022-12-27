<template>
    <div class="cantainer">
        <vue-particles class="canvas" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
            linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
            :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
        </vue-particles>
        <div>没有内容</div>
        <div class="friends"></div>
        <component src="./assets/js/MathJaxConfig.js" :is="'script'"></component>
    </div>
</template>

<script setup>
import { onMounted } from "vue";

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

.canvas {
    position: absolute;
    inset: 0;
}
</style>