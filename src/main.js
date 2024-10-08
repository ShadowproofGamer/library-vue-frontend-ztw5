import './assets/main.css'

import {createApp, defineAsyncComponent} from 'vue'
import App from './App.vue'
import router from "@/router/index.js";


const app = createApp(App)
    .use(router)
    .mount('#app');

