<template>
	<div class="app-header">
		<router-link
			:to="{name: 'dashboard'}"
			class="app-header__link"
		>
			<img
				src="../svg/logo.svg"
				alt="CLIENT_NAME Logo"
				class="app-header__logo"
			>
		</router-link>
	</div>
</template>

<script>
export default {
	data () {
		return {};
	},
};
</script>
