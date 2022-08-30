<template>
  <div>
    <nav
      class="container topnav navbar navbar-expand-lg navbar-light fixed-top"
      :class="topBarExpand ? bgW : bgW50"
    >
      <div>
        <img src="../assets/figures/progile_photo.png" class="avatar" />
        <a class="navbar-brand nav-link" style="margin-right: 0" @click="toTop"
          ><strong>{{ $globalParams.real_name }}</strong></a
        >
      </div>

      <button
        class="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="topBarExpand = !topBarExpand"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarColor02">
        <ul
          id="categorylist"
          class="navbar-nav mr-auto d-flex align-items-center"
        >
          <li class="nav-item" v-for="item in menu" :key="item.sname">
            <a
              class="nav-link"
              style="padding-right: 0rem"
              v-on:click="scrollIntoView"
              v-bind:name="item.sname"
              >{{ item.sname }}</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topBarExpand: false,
      bgW: "bg-white",
      bgW50: "bg-white-50",
    };
  },
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
  methods: {
    scrollIntoView(event) {
      if (event) {
        let el = document.getElementById("div-" + event.target.name);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
  },
};
</script>

<script setup>
function toTop() {
  console.log("?");
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<!-- scoped -->
<!-- lang='sass' less  -->
<style scoped>
/* @import '../assets/tabler/css/tabler.min.css'; */
.avatar {
  width: 2.5rem;
  height: 2.5rem;
}
</style>