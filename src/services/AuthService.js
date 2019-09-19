import CookieService from './CookiesService';

export default {
	login (username, password) {
		const data = {
			username,
			password,
		};

		return new Promise((resolve, reject) => {
			window.axios.post('wp-json/jwt-auth/v1/token', data).then(res => {
				this.setToken(res.data.token, res.data.expire_in);
				resolve(res);
			}).catch(err => {
				this.clearToken();
				reject(err);
			});
		});
	},

	setToken (token, expire) {
		window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		window.$.ajaxSetup({
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
		});
		CookieService.set('jwt-token', token, expire);
	},

	clearToken () {
		delete window.axios.defaults.headers.common['Authorization'];
		CookieService.remove('jwt-token');
	},

	logout () {
		this.clearToken();
		if (window.location.pathname === '/login') {
			return;
		}
		window.location.replace('/login?redirect=' + window.location.href);
	},

	init () {
		const token = CookieService.get('jwt-token');
		if (token) {
			this.setToken(token);
			return;
		}

		this.clearToken();
	},

	isLoggedIn () {
		return CookieService.exists('jwt-token');
	},
};
