import { createPinia } from 'pinia';
import Particles from 'particles.vue3';
import { ViteSSG } from 'vite-ssg'
import App from "./App.vue";
import VueMarkdown from 'vue-markdown'
import routes from './router/index';
import uConifg from './config';
import 'highlight.js/styles/github.css';

export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    { routes },
    // function to have custom setups
    ({ app, router, routes, isClient, initialState }) => {
        // install plugins etc.
        const pinia = createPinia();
        app.use(Particles);
        app.use(pinia)
        app.use(uConifg);
        app.component('vue-markdown', VueMarkdown);
    },
)