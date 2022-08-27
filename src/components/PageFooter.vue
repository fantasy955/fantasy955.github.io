<template>
  <div class="container mt-5">
    <footer class="bg-white border-top p-3 text-muted small">
      <div class="row align-items-center justify-content-between">
        <div>
          <span class="navbar-brand mr-2"><strong>WeiJL</strong></span>
          Copyright &copy;
          {{year}}
          . All rights reserved.
        </div>
        <div>
          Made with
          <a
            target="_blank"
            class="text-secondary font-weight-bold"
            href="https://www.wowthemes.net/mundana-free-html-bootstrap-template/"
            >Mundana Theme</a
          >
          by WowThemes.net.
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    },
};

</script>

<style>
</style>