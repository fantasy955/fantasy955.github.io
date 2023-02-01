<template>
  <!-- fixed-top -->
  <!-- fix 与 sticky的区别 -->
  <nav class="navbar navbar-blog sticky-top" :class="topBarExpand ? bgW : bgW50">
    <a class="nav-link category-item" @click="toTop">Top</a>
    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
      aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation"
      @click="topBarExpand = !topBarExpand">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-nav navbar-collapse collapse" id="navbarColor02">
      <ul id="categorylist" class="navbar-nav mr-auto d-flex align-items-center">
        <!-- mr-auto使得其始终位于左边 -->
        <li class="nav-item" v-for="item in menu" :key="item.sname">
          <a class="nav-link category-item" style="padding-right: 0rem" v-on:click="scrollIntoView"
            v-bind:name="item.sname">{{
    item.sname
            }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { defineProps, ref } from "vue";
defineProps({
  menu: {
    required: true,
    type: Array,
  },
});

const topBarExpand = ref(false);

const bgW = "bg-white";
const bgW50 = "bg-white-50";

function scrollIntoView(event) {
  if (event) {
    let el = document.getElementById("div-" + event.target.name);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function toTop() {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.category-item {
  /* border-radius: 8px; */
}

.category-item:hover {
  background-color: rgb(64, 74, 78);
  color: white !important;
}

.navbar-blog .nav-link {
  color: #1d1f20;
}

.navbar-nav {
  flex-direction: column;
}

.navbar-blog {
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.95);
  margin-inline: auto;
}

button.navbar-toggler {
  border-color: rgba(0, 0, 0, 0.1);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox=%270 0 30 30%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath stroke=%27rgba%280, 0, 0, 0.5%29%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3E%3C/svg%3E");
}


@media (min-width: 576px) {
  .navbar-blog {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .navbar-blog {
    max-width: 720px;
  }

  .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }

  .navbar-toggler {
    display: none;
  }

  .navbar-nav {
    flex-direction: row !important;
    column-gap: 12px;
  }
}

@media (min-width: 992px) {
  .navbar-blog {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .navbar-blog {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .navbar-blog {
    max-width: 1320px;
  }
}
</style>