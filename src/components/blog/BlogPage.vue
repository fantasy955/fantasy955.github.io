<template>
  <div>
    <PageHeader>
      <template #topLeft>
        <!-- <BlogHeader :blogName="blogName" :category="categorySname"></BlogHeader> -->
        <nav class="pl-5" aria-label="breadcrumb">
          <ol class="breadcrumb" style="margin-top: 1rem">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item" aria-current="page">
              {{ categorySname }}
            </li>
            <li class="breadcrumb-item" aria-current="page">
              {{ showName }}
            </li>
          </ol>
        </nav>
      </template>
    </PageHeader>

    <div class="container-xxl my-md-4 bd-layout" id="main-article">
      <BlogContentVue :blogPath="path" />
    </div>
    <PageFooter></PageFooter>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BlogContentVue from "./BlogContent.vue";
import PageFooter from "../common/PageFooter.vue";
import PageHeader from "../common/PageHeader.vue";

var route = useRoute();
var router = useRouter();

const params = route.params;
var categorySname = params.categorySname;
var blogName = params.blogName;
var path = params.path;

const showName = computed(() => {
  let res = blogName.split(".");
  return res[res.length - 2];
});
</script>

<style scoped>
.breadcrumb-item {
  color: auto !important;
}

ol > li > a {
  text-decoration: none;
  color: auto !important;
}
</style>