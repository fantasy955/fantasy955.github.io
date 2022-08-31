<template>
  <div>
    <HomeTop></HomeTop>
    <WeatherHeader />
    <HomeBlog :categoryInfoList="categoryFileList" >
      <template #leftside>
        <HomeLeftSide></HomeLeftSide>
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
import uConfig from "../../config";

import { ref, defineProps } from "vue";
import PageFooter from "../common/PageFooter.vue";
import HomeBlog from "./HomeBlog.vue";
import HomeLeftSide from "./HomeLeftSide.vue";
import HomeBlogNav from "./HomeBlogNav.vue";

const menuJson = require("./menu.json");
let categoryFileList = [];
categoryFileList = ref(categoryFileList);
let menu = [];
menu = ref(menu);

let filesPromises = Array(menuJson.categories.length);
for (const i in menuJson.categories) {
  const item = menuJson.categories[i];
  item['order'] = i;
  menu.value.push(item);
  let filesPromise = axios.get(item.path + "/list.json").then((res) => {
    let data = res.data;
    for(let key in item){
      data[key] = item[key];
    }
    data['more'] = false;
    data['order'] = i;
    categoryFileList.value.push(data);
  });
  filesPromises.push(filesPromise);
}

Promise.all(filesPromises).then(res => {
  menu.value.sort((a, b) => {
    return a.order - b.order;
  });
  categoryFileList.value.sort((a, b) => {
    return a.order - b.order;
  })
});


// const probs =  defineProps(['menu', 'categoryInfoList']);
// const probs =  defineProps({
//   menu: Array,
//   categoryInfoList: Array
// });

var count = ref(0);
</script>


<style>
</style>