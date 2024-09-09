import { styles } from '../config.js';

/**
 *
 */
const autoScale = () => {
	const $wrapper = document.querySelector('div.container-wrapper');
	const scaleW = window.innerWidth / 1920;
	const scaleH = window.innerHeight / 1080;
	const scale = scaleW < scaleH ? scaleW : scaleH;
	$wrapper.style.transform = `scale(${scale}) translate(-50%, -50%)`;
};

/**
 *
 */
const setHTML = async (page) => {
	try {
		styles[page].forEach((stylePath) => {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = stylePath;
			document.head.appendChild(link);
		});
	} catch (error) {
		console.error(error);
	}
};

export { autoScale, setHTML };
