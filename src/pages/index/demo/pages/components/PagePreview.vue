<template>
    <div class="frame-body">
        <div class="mask" @click="jump"></div>
        <slot>
            <iframe :src=target></iframe>
        </slot>
    </div>
</template>

<script setup>
import { defineProps, onMounted, onBeforeUnmount, ref } from 'vue';
const props = defineProps({
    target: {
        type: String,
        required: false,
    },
});


const jump = function () {
    if (props.target) {
        const doJump = confirm('跳转到目标页面?');
        if (doJump) {
            window.open(props.target);
        }
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

.error {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 100%;
    transform: scale(0.9);
    color: red;
    overflow: auto;
}
</style>