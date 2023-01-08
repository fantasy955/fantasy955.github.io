import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { BlogListGenerationPlugin } = require('./src/utils/BlogListGenerationPlugin');
const AutoImport = require('unplugin-auto-import/vite')
const Components = require('unplugin-vue-components/vite')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path');
const mdLoader = require('./src/utils/md-loader-vite');

const pathResolve = (dir) => {
    return path.resolve(__dirname, '.', dir)
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
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', 'css'],
    },
    ssgOptions: {
        includedRoutes(paths, routes) {
            // exclude all the route paths that contains 'foo'
            console.log(path);
            console.log(routes);
            return paths;
        },
    },
    ssr: {
        noExternal: ['element-plus'],
    },
})