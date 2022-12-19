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
    <input
      :value="userinfo.userInfo.sex"
      @change="
        (e) => {
          userinfo.setSex(e.target.value);
        }
      "
    />
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
import { useUserInfo } from "../stores/userInfo";
const userinfo = useUserInfo();
</script>

<script>
export default {
  name: "ConponentB",
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 400px;
  background-color: whitesmoke;
  margin: 0 auto;
}
</style>