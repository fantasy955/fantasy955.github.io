<template>
  <div
    class="right-aside-nav"
    :class="show ? 'start' : 'end'"
    aria-labelledby=""
    aria-modal="true"
    role="dialog"
    ref="nav"
  >
    <header>
      <slot name="header">
        <h3>header</h3>
      </slot>
      <button
        type="button"
        class="btn-close btn-close-white"
        aria-label="Close"
        @click="closeNav"
      ></button>
    </header>
    <hr class="text-white-50" />
    <main>
      <slot name="main">
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
        <h3>main content</h3>
      </slot>
    </main>
    <hr class="text-white-50" />
    <footer>
      <slot name="footer">
        <h3>footer</h3>
      </slot>
    </footer>
  </div>
  <div
    v-if="mask"
    class="offcanvas-backdrop"
    :class="show ? 'show' : 'fade'"
    @click="closeNav"
  ></div>
</template>

<script setup>
import { defineProps, onBeforeUnmount, onMounted, ref } from "vue";

const show = ref(true);
const nav = ref();
const probs = defineProps({
  mask: {
    default: false,
    type: Boolean,
  },
});

function closeNav(event) {
  show.value = !show.value;
}

const touchState = {
    x: -1,
    y: -1
}

function handleTouchstart(event) {
  touchState.x = event.touches[0].clientX;
  touchState.y = event.touches[0].clientY;
  console.log(event);
}
function handleTouchend(event) {
console.log(event)
  let x = event.touches[0].clientX;
  let y = event.touches[0].clientY;
  let {x_, y_} = touchState;
  if (Math.abs(y_-x_) >= 50){
    show.value = true;
  }
  touchState.x = x;
  touchState.y = y;
}

onMounted(() => {
  window.addEventListener("touchstart", handleTouchstart, true);
  window.addEventListener("touchend", handleTouchend, true);
});

onBeforeUnmount(() => {
  window.removeEventListener("touchstart", handleTouchstart, true);
  window.removeEventListener("touchend", handleTouchend, true);
});
</script>

<style scoped lang="scss">
.right-aside-nav {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 400px;
  background-color: #404a4e;
  visibility: visible;
  z-index: 1045;
  padding: 16px;
  overflow: auto;
  color: white;
}

.right-aside-nav.end {
  transform: translateX(100%);
}

.right-aside-nav.start {
  transform: 0;
}

.offcanvas-backdrop.fade {
  opacity: 0;
  transform: translateX(100%);
}

.offcanvas-backdrop.show {
  opacity: 0.5;
  transform: 0;
}

@media (min-width: 768px) {
  .right-aside-nav {
    visibility: hidden;
  }
  .offcanvas-backdrop {
    visibility: hidden;
  }
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
}

main {
}

footer {
}
</style>