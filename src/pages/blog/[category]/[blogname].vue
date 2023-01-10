<template>
    <div>
      <PageHeader>
        <template #topLeft>
          <!-- <BlogHeader :blogName="blogName" :category="categorySname"></BlogHeader> -->
          <nav class="pl-5" aria-label="breadcrumb">
            <ol class="breadcrumb" style="margin-top: 1rem">
              <li class="breadcrumb-item"><router-link to="/blog">Home</router-link ></li>
              <li class="breadcrumb-item" aria-current="page">
                {{ category }}
              </li>
              <li class="breadcrumb-item" aria-current="page">
                {{ showName }}
              </li>
            </ol>
          </nav>
        </template>
      </PageHeader>
  
      <div class="container-xxl my-md-4 bd-layout" id="main-article">
        <BlogContentVue :category="category" :blogname="blogname" />
      </div>
      <PageFooter></PageFooter>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import BlogContentVue from "@/components/blog/BlogContent.vue";
  import PageFooter from "@/components/common/PageFooter.vue";
  import PageHeader from "@/components/common/PageHeader.vue";
  
  const probs = defineProps(['category', 'blogname']);
  
  const showName = computed(() => {
    // let res = probs.blogname.split(".");
    // return res[res.length - 2];
    return probs.blogName;
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