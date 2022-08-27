<template>
  <div
    class="
      container
      jumbotron jumbotron-fluid
      mb-3
      pt-0
      pb-0
      bg-gray
      position-relative
    "
    style="margin-bottom: 5px"
    v-bind:id="['div-' + categoryInfo.sname]"
  >
    <h5 class="mt-1 btn btn-dark font-weight-bold">
      <span style="padding-bottom: 5px">{{ categoryInfo.aname }}</span>
    </h5>
    <div class="mb-1 d-flex justify-content-center border-bottom"></div>
    <ol class="list-featured" v-bind:id="['ol-files-' + categoryInfo.sname]">
      <li class="mb-md-2" v-for="file in currentPageFiles" :key="file.name">
        <div class="pl-3 justify-content-center">
          <h6 class="font-weight-bold" style="margin-bottom: 0">
            <a
              class="text-dark"
              v-bind:href="`/#/blog${categoryInfo.sname}/${file.name}`"
              style="cursor: pointer"
              v-on:click.prevent="(event) => viewBlog(file)"
              >{{ file.name }}</a
            >
          </h6>
          <div class="card-text text-muted small">Fantasy955</div>
          <small class="text-muted"
            >{{ file.updatetime.year }}年{{ file.updatetime.mon }}月{{
              file.updatetime.day
            }}日 更新</small
          >
        </div>
      </li>
    </ol>
    <div
      class="card-text mr-1"
      v-if="readMore"
      v-on:click="(event) => showAll()"
    >
      <p class="pl-md-1 pr-md-1 c-pointer text-primary">View All</p>
    </div>
    <div class="card-text mr-1" v-if="layaside" v-on:click="(event) => layAside(event)">
      <p class="pl-md-1 pr-md-1 c-pointer text-primary">收起</p>
    </div>
    <div class="row pl-3 justify-content-center">
      <div class="card-text small" v-if="!categoryInfo.layaside">
        <p class="text-muted">
          总共 {{ totalPage }} 页, 当前第 {{ pageIndex }} 页
        </p>
      </div>
      <div class="ml-1 card-text small" v-if="!categoryInfo.layaside">
        <p
          class="c-pointer bg-white"
          v-if="pageIndex > 1"
          v-on:click="(event) => pageIndex--"
        >
          上一页
        </p>
      </div>
      <div class="ml-1 card-text small" v-if="!categoryInfo.layaside">
        <p
          class="c-pointer badge-white"
          v-if="pageIndex < totalPage"
          v-on:click="(event) => pageIndex++"
        >
          下一页
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import uConfig from "../config";
import { defineProps, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const probs = defineProps({
  categoryInfo: {
    type: Object,
    required: true,
  },
});

var pageIndex = 1;
pageIndex = ref(pageIndex);

var max_file_items = uConfig.max_file_items;
max_file_items = ref(max_file_items);

var layaside = false;
layaside = ref(layaside);

const filteredFiles = computed({
  get() {
    return probs.categoryInfo.files.filter((item) => {
      return item.name.indexOf("") != -1;
    });
  },
});

const readMore = computed({
  get() {
    return filteredFiles.value.length > max_file_items.value;
  },
  set(newValue) {
    console.log("set");
  },
});

const totalPage = computed(() => {
  return Math.max(1, Math.ceil(filteredFiles.value.length / max_file_items.value));
});

const currentPageFiles = computed(() => {
  if (max_file_items.value != Infinity) {
    let start = (pageIndex.value - 1) * max_file_items.value;
    return filteredFiles.value.filter((item, index) => {
      return index >= start && index < start + max_file_items.value;
    });
  }else{
    return filteredFiles.value;
  }
});

function showAll() {
  max_file_items.value = Infinity;
  layaside.value = true;
  pageIndex.value = 1;
}

function layAside(event){
  max_file_items.value = uConfig.max_file_items;
  layaside.value = false;
  let div = document.getElementById(`div-${probs.categoryInfo.sname}`);
  div.scrollIntoView({behavior: 'smooth'});
}

function viewBlog(file) {
  router.push({
    name: "blog",
    params: {
      path: file.relapath,
      categorySname: probs.categoryInfo.sname,
      blogName: file.name,
    },
  });
}

onMounted(() => {
  // console.log('mounted');
});
</script>

<style>
</style>