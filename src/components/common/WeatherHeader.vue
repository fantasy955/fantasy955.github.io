<template>
  <div
    class="container mt-1 navbar-collapse collapse justify-content-center gap-sm-1"
    id="header"
  >
    <div class="d-flex flex-sm-column align-items-center">
      <h5 class="m-0">{{ $globalParams.cityName }}</h5>
      <h5 class="m-0">Weather</h5>
    </div>
    <img
      src="../../assets/qweather-icons/icons/100.svg"
      fill="#1C242C"
      alt="QWeather"
      width="32"
      height="32"
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('天气挂载了');
});

onUnmounted(() => {
  console.log('天气销毁了');
});

</script>

<style>
</style>