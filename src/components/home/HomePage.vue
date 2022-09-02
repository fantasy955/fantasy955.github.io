<template>
  <div>
    <HomeTop>
      <template #weather>
        <WeatherHeader />
      </template>
    </HomeTop>
    <router-view></router-view>
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
import HomeTop from "./HomeTop.vue";
import WeatherHeader from "../common/WeatherHeader.vue";

import { ref, defineProps } from "vue";
import PageFooter from "../common/PageFooter.vue";
import { useRouter } from "vue-router";

const rounter = useRouter();



</script>


<style>
</style>