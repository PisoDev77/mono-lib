const { names } = require('./origin');

let [units, lessons] = names.trim().split('{나눠}');

units = units
	.trim()
	.split('\n')
	.map((i, idx) => {
		const [unitName, _] = i.trim().split('\t');

		const unitNo = ((idx + 1) % 8) - 1;
		return {
			unitNo: unitNo < 0 ? 7 : unitNo,
			unitName: unitName,
			unitNoIcon: `../../common/img/2/math/num${unitNo < 0 ? 7 : unitNo}.png`,
			menuTarget: 'lesson-wrap' + (unitNo < 0 ? 7 : unitNo),
		};
	});
lessons = lessons
	.trim()
	.split('[1차시]')
	.filter((i) => i.trim() !== '')
	.map((i) => i.split('\n').filter((i) => i.trim() !== ''))
	.map((i) => {
		return i.map((j) => {
			const [originName, newName, page] = j.split('\t');
			const name = newName.trim() === '' ? originName : newName;
			isNaN(+page);
			return {
				name: name.replace(/\[.+\]/, '').trim(),
				page: +page,
			};
		});
	});

lessons.forEach((lesson, idx) => {
	console.log('lessons', lesson);
});
