import { createApp, createSSRApp, defineComponent, h } from 'vue';
import Renderer from '@vue/server-renderer';
import { createPinia } from 'pinia';
import Particles from 'vue-particles';
import App from "./App.vue";
import axios from 'axios';
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer';
import VueMarkdown from 'vue-markdown'
import router from './router/index';
import uConifg from './config';
// import "./tailwindcss.css"

const pinia = createPinia()
const app = createSSRApp(App);
app.use(Particles);
app.use(router);
app.use(pinia)
app.use(uConifg);
app.component('vue-markdown', VueMarkdown);
// const html = Renderer.renderToString(app);
// console.log(html);
// app.use(MathJax);
app.mount('#app');

// vue 2
// const vm = new Vue({
//     render: h => h(App)
// });
// vm.mount('#app');