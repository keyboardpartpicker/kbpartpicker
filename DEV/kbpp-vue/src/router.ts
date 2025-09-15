import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Builder from './pages/Builder.vue';
import Builds from './pages/Builds.vue';
import Pulse from './pages/Pulse.vue';
import Forum from './pages/Forum.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/builder', component: Builder },
	{ path: '/builds', component: Builds },
	{ path: '/pulse', component: Pulse },
	{ path: '/forum', component: Forum },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;