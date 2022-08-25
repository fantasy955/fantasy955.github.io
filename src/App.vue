<template>
  <div>
    <IndexTop></IndexTop>
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
import IndexTop from './components/IndexTop.vue';
import { ref, defineProps } from 'vue';

// const probs =  defineProps(['menu', 'categoryInfoList']);
// const probs =  defineProps({
//   menu: Array,
//   categoryInfoList: Array
// });

var count = ref(0);

</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Source+Sans+Pro:400,600,700');
@import '../assets/css/main.css';
@import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css');
@import '../index.css';
</style>