<template>
  <div class="row justify-content-start cantainer">
    <div class="canvas-cantainer">
      <canvas id="canvas" class="canvas"></canvas>
    </div>
    <HomeBlogLeftSide></HomeBlogLeftSide>
    <div class="col-md-10" role="main">
      <HomeBlogNav :menu="menu"></HomeBlogNav>
      <!-- 二者处于同一div下，当nav没有处于顶部时，会把下面的内容往下推（没有触发sticky） -->
      <!-- 对于过高的元素，不能用sticky属性限制其距离顶部的高度 -->
      <HomeBlogCategory v-for="categoryInfo in categoryInfoList" :key="categoryInfo.aname" :categoryInfo="categoryInfo">
      </HomeBlogCategory>
    </div>
  </div>
</template>
  
<script setup>
import axios from "axios";
import HomeBlogCategory from "./HomeBlogCategory.vue";
import HomeBlogLeftSide from "./HomeBlogLeftSide.vue";
import HomeBlogNav from "./HomeBlogNav.vue";
import { computed, defineProps, inject, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { initAeronautics } from '@/utils/aeronautics';

const menuJson = require("../blog/menu.json");
const categoryInfoList = ref([]);
const menu = ref([]);

const router = useRouter();

let filesPromises = Array(menuJson.categories.length);
for (const i in menuJson.categories) {
  const item = menuJson.categories[i];
  item["order"] = i;
  menu.value.push(item);
  let filesPromise = axios.get(item.path + "/list.json").then((res) => {
    let data = res.data;
    for (let key in item) {
      data[key] = item[key];
    }
    data["more"] = false;
    data["order"] = i;
    categoryInfoList.value.push(data);
  });
  filesPromises.push(filesPromise);
}

Promise.all(filesPromises).then((res) => {
  menu.value.sort((a, b) => {
    return a.order - b.order;
  });
  categoryInfoList.value.sort((a, b) => {
    return a.order - b.order;
  });
});

onMounted(() => {
  // initAeronautics('canvas', 1920, 1080);
})
</script>
  
  
<style scoped>
.row {
  margin-inline: 0;
}

.cantainer {
  position: relative;
}

.canvas-cantainer {
  position: fixed;
  /* background: hsla(223, 30%, 45%, 1); */
  top: 0;
  width: 1920px;
  height: 1080px;
  padding: 0;
  z-index: -999;
}

.canvas-cantainer>.canvas {
  width: 1920px;
  height: 1080px;
  padding: 0;
}
</style>