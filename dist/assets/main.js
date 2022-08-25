import { createApp, createSSRApp, h } from 'vue';
import App from "./App.vue";
import axios from 'axios';
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer'

axios.get("assets/main.js").then((res) => {
    console.log(res.data);
}).catch(error => {
    console.log(error);
});

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
