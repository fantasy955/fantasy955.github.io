<template>
  <div>
    <header class="navbar navbar-expand-md navbar-dark bd-navbar">
      <nav
        class="container-xxl navbar-nav flex-wrap flex-md-nowrap"
        aria-label="Main navigation"
      >
        <slot name="topLeft"></slot>
        <div class="d-flex flex-sm-row">
          <img src="../../assets/figures/progile_photo.png" class="avatar" />
          <a class="navbar-brand nav-link"
            ><strong>{{ $globalParams.real_name }}</strong></a
          >
        </div>
        <slot name="topLeftCollapsed"></slot>
      </nav>
    </header>
  </div>
</template>
  
<script setup>
import {onMounted, onUnmounted} from 'vue';

onMounted(() =>{
  console.log('PageHeader 挂载了');
});

onUnmounted(()=>{
  console.log('PageHeader 卸载了');
});
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

.navbar-brand {
  display: inline-block;
}

header {
  color: aliceblue;
}

@media (min-width: 768px) {
}

</style>