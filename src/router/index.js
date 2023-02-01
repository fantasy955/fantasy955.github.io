import Layout from '@/pages/Layout.vue';
import HomeBlog from '@/pages/blog/HomeBlog.vue';
import Home from '@/pages/home/HomePage.vue';
import BlogContent from '../pages/blog/detail/BlogPage.vue';
import NotFound from '../pages/common/NotFound.vue';
import { createRouter, createWebHashHistory, createWebHistory, beforeEnter } from 'vue-router';
import HomeDemo from '../pages/demo/HomeDemoPage.vue';
import DefaultDemoContent from '../components/demo/DefaultDemoContent.vue';
const BookPage = () => import('@/pages/book/Index.vue');
const EnergyFlow = () => import('../components/demo/pages/_EnergyFlow.vue');

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            // {
            //     path: '',
            //     redirect: '/blog',
            // },
            {
                path: 'home',
                component: Home,
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: 'demo',
                component: HomeDemo,
                meta: {
                    keepAlive: true,
                }

            }, {
                path: 'blog',
                component: HomeBlog,
                meta: {
                    keepAlive: true,
                }
            }, {
                path: 'book',
                component: BookPage,
            }
        ],
        // 默认路由配置方法
        redirect: 'home',
    }, {
        path: '/blog/:categorySname/:blogName/:path',
        // meta: {title: '博客', withTitle: true},
        // 只有独享前置路由守卫
        name: 'blog', component: BlogContent, props: true,
        meta: {
            keepAlive: false,
        }
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