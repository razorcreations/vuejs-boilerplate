<template>
	<article
		v-if="ready"
		class="page container"
	>
		<h1>Article page</h1>
	</article>
</template>

<script>
export default {
	name: 'PageContent',

	data () {
		return {
			page: null,
			ready: false,
		};
	},

	watch: {
		'$route' (to, from) {
			if (to.path !== from.path) {
				this.get_page();
				document.body.scrollTop = 0;
			}
		},
	},

	created () {
		this.get_page();
	},

	methods: {
		get_current_slug () {
			let routePathParts = this.$route.path.split('/').filter(part => part.length);

			if (routePathParts.slice(-1)[0] !== 'undefined') {
				return routePathParts.slice(-1)[0];
			}

			return this.$route.path;
		},

		get_page () {
			window.axios.get('wp-json/wp/v2/pages?_embed&slug=' + this.get_current_slug())
				.then(res => {
					if (res.status !== 200) {
						// Show some error or 404 page
						this.$router.replace({name: 'error'});
					}

					if ([...res.data].length === 0) {
						// Show some error or 404 page
						this.$router.replace({name: 'oops'});
					} else {
						this.page = [...res.data][0];

						this.ready = typeof (this.page) !== 'undefined';
					}
				}).catch(err => {
					// Show some error or 404 page
					console.log(err);
					this.$router.replace({name: 'error'});
				});
		},
	},
};
</script>
