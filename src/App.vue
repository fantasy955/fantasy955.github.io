<template>
  <div class="cantainer">
    <canvas class="background"></canvas>
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { Particles } from 'particlesjs';
import { onMounted } from "vue";

var particles = null;

onMounted(() => {
  particles = Particles.init({
    selector: '.background',
    connectParticles: true,
  });
})
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

.cantainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.background {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>