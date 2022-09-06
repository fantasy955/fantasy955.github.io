<template>
  <span>Hello world</span>
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineProps, defineAsyncComponent } from "vue";
import axios from "axios";

const probs = defineProps(["category", "name"]);
console.log(probs);

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    axios.get(`./assets/components/${probs.category}/${probs.name}`).then(res => {
      console.log(res.data);
    });
    resolve(/* 获取到的组件 */);
  });
});
</script>

<style scoped>
span {
  top: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>