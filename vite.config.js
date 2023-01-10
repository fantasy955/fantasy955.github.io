import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
// const { BlogListGenerationPlugin } = require('./src/utils/BlogListGenerationPlugin.cjs');
// const AutoImport = require('unplugin-auto-import/vite')
// const Components = require('unplugin-vue-components/vite')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const path = require('path');
// const mdLoader = require('./src/utils/md-loader-vite.cjs');
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import mdLoader from './src/utils/md-loader-vite.js';
import Markdown from 'vite-plugin-vue-markdown';
import Pages from 'vite-plugin-pages';
import mdContainer from 'markdown-it-container';
import hljs from 'highlight.js';


const pathResolve = (dir) => {
    return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        mdLoader(),
        Vue({
            customElement: true,
            include: [/\.vue$/],
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'css', ssr: true })],
            extensions: ['vue', 'md'],
            include: [/\.vue$/, /\.vue\?vue/],
        }),
        Pages({
            extensions: ['vue'],
            dirs: [
                { dir: 'src/pages', baseRoute: '' },
            ],
            exclude: [
                'src/pages/index/blog/**/assets',
            ],
            extendRoute(route, parent) {
                if (route.path === '/') {
                    route['redirect'] = 'home';
                }
                route.meta = {};
                if (route.path === 'blog' || route.path === 'home' || route.path === 'demo'){
                    route.meta['keepAlive'] = true;
                }
                route.name = route.name.replace(/^index-/, '');
                // console.log(route);
                return route;
            },
        }),
    ],
    resolve: {
        alias: {
            '@': pathResolve('./src/'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    ssgOptions: {
        includedRoutes(paths, routes) {
            // exclude all the route paths that contains 'foo'
            console.log(paths);
            console.log(routes);
            return paths;
        },

    },
    ssr: {
        noExternal: ['element-plus'],
    },
    assetsInclude: [
        '*.md',
    ]
})