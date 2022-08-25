import { createApp, createSSRApp, h } from 'vue';
import App from "./App.vue";
// import $ from 'jquery';
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer'

// console.log($('#app'));
// console.log(jquery('#app'));
createApp(App).mount('#app');
let a = 1;

// SSR Server-Side Rendering
// const app = createSSRApp({
//     components: {
//         App
//     },
//     template: `<div><App/></div>`
// });
// renderToString(app).then((html) => {
//     console.log(html)
// })
