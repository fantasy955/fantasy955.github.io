import { ref, onMounted, reactive, } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from '@/utils/common';

const screenWidth = ref(document.body.clientWidth);
window.addEventListener('resize', () => {
    screenWidth.value = document.body.clientWidth;
});

export function useScreenWidth() {
    return screenWidth;
}

const screenSize = reactive({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
});
window.onresize = () =>
    (() => {
        // 可见区域高度和宽度，不是真实高度
        screenSize.height = document.documentElement.clientHeight;
        screenSize.width = document.documentElement.clientWidth;
    })();

export function useScreenSize() {
    return screenSize;
}
