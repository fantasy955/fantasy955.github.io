import { ref, onMounted, reactive, } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from '@/utils/common';

const screenWidth = ref(0);;
export function useScreenWidth() {
    screenWidth.value = document.body.clientWidth;
    window.addEventListener('resize', () => {
        screenWidth.value = document.body.clientWidth;
    });
    return screenWidth;
}

const screenSize = reactive({
    height: 0,
    width: 0,
});

export function useScreenSize() {
    screenSize.height = document.documentElement.clientHeight;
    screenSize.width = document.documentElement.clientWidth;
    window.onresize = () =>
        (() => {
            // 可见区域高度和宽度，不是真实高度
            screenSize.height = document.documentElement.clientHeight;
            screenSize.width = document.documentElement.clientWidth;
        })();
    return screenSize;
}
