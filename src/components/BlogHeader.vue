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
            {{ blogName }}
          </li>
        </ol>
      </nav>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from "vue";
</script>

<style>
</style>