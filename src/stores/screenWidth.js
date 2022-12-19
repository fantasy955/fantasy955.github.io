import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

const screenWidth = ref(document.body.clientWidth);
window.onresize = () =>
    (() => {
        screenWidth.value = document.body.clientWidth;
        // console.log(screenWidth.value)
    })();

export function useScreenWidth() {
    return screenWidth;
}
