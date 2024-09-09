const pages = {
	root: Home,
};

export default function Page(pageName = '') {
	// root
	return pages[pageName];
}

function Home() {
	document.addEventListener('click', () => {});
}
