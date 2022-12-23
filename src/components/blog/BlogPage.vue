<template>
  <div>
    <PageHeader>
      <template #topLeft>
        <!-- <BlogHeader :blogName="blogName" :category="categorySname"></BlogHeader> -->
        <nav class="pl-5" aria-label="breadcrumb">
          <ol class="breadcrumb" style="margin-top: 1rem">
            <li class="breadcrumb-item"><router-link to="/blog">Home</router-link ></li>
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
import { computed, defineProps, onDeactivated, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import BlogContentVue from "./BlogContent.vue";
import PageFooter from "../common/PageFooter.vue";
import PageHeader from "../common/PageHeader.vue";

var route = useRoute();
var router = useRouter();

const probs = defineProps(['categorySname', 'blogName', 'path']);

const showName = computed(() => {
  let res = probs.blogName.split(".");
  return res[res.length - 2];
});

onBeforeRouteUpdate ((to, from, next) => {
  document.title = to.params.blogName.split('.md')[0];
  console.log(to, from)
  next();
})
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