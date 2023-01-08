<template>
  <span v-if="screenType === smallScreen">左滑显示导航栏</span>
  <span v-if="screenType !== smallScreen">点击左侧导航栏查看示例</span>
</template>

<script setup>
import { useScreenType, smallScreen, largeScreen } from "@/stores/screenType";
const screenType = useScreenType();
// console.log(screenType);
</script>

<style scoped>
span {
  top: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>