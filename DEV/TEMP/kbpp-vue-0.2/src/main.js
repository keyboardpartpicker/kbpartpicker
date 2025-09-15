import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const kbpp = createApp(App);
kbpp.use(router);
kbpp.mount('#app');