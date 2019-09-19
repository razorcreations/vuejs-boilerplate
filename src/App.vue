<template>
	<div id="app">
		<app-header
			v-if="isLoggedIn"
		/>
		<router-view />
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
	name: 'App',

	data () {
		return {
			isLoggedIn: false,
		};
	},

	watch: {
		'$route' (to, from) {
			if (to.path !== from.path) {
				this.isLoggedIn = window.auth.isLoggedIn();
			}
		},
	},

	mounted () {
		this.loadUser();
		this.isLoggedIn = window.auth.isLoggedIn();
		this.listenToOnlineStatus();
	},

	methods: {
		...mapActions(['loadUser']),

		...mapMutations(['setOnline']),

		listenToOnlineStatus () {
			window.addEventListener('online', () => {
				this.setOnline(true);
			});

			window.addEventListener('offline', () => {
				this.setOnline(false);
			});
		},
	},
};
</script>
