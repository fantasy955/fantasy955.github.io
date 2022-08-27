<template>
  <nav
    :x="1"
    class="container topnav navbar navbar-expand-lg navbar-light fixed-top"
    :class="topBarExpand ? bgW : bgW50"
  >
    <div class="container">
      <div class="col-md-1 d-none d-md-block">
        <img
          id="img-profile-photo"
          src="../assets/figures/progile_photo.png"
          class="img-fluid img-responsive"
          v-bind:alt="personName"
        />
      </div>
      <nav class="pl-5" aria-label="breadcrumb">
        <ol class="breadcrumb" style="margin-top: 1rem">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ category }}
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ showName }}
          </li>
        </ol>
      </nav>
    </div>
  </nav>
</template>

<script setup>
import uConfig from "../config";
import { computed, defineProps, ref } from "vue";
const probs = defineProps(["category", "blogName"]);

var personName = uConfig.user_name;
var topBarExpand = false;
topBarExpand = ref(topBarExpand);

const bgW = ref("bgW");
const bgW50 = ref("bgW50");

const showName = computed(() => {
  let res = probs.blogName.split('.');
  return res[res.length-2];
})

</script>

<style scoped>
.navbar > .container {
  justify-content: start;
}
</style>