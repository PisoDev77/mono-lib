import { autoScale, setHTML } from './lib.js';
import Page from './page.js';

document.addEventListener('DOMContentLoaded', () => {
	autoScale();
});

window.addEventListener('resize', autoScale);
window.addEvetListener('load', () => {
	// render
	setHTML('root');

	// init render page
	Page();
});
