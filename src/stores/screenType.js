import { computed, watch } from 'vue'
import { useScreenWidth } from "@/stores/screenWidth";
import config from '@/config'

const screenWidth = useScreenWidth()
const smallScreenSize = config.globalParams.smallScreenSize
export const useScreenType = () => {
    return computed(()=>{
        return screenWidth.value <= smallScreenSize
    })
}

export const smallScreen = true
export const largeScreen = false

