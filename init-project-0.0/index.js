const fs = require('fs');
const path = require('path');

/**
 * - contents/
 *  - src/
 *      - component/
 *      - css/
 *          - component/
 *          - common.css
 *          - layout.css
 *      - app.js
 *      - data.js
 *  - data/
 *  - index.html
 *  - config.js
 */
const projectFolderScheme = [
	{
		name: 'src',
		data: [
			{ name: 'assets', data: [{ name: 'fonts', data: [] }] },
			{ name: 'component', data: [] },
			{
				name: 'css',
				data: [
					{ name: 'common.css', data: '', copyPath: './defaults/common.css' },
					{ name: 'layout.css', data: '' },
					{ name: 'component', data: [] },
				],
			},
			{ name: 'app.js', data: '', copyPath: './defaults/app.js' },
			{ name: 'page.js', data: '', copyPath: './defaults/page.js' },
			{ name: 'data.js', data: '' },
			{ name: 'lib.js', data: '', copyPath: './defaults/lib.js' },
		],
	},
	{ name: 'data', data: [] },
	{ name: 'index.html', data: '', copyPath: './defaults/index.html' },
	{ name: 'config.js', data: '', copyPath: './defaults/config.js' },
];

function createDirectory(dirPath, data) {
	fs.mkdirSync(dirPath, { recursive: true }); // 재귀적으로 디렉토리 생성

	data.forEach((item) => {
		const fullPath = path.join(dirPath, item.name);

		if (Array.isArray(item.data)) {
			// Folder
			createDirectory(fullPath, item.data);
		} else {
			// File handling with copy
			if (item.copyPath) {
				const sourcePath = path.resolve(__dirname, item.copyPath); // Resolve relative path
				try {
					const content = fs.readFileSync(sourcePath, 'utf8');
					fs.writeFileSync(fullPath, content);
				} catch (error) {
					console.error(`Error copying file ${item.name}: ${error}`);
				}
			} else {
				// Create empty file
				fs.writeFileSync(fullPath, item.data);
			}
		}
	});
}

const currentDir = process.cwd(); // Get current working directory
createDirectory(path.join(currentDir, './contents'), projectFolderScheme);
