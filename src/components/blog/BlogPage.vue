<template>
<div>
  <BlogHeader :blogName="blogName" :category="categorySname"></BlogHeader>
  <div class="container-xxl my-md-4 bd-layout" id="main-article">
    <BlogContentVue :blogPath="path" />
  </div>
  <PageFooter></PageFooter>
</div>
  
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import BlogContentVue from "./BlogContent.vue";
import BlogHeader from "./BlogHeader.vue";
import PageFooter from "../common/PageFooter.vue";


var route = useRoute();
var router = useRouter();

const params = route.params;
var categorySname = params.categorySname;
var blogName = params.blogName;
var path = params.path;
</script>

<style>
</style>