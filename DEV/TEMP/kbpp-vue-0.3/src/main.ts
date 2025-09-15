import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from './router';

const kbpp = createApp(App);
kbpp.use(Router);
kbpp.mount('#app');