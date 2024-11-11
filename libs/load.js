import order from './order.js';

window.addEventListener('load', async () => {
	document.body.style.visibility = 'visible';

	const arr = [
		() => {
			console.log(1);
		},
		() => {
			console.log(3);
		},
		() => {
			console.log(2);
		},
	];

	order(arr);
});
