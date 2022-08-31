<template>
  <div class="row justify-content-start">
    <!-- <HomeLeftSide></HomeLeftSide> -->
    <slot name="leftside"></slot>
    <div class="col-md-10" role="main">
      <slot name="nav"></slot>  
      <!-- 二者处于同一div下，当nav没有处于顶部时，会把下面的内容往下推（没有触发sticky） -->
      <HomeBlogCategory
        v-for="categoryInfo in categoryInfoList"
        :key="categoryInfo.aname"
        :categoryInfo="categoryInfo"
      ></HomeBlogCategory>
    </div>
    <div></div>
  </div>
</template>
  
  <script setup>
import uConfig from "../../config";
import HomeBlogCategory from "./HomeBlogCategory.vue";
import { computed, defineProps } from "vue";

const probs = defineProps({
  categoryInfoList: {
    type: Array,
    required: true,
  },
});
</script>
  
  
<style>

</style>