import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'

const screenWidth = ref(document.body.clientWidth);
window.onresize = () =>
    (() => {
        screenWidth.value = document.body.clientWidth;
    })();

export function useScreenWidth() {
    return screenWidth;
}

const screenSize = reactive({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
});
window.onresize = () =>
    (() => {
        screenSize.height = document.documentElement.clientHeight;
        screenSize.width = document.documentElement.clientWidth;
    })();

export function useScreenSize() {
    return screenSize;
}
