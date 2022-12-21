<template>
    <div class="frame-body" ref="body">
        <div class="mask" @click="jump" v-show="showIFrame"></div>
        <iframe :src=target v-show="showIFrame" ref="iframeRef"></iframe>
        <div v-show="!showIFrame" class="error">{{ msg }}</div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, onBeforeUnmount, ref } from 'vue';
const props = defineProps({
    target: String,
    preview: {
        type: String,
        required: false,
    },
});
const body = ref(null);
const showIFrame = ref(true);
const iframeRef = ref(null);
const msg = ref('');

const iframeBlockedHandler = function (error) {
    showIFrame.value = false;
    console.log(error);
    msg.value = error
}

onMounted(() => {
    document.addEventListener('error', iframeBlockedHandler, true);
    // console.log(iframeRef.value);
})

onBeforeUnmount(() => {
    document.removeEventListener('error', iframeBlockedHandler);
})

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