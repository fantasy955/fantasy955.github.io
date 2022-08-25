# 非单文件组件(.html)

[(71条消息) Vue-非单文件组件_@栗栗子的博客-CSDN博客](https://blog.csdn.net/qq_62022086/article/details/124360604)

## 概念

一个文件中包含有多个组件(a.html)

## 步骤

1. 创建组件

![image-20220823201627485](assets/image-20220823201627485.png)

2. 注册组件

![image-20220823201414656](assets/image-20220823201414656.png)

![image-20220823201850969](assets/image-20220823201850969.png)

3. 使用组件

![image-20220823201350410](assets/image-20220823201350410.png)

自闭合`<xuesheng/>`

    <!-- 
        关于VueComponent：
            1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
    
            2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
              即Vue帮我们执行的：new VueComponent(options)。
            
            3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueCompoment!!!!
    
            4.关于this指向：
                (1).组件配置中：
                    data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
                (2). new Vue(options)配置中：
                    data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
                
            5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
              Vue的实例对象，以后简称vm
     -->

## VueComponent与Vue的内置关系

![image-20220824081342646](assets/image-20220824081342646.png)

`VueComponent`是Vue2.extend生成的构造函数

![image-20220824082243803](assets/image-20220824082243803.png)

**保证Vue原型更新时，VueComponent也能更新。**



# 单文件组件(.vue) -- 生产

# 概念

一个文件中只包含一个组件(a.vue)

## 编写.Vue组件文件

![image-20220824094606384](assets/image-20220824094606384.png)

```vue
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
```

![image-20220825105551372](assets/image-20220825105551372.png)



# Vue推荐组件命名

Vue会将组件名转换成首字母大写（脚手架环境）；

单单词组成的组件名如`school`，Vue推荐全小写或首字母大写；

多单词组成的组件名如`my school`，Vue推荐：1、全小写，单词间用`-`连接：`my-school`, Vue会转换成`MySchool`；2、首字母大写，驼峰命令：`MySchool`，与Vue转换格式呼应（非脚手架环境Vue不能处理）。

![image-20220823202759032](assets/image-20220823202759032.png)

![image-20220823210013188](assets/image-20220823210013188.png)

![image-20220825110159589](assets/image-20220825110159589.png)

vue.config.js给webpack用，webpack基于node.js，而node的模块化规范是commonjs。



# 脚手架报错即解决方案

-  error “Component name “*****“ should always be multi-word”

[(71条消息) 在 vue eslint 报错 error “Component name “*****“ should always be multi-word”，该怎么办？_努力学习前端的小陈的博客-CSDN博客](https://blog.csdn.net/qq_57587705/article/details/124674660)

[(71条消息) .eslintrc.js文件内容/配置eslint/eslint参数_是泡沫呀的博客-CSDN博客_.eslintrc.js](https://blog.csdn.net/qq_51657072/article/details/124427270)

- error ‘xxx‘ is assigned a value but never used

[(71条消息) vue项目 报错 error ‘xxx‘ is assigned a value but never used_前端酱紫的博客-CSDN博客](https://blog.csdn.net/wuj1935/article/details/117431722)

- Can't resolve 'less-loader'





# 脚手架环境写相对路径

![image-20220825074105085](assets/image-20220825074105085.png)

- 取代`./`，`/`。

根文件目录



![image-20220825074134323](assets/image-20220825074134323.png)

- webpack一个插件完成的功能



![image-20220825074222748](assets/image-20220825074222748.png)

- 当浏览器不支持js，noscript标记中的元素就会渲染。



# 引入样式文件

```javascript
// 这是第一种引入方式，使用相对路径，缺点是文件层级过多时，会出现多个../
<style scoped lang="less">
@import "../../../seawater/style/common.less";
</style>

// 这是第二种引入方式，采用~@方式引入，即使文件层级过多也不会出现多个../, ~@表示src目录下
<style scoped lang="less">
@import "~@/seawater/style/common.less";
</style>

// scoped: 用于隔离样式，防止全局污染，会让当前样式仅作用于当前组件

```



# ref和id的使用

在编写vue组件时，为了获取template中的DOM元素，可以为DOM元素添加`id`，然后使用

```javascript
doucument.getElementById()
```

获取。

Vue中提出了一个新概念`ref`，如果HTML基础元素添加了`ref`标签，可以使用

```
this.$refs.[ref_name]
```

访问该DOM元素。

若是组件添加`ref`属性，通过上述方法访问的是组件对应的VueComponent对象，

而使用`id`属性，通过`doucument.getElementById()`访问的是该组件对应模板的内容，`id`也被添加到模板的根元素上。

![image-20220825112748297](assets/image-20220825112748297.png)

## 限定样式的范围

Vue会给每个template生成的DOM添加data-v-[随机数]，

![image-20220825161220417](assets/image-20220825161220417.png)

![image-20220825161125148](assets/image-20220825161125148.png)

通过样式选择器限定生效范围。



# probs属性的使用

用于给组件传值。

**值不能被修改。**

![image-20220825113102555](assets/image-20220825113102555.png)

![image-20220825113212452](assets/image-20220825113212452.png)

## 参数类型

- 传值时

`age='18'` vs `:age='18'`

前者传的字符串，后者传递数值。

![image-20220825114204194](assets/image-20220825114204194.png)

- 接收方限定

![image-20220825114247339](assets/image-20220825114247339.png)

- 是否必须提供

![image-20220825114514495](assets/image-20220825114514495.png)

## 修改prob

![image-20220825114948282](assets/image-20220825114948282.png)

**probs优先被接收。**

![image-20220825115157382](assets/image-20220825115157382.png)



# mixin

![image-20220825144121616](assets/image-20220825144121616.png)



# plugin

![image-20220825154251180](assets/image-20220825154251180.png)

![image-20220825160228980](assets/image-20220825160228980.png)

