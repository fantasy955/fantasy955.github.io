<template>
  <div>
    <IndexTop :menu="menu"></IndexTop>
    <WeatherHeader />
    <CategoryList :categoryInfoList="categoryFileList" />
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
import IndexTop from "./components/IndexTop.vue";
import WeatherHeader from "./components/WeatherHeader.vue";
import CategoryList from "./components/CategoryList.vue";
import uConfig from "./config";

import { ref, defineProps } from "vue";

let menu = [];
let categoryFileList = [];
menu = ref(menu);
categoryFileList = ref(categoryFileList);
const menuJson = require("../public/assets/custom/menu.json");

let filesPromises = [];
for (const item of menuJson.categories) {
  menu.value.push(item);
  let filesPromise = axios.get(item.path + "/list.json").then((res) => {
    let data = res.data;
    for(let key in item){
      data[key] = item[key];
    }
    data['more'] = false;
    categoryFileList.value.push(data);
  });
  filesPromises.push(filesPromise);
}

Promise.all(filesPromises).then(res => {
  // console.log('categoryFileList ok');
});


// const probs =  defineProps(['menu', 'categoryInfoList']);
// const probs =  defineProps({
//   menu: Array,
//   categoryInfoList: Array
// });

var count = ref(0);
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Source+Sans+Pro:400,600,700");
@import "../assets/css/main.css";
@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
@import "../index.css";
</style>