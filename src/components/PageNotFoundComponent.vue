<template>
	<article
		v-if="ready"
		class="page container"
	>
		<h1>Page not found</h1>
	</article>
</template>

<script>
export default {
	name: 'PageNotFound',

	data () {
		return {
			page: null,
			ready: false,
		};
	},

	created () {
		this.get_page();
	},

	methods: {
		get_current_slug () {
			return 'oops';
		},

		get_page () {
			window.axios.get('wp-json/wp/v2/pages?_embed&slug=' + this.get_current_slug())
				.then(res => {
					if (res.status !== 200) {
						// Show some error or 404 page
						this.$router.replace({name: 'error'});
					}

					this.page = [...res.data][0];

					this.ready = this.page;
				}).catch(err => {
					// Show some error or 404 page
					console.log(err);
					this.$router.replace({name: 'error'});
				});
		},
	},
};
</script>
