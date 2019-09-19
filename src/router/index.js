import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/LoginComponent';
import Dashboard from '@/components/DashboardComponent';
import PageContent from '@/components/PageContentComponent';
import PageNotFound from '@/components/PageNotFoundComponent';
import AppError from '@/components/AppErrorComponent';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true,
			},
		},

		{
			path: '/login',
			name: 'login',
			component: Login,
		},

		{
			path: '/error',
			name: 'error',
			component: AppError,
			meta: {
				requiresAuth: true,
			},
		},

		{
			path: '/oops',
			name: 'oops',
			component: PageNotFound,
			meta: {
				requiresAuth: true,
			},
		},

		{
			path: '*',
			name: 'content',
			component: PageContent,
			meta: {
				requiresAuth: true,
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !window.auth.isLoggedIn()) {
		next({name: 'login'});
	} else {
		next();
	}
});

export default router;
