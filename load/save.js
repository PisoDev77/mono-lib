const fs = require('fs');

// JSON 파일로 저장하는 함수
function saveUnitsToFile(units) {
	const jsonData = JSON.stringify(units, null, 2); // JSON 문자열로 변환, 보기 좋게 들여쓰기

	fs.promises
		.writeFile('./load/units.json', jsonData)
		.then(() => {
			console.log('units 배열이 units.json 파일에 저장되었습니다.');
		})
		.catch((err) => {
			console.error('파일 저장 중 에러 발생:', err);
		});
}

// JSON 파일로 저장하는 함수
function saveLessonsToFile(lessons) {
	const jsonData = JSON.stringify(lessons, null, 2); // JSON 문자열로 변환, 보기 좋게 들여쓰기

	fs.promises
		.writeFile('./load/lessons.json', jsonData)
		.then(() => {
			console.log('lessons 배열이 lessons.json 파일에 저장되었습니다.');
		})
		.catch((err) => {
			console.error('파일 저장 중 에러 발생:', err);
		});
}

// JSON 파일로 저장하는 함수
function saveRefCommonToFile(refCommon) {
	const jsonData = JSON.stringify(refCommon, null, 2); // JSON 문자열로 변환, 보기 좋게 들여쓰기

	fs.promises
		.writeFile('./load/refCommon.json', jsonData)
		.then(() => {
			console.log('refCommon 배열이 refCommon.json 파일에 저장되었습니다.');
		})
		.catch((err) => {
			console.error('파일 저장 중 에러 발생:', err);
		});
}

module.exports = { saveUnitsToFile, saveLessonsToFile, saveRefCommonToFile };
