import HomePage from '../components/home/HomePage.vue';
import BlogPage from '../components/blog/BlogPage.vue';
import HomeBlog from '../components/blog/HomeBlog';
import NotFound from '../components/common/NotFound.vue';
import { createRouter, createWebHashHistory, createWebHistory, beforeEnter } from 'vue-router';
import HomeDemoPage from '../components/demo/HomeDemoPage.vue';
import DefaultDemoContent from '../components/demo/DefaultDemoContent.vue';
const EnergyFlow = () => import('../components/demo/pages/_EnergyFlow.vue');

const routes = [
    {
        path: '/',
        component: HomePage,
        children: [{
            path: '',
            redirect: '/blog',
            component: HomeBlog,
        }, {
            path: 'demo',
            component: HomeDemoPage,
            // children: [{
            //     name: 'demodetail',
            //     path: 'details',
            //     component: DemoContent,
            //     props: true
            // }]
        }, {
            path: 'blog',
            component: HomeBlog
        }]
    }, {
        path: '/blog/:categorySname/:blogName/:path',
        // meta: {title: '博客', withTitle: true},
        // 只有独享前置路由守卫
        name: 'blog', component: BlogPage, props: true
    }
]

routes.push({
    path: '/pages/energyflow',
    component: EnergyFlow,
});

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes,
});

// 全局前置路由守卫
// 初始化，切换前调用（url不会改变）
// router.beforeEach((to, from, next) => {
//     // console.log(to, from, next);
//     next();
// });

//后置守卫
// router.afterEach((to, from) => {
    
// })
export default router;