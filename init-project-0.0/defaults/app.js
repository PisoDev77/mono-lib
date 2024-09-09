import { autoScale, setHTML } from './lib.js';
import Page from './page.js';

document.addEventListener('DOMContentLoaded', () => {
	autoScale();
});

window.addEventListener('resize', autoScale);
window.addEventListener('load', () => {
	// render
	setHTML('root');

	// init render page
	Page();
});
