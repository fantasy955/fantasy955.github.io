<template>
  <div>
    <HomeTop>
      <template #weather>
        <WeatherHeader />
      </template>
    </HomeTop>
    <HomeBlog :categoryInfoList="categoryFileList">
      <template #leftside>
        <HomeBlogLeftSide></HomeBlogLeftSide>
      </template>
      <template #nav>
        <HomeBlogNav :menu="menu"></HomeBlogNav>
      </template>
    </HomeBlog>
    <PageFooter></PageFooter>
  </div>
</template>

<!-- 选项式 -->
<!-- <script>
import IndexTop from './components/IndexTop.vue';
export default {
    name: 'App',
    components: {
        IndexTop
    }
}
</script> -->

<!-- 最多包含一个script语句块和一个 script setup语句块-->
<script>
</script>

<!-- 组合式 -->
<!-- 组件不需要使用模块化规范暴露 -->
<script setup>
// 在setup块中，导入的组件可以直接使用
import axios from "axios";
import HomeTop from "./HomeTop.vue";
import WeatherHeader from "../common/WeatherHeader.vue";

import { ref, defineProps } from "vue";
import PageFooter from "../common/PageFooter.vue";
import HomeBlog from "../blog/HomeBlog.vue";
import HomeBlogLeftSide from "../blog/HomeBlogLeftSide.vue";
import HomeBlogNav from "../blog/HomeBlogNav.vue";

const menuJson = require("../blog/menu.json");
let categoryFileList = [];
categoryFileList = ref(categoryFileList);
let menu = [];
menu = ref(menu);

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
    categoryFileList.value.push(data);
  });
  filesPromises.push(filesPromise);
}

Promise.all(filesPromises).then((res) => {
  menu.value.sort((a, b) => {
    return a.order - b.order;
  });
  categoryFileList.value.sort((a, b) => {
    return a.order - b.order;
  });
});

var count = ref(0);
</script>


<style>
</style>