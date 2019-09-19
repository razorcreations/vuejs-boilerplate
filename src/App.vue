<template>
	<div id="app">
		<app-header
			v-if="isLoggedIn"
		/>
		<router-view />
		<app-nav v-if="isLoggedIn" />
		<app-search :class="{show: searchOpen}" />
	</div>
</template>

<script>
import AppSearch from '@/components/SearchComponent';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
	name: 'App',

	components: {
		AppSearch,
	},

	data () {
		return {
			isLoggedIn: false,
		};
	},

	computed: {
		...mapState(['searchOpen']),
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
