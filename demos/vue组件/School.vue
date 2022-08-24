<template>
  <!-- 组件的结构 -->
  <div>
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址:{{ address }}</h2>
    <button $click="showName">点我提示名称</button>
  </div>
</template>

<script>
// es6默认暴露  常用(只需要暴露一个)
// import *** from ***
// 组件的交互
export default {
  name: "School",
  data() {
    return {
      name: "hnu",
      address: "css",
    };
  },
  methods: {
    showName() {
      alert(this.name);
    },
  },
};

// 统一暴露
// import {} from ***
// const School = {
//   data() {
//     return {
//       name: "hnu",
//       address: "css",
//     };
//   },
//   methods: {
//     showName() {
//       alert(this.name);
//     },
//   },
// };
// export { School };
</script>

<style>
/* 组件的样式 */
h2 {
  background: rgb(189, 25, 210);
  text-align: center;
  border: 5px;
}
</style>