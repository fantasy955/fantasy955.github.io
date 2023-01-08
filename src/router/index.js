// const HomePage = () => import('@/components/home/HomePage.vue');
// const HomeContent = () => import('@/pages/home/HomePage.vue');
// const BlogPage = () => import('@/pages/blog/BlogPage.vue');
// const HomeBlog = () => import('@/pages/blog/HomeBlog');
// const NotFound = () => import('@/pages/common/NotFound.vue');
import Layout from '@/pages/Layout.vue';
import HomePage from '@/pages/home/HomePage.vue';
import BlogPage from '@/pages/blog/content/BlogPage.vue';
import HomeBlog from '@/pages/blog/HomeBlog';
import NotFound from '@/pages/NotFound.vue';
// import { createRouter, createWebHashHistory } from 'vue-router';
const HomeDemoPage = () => import('@/pages/demo/HomeDemoPage.vue');
// const DefaultDemoContent = () => import('@/pages/demo/DefaultDemoContent.vue');
const EnergyFlow = () => import('@/pages/demo/pages/_EnergyFlow.vue');
const TestPage = () => import('@/pages/test/TestPage.vue');

export const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'home',
                component: HomePage,
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: 'demo',
                component: HomeDemoPage,
                meta: {
                    keepAlive: true,
                }

            },
            {
                path: 'blog',
                component: HomeBlog,
                meta: {
                    keepAlive: true,
                }
            },
        ],
        // 默认路由配置方法1
        redirect: 'home',
        // 方法2
        // {
        //     path: '',
        //     redirect: '/blog',
        // },
    }, {
        path: '/blog/:categorySname/:blogName/:path',
        // meta: {title: '博客', withTitle: true},
        // 只有独享前置路由守卫
        name: 'blog', component: BlogPage, props: true,
        meta: {
            keepAlive: false,
        }
    }
]

routes.push({
    path: '/pages/energyflow',
    component: EnergyFlow,
});

routes.push({
    path: '/test',
    component: TestPage,
});

// const router = createRouter({
//     // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//     history: createWebHashHistory(),
//     // history: createWebHistory(),
//     routes,
// });

// 全局前置路由守卫
// 初始化，切换前调用（url不会改变）
// router.beforeEach((to, from, next) => {
//     // console.log(to, from, next);
//     next();
// });

//后置守卫
// router.afterEach((to, from) => {

// })
// export default router;