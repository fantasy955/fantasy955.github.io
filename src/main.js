import { createApp, createSSRApp, defineComponent, h } from 'vue';
import App from "./App.vue";
import axios from 'axios';
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer';
import HomePage from './components/home/HomePage.vue';
import BlogPage from './components/blog/BlogPage.vue';
import HomeBlog from './components/blog/HomeBlog';
import NotFound from './components/common/NotFound.vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import uConifg from './config';
import DemoContent from './components/demo/DemoContent.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
    children: [{
      path: '',
      component: HomeBlog,
    }, {
      path: 'demo',
      component: DemoContent
    }, {
      path: 'blog',
      component: HomeBlog
    }]
  }, {
    path: '/blog/:categorySname/:blogName/:path',
    name: 'blog', component: BlogPage, props: true
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})


const app = createApp(App);
app.use(router);
app.use(uConifg);
// app.use(MathJax);
app.mount('#app');
