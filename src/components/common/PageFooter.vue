<template>
  <footer class="bg-white border-top p-1 text-muted small">
    <div>
      <span class="navbar-brand mr-2"><strong>{{ $globalParams.real_name }}</strong></span>
      Copyright &copy;
      {{ year }}
      . All rights reserved.
    </div>
    <div>
      <span>Powered By</span>
      <a target="_blank" class="text-secondary font-weight-bold ml-1" href="https://cn.vuejs.org/">Vue 3</a>
    </div>
  </footer>
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
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
}

footer div {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-wrap: wrap;
}

.ml-1 {
  margin-left: 8px;
}
</style>