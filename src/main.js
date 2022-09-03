import { createApp, createSSRApp, defineComponent, h } from 'vue';
import App from "./App.vue";
import axios from 'axios';
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer';
import router from './router/index';
import uConifg from './config';

const app = createApp(App);
app.use(router);
app.use(uConifg);
// app.use(MathJax);
app.mount('#app');
