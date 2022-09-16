<template>
  <child @showMsg="showMsg"></child>
  <div>
    <h3 ref="h3"></h3>
  </div>
</template>

<script setup>
import { ref } from "vue";
import child from "./_child.vue";

const h3 = ref();
function showMsg(msg) {
  console.log(h3.value.innerHTML=msg);
  console.log(msg);
}
</script>

<script>
export default {
  name: "father",
};
</script>

<style>
</style>