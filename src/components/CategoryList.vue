<template>
<div v-for="categoryInfo in categoryInfoList" :key="categoryInfo.aname">
  <CategoryFileList :categoryInfo="categoryInfo" @click="showInfo(categoryInfo)"></CategoryFileList>
</div>
  
</template>

<script setup>
import uConfig from '../config';
import CategoryFileList from './CategoryFileList.vue';
import { computed, defineProps } from 'vue';

const probs = defineProps({
  categoryInfoList: {
    type: Array,
    required: true
  }
});

function showInfo(info) {
  console.log(info);
}



</script>


<style>

</style>