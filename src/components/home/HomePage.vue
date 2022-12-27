<template>
  <div>
    <PageHeader>
      <template #topLeft>
        <div class="nav-category navbar-collapse collapse mr-auto">
          <a @click="toCategoryHome('home')" class="m-1 pointer fw-bold" role="button">{{ '首页' }}</a>
          <a v-for="category in categories" :key="category.path" @click="toCategoryHome(category.path)"
            class="m-1 pointer fw-bold" role="button">{{ category.name }}</a>
        </div>
        <WeatherHeader />
      </template>
      <template #topLeftCollapsed>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#homecategory"
          aria-controls="homecategory" aria-expanded="false" aria-label="Toggle navigation"
          @click="topBarExpand = !topBarExpand" ref="collapsedBtn">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="nav-category collapse" id="homecategory" style="flex-basis: 100%" v-if="showCollaspedCategory">
          <a @click="toCategoryHome('home')" class="m-1 pointer fw-bold" role="button">{{ '首页' }}</a>
          <a v-for="category in categories" :key="category.path" @click="toCategoryHome(category.path)"
            class="m-1 pointer fw-bold" role="button">{{ category.name }}</a>
        </div>
      </template>
    </PageHeader>

    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
</script>

<!-- 组合式 -->
<!-- 组件不需要使用模块化规范暴露 -->
<script setup>
// 在setup块中，导入的组件可以直接使用
import WeatherHeader from "../common/WeatherHeader.vue";
import { useRoute, useRouter } from "vue-router";
import menu from "./menu";
import { ref, defineProps, onUnmounted, onMounted, onActivated, onDeactivated, watch, computed } from "vue";
import PageFooter from "../common/PageFooter.vue";
import PageHeader from "../common/PageHeader.vue";

const collapsedBtn = ref(null);
const topCategory = ["blog", "demo"];
const rounte = useRoute();
const rounter = useRouter();
const categories = menu.categories;

function toCategoryHome(category) {
  category = category.toLowerCase();
  rounter.push(`/${category.toLowerCase()}`);
}
const showCollaspedCategory = ref(false);

const checkCollapsedCategory = function () {
  if (collapsedBtn.value && collapsedBtn.value.offsetParent !== null) {
    showCollaspedCategory.value = true;
  } else {
    showCollaspedCategory.value = false;
  }
}

onMounted(() => {
  window.addEventListener('resize', checkCollapsedCategory, true);
  checkCollapsedCategory();
})

onUnmounted(() => {
  window.removeEventListener('resize', checkCollapsedCategory);
})
</script>


<style scoped>
.nav-category>a {
  text-decoration-line: none;
  color: aliceblue;
  padding-left: 12px;
  padding-right: 12px;
  width: max-content;
}
</style>