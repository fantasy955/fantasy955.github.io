import { computed, watch, ref } from 'vue';
import { useScreenWidth } from "@/stores/screenWidth";
import config from '@/config';

const smallScreenSize = config.globalParams.smallScreenSize;

export const smallScreen = true;
export const largeScreen = false;

export const useScreenType = function () {
    const screenWidth = useScreenWidth();
    const screenType = ref(smallScreen);
    watch(() => screenWidth, () => {
        if (screenWidth) {
            screenType.value = screenWidth.value <= smallScreenSize;
        }
    }, { immediate: true });
};

