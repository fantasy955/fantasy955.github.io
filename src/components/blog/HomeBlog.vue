<template>
  <div class="row justify-content-start cantainer">
    <HomeBlogLeftSide></HomeBlogLeftSide>
    <div class="col-md-10" role="main">
      <HomeBlogNav :menu="menu" ></HomeBlogNav>
      <!-- 二者处于同一div下，当nav没有处于顶部时，会把下面的内容往下推（没有触发sticky） -->
      <HomeBlogCategory v-for="categoryInfo in categoryInfoList" :key="categoryInfo.aname" :categoryInfo="categoryInfo">
      </HomeBlogCategory>
    </div>
    <div></div>
  </div>
</template>
  
<script setup>
import axios from "axios";
import HomeBlogCategory from "./HomeBlogCategory.vue";
import HomeBlogLeftSide from "./HomeBlogLeftSide.vue";
import HomeBlogNav from "./HomeBlogNav.vue";
import { computed, defineProps, inject, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const menuJson = require("../blog/menu.json");
const categoryInfoList = ref([]);
const menu = ref([]);
const cantainerRef = ref(null);

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
</script>
  
  
<style scoped>
.row {
  margin-inline: 0;
}

.cantainer {
  position: relative;
}
.cantainer::before{
  position: absolute;
  inset: 0;
}
</style>