<template>
  <div class="row justify-content-start">
    <HomeLeftSide></HomeLeftSide>
    <div class="col-md-10" role="main">
      <CategoryFileList
        v-for="categoryInfo in categoryInfoList"
        :key="categoryInfo.aname"
        :categoryInfo="categoryInfo"
      ></CategoryFileList>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import uConfig from "../config";
import CategoryFileList from "./CategoryFileList.vue";
import { computed, defineProps } from "vue";
import HomeLeftSide from "./HomeLeftSide.vue";

const probs = defineProps({
  categoryInfoList: {
    type: Array,
    required: true,
  },
});

function showInfo(info) {
  console.log(info);
}
</script>


<style>
</style>