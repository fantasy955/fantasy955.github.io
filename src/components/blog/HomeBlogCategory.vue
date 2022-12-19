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
    v-bind:id="`div-${categoryInfo.sname}`"
    ref="main"
  >
    <div class="category-header">
      <h5 class="m-1 btn btn-dark font-weight-bold">
        <span style="padding-bottom: 5px">{{ categoryInfo.aname }}</span>
      </h5>
      <input
        class="keyword-input"
        type="text"
        placeholder="标题关键字"
        v-model="keyword"
      />
    </div>
    <div class="mb-1 d-flex justify-content-center border-bottom"></div>
    <ol class="list-group" v-bind:id="['ol-files-' + categoryInfo.sname]">
      <li
        class="li-file d-flex"
        v-for="(file, index) in currentPageFiles"
        :key="file.name"
      >
        <span class="li-file-number">{{ baseIndex + index + 1 }}</span>
        <div class="pl-3 justify-content-center">
          <h2 class="mb-1 h6 font-weight-bold">
            <a
              class="text-dark"
              v-bind:href="`/#/blog/${categoryInfo.sname}/${file.name}`"
              style="cursor: pointer"
              v-on:click.prevent="(event) => viewBlog(file)"
              >{{ file.name }}</a
            >
          </h2>
          <div class="card-text text-muted small">Fantasy955</div>
          <small class="text-muted"
            >{{ file.updatetime.year }}年{{ file.updatetime.mon }}月{{
              file.updatetime.day
            }}日 更新</small
          >
        </div>
      </li>
    </ol>
    <div class="card-text mr-1 mt-2" v-if="readMore">
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        v-on:click="(event) => showAll()"
      >
        View ALL
      </button>
    </div>
    <div class="card-text mr-1 mt-2 pb-2" v-if="layaside">
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        v-on:click="(event) => layAside(event)"
      >
        收起
      </button>
    </div>
    <div class="category-footer pl-3 pb-2" v-if="!layaside && totalPage > 1">
      <p class="text-muted card-text small" style="padding: 0; margin: 0">
        总共 {{ totalPage }} 页, 当前第 {{ pageIndex }} 页
      </p>
      <!-- :style="{'pointer-events': pageIndex>1 ? 'auto':'none'}" -->
      <button
        type="button"
        v-on:click="(event) => prePage(event)"
        class="btn btn-sm mr-1"
        :class="[
          pageIndex <= 1
            ? 'button-disabled btn-outline-danger'
            : 'btn-outline-secondary',
        ]"
      >
        上一页
      </button>
      <button
        type="button"
        v-on:click="(event) => nextPage(event)"
        class="btn btn-sm"
        :class="[
          pageIndex >= totalPage
            ? 'button-disabled btn-outline-danger'
            : 'btn-outline-secondary',
        ]"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, inject, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const globalParams = inject("globalParams");
const route = useRoute();
const router = useRouter();

const probs = defineProps({
  categoryInfo: {
    type: Object,
    required: true,
  },
});

const main = ref(null);
const keyword = ref("");

var pageIndex = 1;
pageIndex = ref(pageIndex);

var max_file_items = globalParams.max_file_items;
max_file_items = ref(max_file_items);

var layaside = false;
layaside = ref(layaside);

const baseIndex = ref(0);

const filteredFiles = computed({
  get() {
    return probs.categoryInfo.files.filter((item) => {
      return item.name.toLowerCase().indexOf(keyword.value.toLowerCase()) != -1;
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
  return Math.max(
    1,
    Math.ceil(filteredFiles.value.length / max_file_items.value)
  );
});

const currentPageFiles = computed(() => {
  if (max_file_items.value != Infinity) {
    let start = (pageIndex.value - 1) * max_file_items.value;
    return filteredFiles.value.filter((item, index) => {
      return index >= start && index < start + max_file_items.value;
    });
  } else {
    return filteredFiles.value;
  }
});


function showAll() {
  baseIndex.value = 0;
  max_file_items.value = Infinity;
  layaside.value = true;
}

function layAside(event) {
  baseIndex.value = 0;
  max_file_items.value = globalParams.max_file_items;
  layaside.value = false;
  let div = document.getElementById(`div-${probs.categoryInfo.sname}`);
  div.scrollIntoView({ behavior: "smooth" });
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

function prePage(event) {
  pageIndex.value--;
  baseIndex.value = (pageIndex.value - 1) * max_file_items.value;
}

function nextPage(event) {
  pageIndex.value++;
  baseIndex.value = (pageIndex.value - 1) * max_file_items.value;
  if (pageIndex.value == totalPage.value) {
    document
      .getElementById(main.value.id)
      .scrollIntoView({ behavior: "smooth" });
  }
}

onMounted(() => {
  // console.log('mounted');
});
</script>

<style scoped>
.category-header {
  display: flex;
  column-gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.page-control {
  width: auto;
}

.keyword-input {
  border-top-left-radius: 1;
  border-bottom-left-radius: 1;
  /* margin-left: 2rem; */
  padding: 0.4375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4285714;
  color: #232e3c;
  background-color: hsla(0, 0%, 100%, 0.651);
  background-clip: padding-box;
  border: 1px solid #44494e;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.li-file-number {
  font-weight: bold;
  font-size: 3rem;
  margin-right: 1rem;
  font-family: "Abril Fatface", serif;
  line-height: 1;
}

.button-disabled {
  pointer-events: none;
}

button.button-disabled {
  cursor: not-allowed;
}

ol.list-featured li:before {
  display: none;
}

.category-footer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  column-gap: 12px;
  align-items: center;
  justify-content: center;
}

.font-weight-bold {
  font-weight: 700 !important;
}

a {
  text-decoration: none;
}

a.text-dark:hover,
a.text-dark:focus {
  color: #03a87c !important;
  text-decoration: underline;
}

.bg-gray {
  fill: #ced4da !important;
}
.bg-gray {
  background-color: #ced4da !important;
}

.li-file {
  margin-bottom: 4px;
  border: 1px #263330;
}
</style>