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
        @click="$emit('closeNav')"
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
    @click="$emit('closeNav')"
  ></div>
</template>

<script setup>
import { defineProps, onBeforeUnmount, onMounted, ref, defineEmits } from "vue";

const show = ref(true);
const probs = defineProps({
  mask: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['closeNav'])

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