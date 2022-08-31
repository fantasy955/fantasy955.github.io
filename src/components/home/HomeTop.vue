<template>
  <div>
    <header class="navbar navbar-expand-md navbar-dark bd-navbar">
      <nav
        class="container-xxl flex-wrap flex-md-nowrap"
        aria-label="Main navigation"
      >
        <div>
          <img src="../../assets/figures/progile_photo.png" class="avatar" />
          <a class="navbar-brand nav-link" @click="toTop"
            ><strong>{{ $globalParams.real_name }}</strong></a
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
.bd-navbar {
  --bs-gutter-x: $bd-gutter-x;
  --bs-gutter-y: $bd-gutter-x;
  padding: 0.75rem 0;
  background-color: #404a4e;
}

.navbar {
  flex-direction: row;
  row-gap: 12px;
}

.navbar-brand {
  display: inline-block;
}
</style>