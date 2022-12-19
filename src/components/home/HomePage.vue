<template>
  <div>
    <PageHeader>
      <template #topLeft>
        <div class="nav-category navbar-collapse collapse mr-auto">
          <a
            v-for="category in categories"
            :key="category.path"
            @click="toCategoryHome(category.path)"
            class="m-1 pointer fw-bold"
            role="button"
            >{{ category.name }}</a
          >
        </div>
        <WeatherHeader />
      </template>
      <template #topLeftCollapsed>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#homecategory"
          aria-controls="homecategory"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="topBarExpand = !topBarExpand"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="nav-category collapse"
          id="homecategory"
          style="flex-basis: 100%"
        >
          <a
            v-for="category in categories"
            :key="category.path"
            @click="toCategoryHome(category.path)"
            class="m-1 pointer fw-bold"
            role="button"
            >{{ category.name }}</a
          >
        </div>
      </template>
    </PageHeader>
    
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
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
import WeatherHeader from "../common/WeatherHeader.vue";
import { useRoute, useRouter } from "vue-router";
import menu from "./menu";
import { ref, defineProps, onUnmounted, onActivated, onDeactivated } from "vue";
import PageFooter from "../common/PageFooter.vue";
import PageHeader from "../common/PageHeader.vue";

const topCategory = ["blog", "demo"];
const rounte = useRoute();
const rounter = useRouter();
const categories = menu.categories;

function toCategoryHome(category) {
  category = category.toLowerCase();
  rounter.push(`/${category.toLowerCase()}`);
}

onUnmounted(() => {
  console.log('首页卸载了');
})
 
onActivated(() => {
  console.log('首页激活了');
})

onDeactivated(() => {
  console.log('首页失活了');
})
</script>


<style scoped>
.nav-category {
  display: flex;
  /* column-gap: 12px; */
}

.nav-category > a {
  text-decoration-line: none;
  color: aliceblue;
  padding-left: 12px;
  padding-right: 12px;
  width: max-content;
}
</style>