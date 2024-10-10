const fs = require('fs');
const path = require('path');

// 디렉터리 안의 모든 파일과 폴더를 객체로 반환하는 함수
async function readDirRecursive(dirPath) {
	const result = {};

	// 현재 디렉터리의 파일 및 폴더 목록 읽기
	const files = await fs.promises.readdir(dirPath);

	for (const file of files) {
		const filePath = path.join(dirPath, file);
		const stat = await fs.promises.stat(filePath);

		if (stat.isDirectory()) {
			// 폴더인 경우 재귀적으로 탐색
			result[file] = await readDirRecursive(filePath);
		} else {
			// 파일인 경우 파일 이름만 객체에 저장
			result[file] = file; // 파일명만 저장
		}
	}

	return result;
}

const init = async (path) =>
	// 실행 및 결과를 파일로 저장
	await readDirRecursive(path)
		.then((result) => {
			// JSON 형식으로 결과를 변환
			const data = `const result = ${JSON.stringify(result, null, 2)};\n\nmodule.exports = {result}`;

			// result.js 파일로 저장
			fs.promises
				.writeFile('./load/res.js', data)
				.then(() => {
					console.log('결과가 res.js 파일에 저장되었습니다.');
				})
				.catch((err) => {
					console.error('파일 저장 중 에러 발생:', err);
				});

			return result;
		})
		.catch((err) => {
			console.error('Error:', err);
		});

module.exports = { init };
