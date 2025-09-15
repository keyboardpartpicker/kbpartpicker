import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Builder from './pages/Builder.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/builder', component: Builder },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;