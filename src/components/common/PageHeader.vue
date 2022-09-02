<template>
    <div>
      <header class="navbar navbar-expand-md navbar-dark bd-navbar">
        <nav
          class="container-xxl navbar-nav flex-wrap flex-md-nowrap"
          aria-label="Main navigation"
        >
          <div class="nav-category navbar-collapse collapse mr-auto">
            <a
              v-for="category in categories"
              :key="category"
              class="m-1 pointer fw-bold"
              role="button"
              >{{ category }}</a
            >
          </div>
          <slot name="weather"></slot>
          <div class="d-flex flex-sm-row">
            <img src="../../assets/figures/progile_photo.png" class="avatar" />
            <a class="navbar-brand nav-link"
              ><strong>{{ $globalParams.real_name }}</strong></a
            >
          </div>
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#homecategory"
            aria-controls="homecategory"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="topBarExpand = !topBarExpand"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="nav-category collapse" id="homecategory">
            <a
              v-for="category in categories"
              :key="category"
              class="m-1 pointer fw-bold"
              role="button"
              >{{ category }}</a
            >
          </div>
        </nav>
      </header>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        topBarExpand: false,
        bgW: "bg-white",
        bgW50: "bg-white-50",
        topCategory: ["blog", "demo"],
      };
    },
  };
  </script>
  
  <script setup>
  import menu from "./menu";
  const categories = menu.categories;
  </script>
  
  <style scoped>
  .avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  .bd-navbar {
    --bs-gutter-x: $bd-gutter-x;
    --bs-gutter-y: $bd-gutter-x;
    padding: 0.75rem 0;
    background-color: #404a4e;
  }
  
  .navbar-nav {
    justify-content: space-between;
    flex-direction: row !important;
  }
  
  .nav-category {
    display: flex;
    /* column-gap: 12px; */
  }
  
  .navbar-brand {
    display: inline-block;
  }
  
  header {
    color: aliceblue;
  }
  
  .nav-category > a {
    text-decoration-line: none;
    color: aliceblue;
    padding-left: 12px;
    padding-right: 12px;
  }
  
  @media (min-width: 768px) {
  }
  </style>