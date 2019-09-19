/* eslint-disable no-console */
if (process.env.NODE_ENV === 'production') {
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant
		window.addEventListener('load', () => {
			navigator.serviceWorker.register(`${process.env.BASE_URL}sw.js`).then(registration => {
				console.log('Registration success');
			})
				.catch(err => {
					console.log('Registration failed');
					console.error(err);
				});
		});
	}
}
