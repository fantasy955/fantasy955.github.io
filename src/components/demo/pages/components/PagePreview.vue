<template>
    <div class="frame-body">
        <div class="mask" @click="jump"></div>
        <iframe :src=target></iframe>
    </div>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted } from 'vue';
const props = defineProps({
    target: String
});

const jump = function () {
    const doJump = confirm('跳转到目标页面?');
    if (doJump) {
        window.open(props.target);
    }
}

</script>

<style scoped>
.frame-body {
    display: block;
    position: relative;
    overflow: hidden;
    height: 92px;
    width: 192px;
    background-image: url('../assets/loading.gif');
    background-size: contain;
}

.frame-body>.mask {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    background-size: auto;
    z-index: 1;
    user-select: none;
    -moz-user-select: none;
    cursor: pointer;
}

.frame-body>iframe {
    position: absolute;
    width: 1920px;
    height: 920px;
    transform-origin: top left;
    transform: scale(0.1);
    left: 0;
    top: 0;
    z-index: 0;
}
</style>