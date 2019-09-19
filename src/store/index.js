import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		errors: {},
		user: {},
		online: true,
	},

	mutations: {
		setErrors (state, errors) {
			state.errors = errors;
		},

		clearErrors (state) {
			state.errors = {};
		},

		captureErrors (state, err) {
			if (err.response && err.response.data.errors) {
				state.errors = err.response.data.errors;
				return;
			}

			throw err;
		},

		setUser (state, user) {
			state.user = user;
		},

		setOnline (state, status) {
			state.online = status;
		},
	},

	getters: {

	},

	actions: {
		loadUser ({commit, dispatch}) {
			let localUser = window.localStorage.getItem('user');

			if (localUser) {
				localUser = JSON.parse(localUser);
				commit('setUser', localUser);
			}

			// Check if we're online
			if (window.navigator.onLine === false) {
				return;
			}

			window.axios.get('api/route/to/user/details').then(res => {
				dispatch('saveUser', res.data);
				commit('setUser', res.data);
			}).catch(() => {});
		},

		loadAll ({dispatch}) {
			dispatch('loadUser');
		},

		saveUser (context, user) {
			window.localStorage.setItem('user', JSON.stringify(user));
		},
	},
});
