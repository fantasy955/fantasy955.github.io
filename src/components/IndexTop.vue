<template>
  <div>
    <nav
      class="container topnav navbar navbar-expand-lg navbar-light fixed-top"
      :class="topBarExpand ? bgW : bgW50"
    >
      <div class="container">
        <div class="col-md-1 d-none d-md-block">
          <img
            id="img-profile-photo"
            src="../../custom/figures/progile_photo.png"
            class="img-fluid img-responsive"
            v-bind:alt="personName"
          />
        </div>
        <a
          class="navbar-brand nav-link"
          style="margin-right: 0"
          onclick="toTop()"
          ><strong>{{ personName }}</strong></a
        >
        <button
          class="navbar-toggler collapsed mb-3"
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
      </div>
    </nav>
  </div>
</template>

<script>
import uConfig from "../config";
export default {
  data() {
    return {
      personName: uConfig.real_name,
      topBarExpand: false,
      bgW: "bg-white",
      bgW50: "bg-white-50",
      // menu: []
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

<!-- scoped -->
<!-- lang='sass' less  -->
<style >
</style>