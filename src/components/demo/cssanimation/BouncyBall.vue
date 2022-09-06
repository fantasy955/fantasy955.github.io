<template>
  <div id="main">
    <div id="ball"></div>
    <div id="shadow"></div>
  </div>
</template>
  
  <script setup>
</script>
  
  <style scoped>
#main {
  width: 500px;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
  top: 100px;
  position: relative;
}
#ball {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: aqua;
  left: 50%;
  right: 50%;
  top: 30px;
  animation: drop 0.7s infinite ease;
}
#shadow {
  position: absolute;
  width: 30px;
  height: 2px;
  /* 绝对布局使用left right top bottom才有效 */
  left: 50%;
  right: 50%;
  top: 75px;
  background-color: #3d4949;
}
@keyframes drop {
  from {
    top: 30px;
    scale: 1 1;
  }
  20% {
    top: 31px;
    scale: 0.9 1.1;
  }
  40% {
    top: 33px;
    scale: 0.88 1.12;
  }
  60% {
    top: 35px;
    scale: 0.86 1.14;
  }
  80% {
    top: 40px;
    scale: 0.84 1.16;
  }
  to {
    top: 44px;
    scale: 0.82 1.18;
  }
}
</style>