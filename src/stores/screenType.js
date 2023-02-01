import { computed, watch, ref } from 'vue';
import { useScreenWidth } from "@/stores/screenWidth";
import config from '@/config';

const smallScreenSize = config.globalParams.smallScreenSize;

export const smallScreen = true;
export const largeScreen = false;

const screenWidth = useScreenWidth();
const screenType = ref(smallScreen);
watch(screenWidth, () => {
    screenType.value = screenWidth.value <= smallScreenSize;
}, {immediate: true});

export const useScreenType = () => screenType;

