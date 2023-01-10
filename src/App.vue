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

nav.table-of-contents>ol {
  list-style-type: disc;
}

nav.table-of-contents>ol>li>ol {
  list-style-type: circle;
}
nav.table-of-contents>ol>li>ol>li>ol {
  list-style-type: square;
}
</style>