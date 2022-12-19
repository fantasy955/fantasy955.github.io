<template>
  <router-view  v-slot="{ Component }">
    <keep-alive include="HomePage">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
import HomePage from "./components/home/HomePage.vue";
import BlogPage from "./components/blog/BlogPage.vue";
import NotFound from "./components/common/NotFound.vue";

// const routes = {
//   '/': HomePage,
//   '/blog': BlogPage
// }
// const currentPath = ref(window.location.hash)

// // window.location.hash这个属性可读可写。读取时，可以用来判断网页状态是否改变；写入时，则会在不重载网页的前提下，创造一条访问历史记录。
// // 这是一个HTML 5新增的事件，当#值发生变化时，就会触发这个事件。IE8+、Firefox 3.6+、Chrome 5+、Safari 4.0+支持该事件。
// window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })

// const currentView = computed(() => {
//   let hashValue = currentPath.value.slice(1);
//   if (hashValue.startsWith('/blog')){
//     return BlogPage;
//   }
//   return routes[hashValue.slice(1) || '/'] || NotFound
// })
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Source+Sans+Pro:400,600,700");
@import "./assets/bootstrap/css/bootstrap.css";
@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
@import "./assets/index.css";

.bgW {
  background: #fff;
}

.bgW50 {
  background: rgba(255, 255, 255, 0.5);
}

.nav-link {
    cursor: pointer;
}

</style>