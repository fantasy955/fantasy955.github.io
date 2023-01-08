import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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

const pathResolve = (dir) => {
    return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        mdLoader(),
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'css', ssr: true })],
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
})