<template>
  <div>
    <div class="demoitem">
      <h3>refDemoCount</h3>
      <textarea ref="textRefCount"></textarea>
    </div>
    <div class="demoitem">
      <h3>refDemoObj</h3>
      <textarea ref="textRefObj"></textarea>
    </div>
    <div class="demoitem">
      <h3>reactiveDemoObj</h3>
      <textarea ref="textReactiveObj"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
let demoCount = 0;
let demoObj = {
  name: "wjl",
  age: 22,
  sex: "man",
};

const refDemoCount = ref(demoCount);
const refDemoObj = ref(demoObj);
const reactiveDemoObj = reactive(demoObj);

const textRefCount = ref(null);
const textRefObj = ref(null);
const textReactiveObj = ref(null);

onMounted(() => {
  console.log(refDemoCount);
  console.log(refDemoObj);
  console.log(reactiveDemoObj);

  console.log(textRefCount.value.value = JSON.stringify(refDemoCount))
  console.log(textRefObj.value.value = JSON.stringify(refDemoObj))
  console.log(textReactiveObj.value.value = JSON.stringify(reactiveDemoObj))
});
</script>

<style scoped>
.demoitem {
  display: flex;
  flex-wrap: wrap;
}
</style>