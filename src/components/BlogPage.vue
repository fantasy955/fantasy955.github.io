<template>
  <div class="container-xxl my-md-4 bd-layout" id="main-article">
    <BlogContentVue :blogPath="params.path" />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import BlogContentVue from "./BlogContent.vue";

var route = useRoute();
var router = useRouter();

const params = route.params;
</script>

<style>
</style>