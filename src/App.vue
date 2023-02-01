<template>
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
    </router-view>
</template>

<script setup>

</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Source+Sans+Pro:400,600,700");
@import "./assets/bootstrap/css/bootstrap.css";
@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
@import "./assets/index.css";

.bgW {
  background: #fff;
}

.bgW50 {
  background: rgba(255, 255, 255, 0.5);
}

.nav-link {
  cursor: pointer;
}

#app {
  height: 100%;
}


</style>