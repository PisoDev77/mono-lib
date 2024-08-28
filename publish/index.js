const fs = require('fs');
const cheerio = require('cheerio');

// HTML 파일 경로
const htmlFilePath = 'publish/raw.html';
const filePaths = {
	layout: 'publish/layout.css',
	common: 'publish/common.css',
	script: 'publish/script.js',
};

// CSS 규칙 생성 함수
const generateCssRules = (selectors, $, comment) => {
	let cssRules = '';
	selectors.each((i, elem) => {
		const tagName = elem.name;
		const classNames = $(elem).attr('class');

		if (classNames) {
			classNames.split(' ').forEach((className) => {
				cssRules += `${tagName}.${className} {\n  /* ${comment}*/\n}\n\n`;
			});
		}
	});
	return cssRules;
};

const generateJS = (selectors, $) => {
	let jsCode = '';

	selectors.each((i, elem) => {
		if (+i === 3) {
			return;
		}
		const tagName = elem.name;
		const id = $(elem).attr('id');
		const classNames = $(elem).attr('class');
		const selectorParts = [];

		if (id) {
			selectorParts.push(`#${id}`);
		}
		if (classNames) {
			classNames.split(' ').forEach((className) => {
				selectorParts.push(`.${className}`);
			});
		}

		const selector = selectorParts.join('');

		// 클래스명 기반으로 변수 이름 생성
		let variableName = '';
		if (classNames) {
			classNames.split(' ').forEach((className, idx) => {
				// 첫 글자를 대문자로 변환하고 나머지 글자는 소문자로 변환
				const formattedClassName =
					idx > 0
						? className.charAt(0).toUpperCase() + className.slice(1).toLowerCase()
						: className.charAt(0).toLowerCase() + className.slice(1).toLowerCase();
				variableName += formattedClassName;
			});
		} else {
			// 클래스명이 없으면 태그명과 인덱스를 사용
			variableName = `${tagName.charAt(0).toUpperCase() + tagName.slice(1)}${i}`;
		}

		if (selector) {
			jsCode += `const ${variableName} = SHADOW_WRAP.querySelector('${selector}');\n`;
		}
	});

	jsCode += `
	// SHADOW_DOM READY
	$(document).ready(function () {});
	`;

	return jsCode;
};

// HTML 파일 읽기
fs.readFile(htmlFilePath, 'utf8', (err, html) => {
	if (err) {
		console.error('Error reading HTML file:', err);
		return;
	}

	// cheerio로 HTML 파싱
	const $ = cheerio.load(html);

	// CSS 규칙 생성

	const layout =
		'#wrap{height:1080px;} article.container{ width:100%;height:100%; position:relative}' +
		generateCssRules($('*'), $, '(display, translate, offset)');
	const common =
		'article.container * { /* default font size */font-size: 34px;}' + generateCssRules($('*'), $, '(font, color)');
	const cssRules = {
		layout,
		common,
		script: generateJS($('*'), $),
	};

	// 모든 CSS 파일을 동시에 작성
	Object.keys(filePaths).forEach((key) => {
		fs.writeFile(filePaths[key], cssRules[key], (err) => {
			if (err) {
				console.error(`Error writing ${key} CSS file:`, err);
			} else {
				console.log(`${key.charAt(0).toUpperCase() + key.slice(1)} file has been generated:`, filePaths[key]);
			}
		});
	});
});
