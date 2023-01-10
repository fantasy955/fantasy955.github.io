<template>
  <div class="main">
    名称
    <input
      :value="userinfo.userInfo.name"
      @change="(e) => (userinfo.userInfo.name = e.target.value)"
    />
    <br />
    年龄
    <input
      :value="userinfo.userInfo.age"
      @change="(e) => (userinfo.userInfo.age = e.target.value)"
    />
    <br />
    性别
    <input :value="userinfo.userInfo.sex" @change="(e) => onChangeSex(e)" />
    <br />
    描述
    <input
      :value="userinfo.userInfo.description"
      @change="
        (e) => {
          userinfo.setDescription(e.target.value);
        }
      "
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { useUserInfo } from "../stores/userInfo";
const userinfo = useUserInfo();
// const timer = setInterval(() => {
//   console.log(userinfo.userInfo);
// }, 1000);
// onMounted(() => {});

// onUnmounted(() => {
//     clearInterval(timer)
// });

function onChangeSex(e) {
//   console.log(e.target.value);
  userinfo.setSex(e.target.value);
}
</script>

<script>
export default {
  name: "ConponentA", // 组件展示时的名称（DevOps）
};
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 400px;
  background-color: bisque;
  margin: 0 auto;
}
</style>