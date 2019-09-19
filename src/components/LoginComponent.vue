<template>
	<div class="login container">
		<app-header />

		<div class="login__form">
			<form
				action=""
				class="form"
				autocomplete="off"
				@submit.prevent="login()"
			>

				<p class="bold login__hint">Please enter your unique log in details.</p>

				<div class="form__group">
					<input
						v-model="username"
						type="text"
						placeholder="Username"
						name="username"
						class="form__control"
						autocomplete="false"
					>
				</div>

				<div class="form__group">
					<input
						v-model="password"
						type="password"
						placeholder="Password"
						name="password"
						class="form__control"
						autocomplete="false"
					>
				</div>

				<button
					class="button button--pill"
					type="submit">Log In</button>

				<app-error
					v-if="error"
					:text="error"
				/>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'Login',

	data () {
		return {
			username: '',
			password: '',
			error: null,
		};
	},

	methods: {
		...mapActions(['loadAll']),

		login () {
			this.error = null;

			window.auth.login(this.username, this.password).then(res => {
				this.loadAll();

				// Handle redirecting user after login successful
				if (this.$route.query.redirect) {
					window.location.replace(this.$route.query.redirect);
					return;
				}

				this.$router.push({name: 'dashboard'});
			}).catch(err => {
				if (err.response && err.response.status === 403) {
					this.error = 'Incorrect login details, try again';
					return;
				}

				this.error = 'Something went wrong, please try again';
			});
		},
	},
};
</script>
