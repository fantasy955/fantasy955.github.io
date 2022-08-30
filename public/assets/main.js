import { createApp, createSSRApp, h } from 'vue';
import App from "./App.vue";
import axios from 'axios';
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer'

const ad = defineComponent({
    
});
console.log(ad);

createApp(App).mount('#app');