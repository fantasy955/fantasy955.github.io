<template>
  <span>Hello world</span>
</template>

<script setup>
import { useRoute } from "vue-router";

var route = useRoute();
console.log(route.query);

</script>

<style scoped>
span {
  top: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>