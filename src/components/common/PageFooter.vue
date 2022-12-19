<template>
  <div class="container mt-5">
    <footer class="bg-white border-top p-3 text-muted small">
      <div>
        <span class="navbar-brand mr-2"
          ><strong>{{ $globalParams.real_name }}</strong></span
        >
        Copyright &copy;
        {{ year }}
        . All rights reserved.
      </div>
      <div>
        <span>Powered By</span>
        <a
          target="_blank"
          class="text-secondary font-weight-bold ml-1"
          href="https://cn.vuejs.org/"
          >Vue 3</a
        >
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
}

footer div {
  display: flex;
  align-items: center;
  justify-items: center;
}
.ml-1 {
  margin-left: 8px;
}
</style>