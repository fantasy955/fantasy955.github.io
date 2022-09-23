<template>
  <span>Hello world</span>
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineProps, defineAsyncComponent } from "vue";
</script>

<style scoped>
span {
  top: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>