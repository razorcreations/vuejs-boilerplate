// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'reset-css';
import '@/scss/app.scss';

import Vue from 'vue';
import App from './App';

import AuthService from '@/services/AuthService';
import AppErrorComponent from '@/components/AppErrorComponent';
import Header from '@/components/HeaderComponent';

import store from '@/store/index.js';
import router from './router';
import './registerServiceWorker';

import moment from 'moment';
import Datetime from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import { Settings } from 'luxon';
import Vuelidate from 'vuelidate';
import vueDebounce from 'vue-debounce';
import bugsnag from '@bugsnag/js';
import bugsnagVue from '@bugsnag/plugin-vue';
import jQuery from 'jquery';

Settings.defaultLocale = 'en-GB';

Vue.use(Vuelidate);
Vue.use(vueDebounce);

// Setup and config momentjs
window.moment = moment;
window.moment.locale('en-gb');

window.jQuery = jQuery;
window.$ = jQuery;

window.axios = require('axios');
window.axios.defaults.baseURL = process.env.API_URL;

// Setup and initialise the AuthService
window.auth = AuthService;
window.auth.init();

// Setup axios interceptors
window.axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response) {
		if (error.response.status === 403) {
			window.auth.logout();
		}
		if (error.response.status === 401) {
			window.auth.logout();
		}
	}
	return Promise.reject(error);
});

Vue.config.productionTip = false;

Vue.use(Datetime);

if (process.env.BUGSNAG_KEY) {
	window.bugsnagClient = bugsnag(process.env.BUGSNAG_KEY);
	window.bugsnagClient.use(bugsnagVue, Vue);
}

// Register some global components
Vue.component('app-error', AppErrorComponent);
Vue.component('app-header', Header);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>',
	store,
});
