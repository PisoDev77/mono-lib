const { init } = require('./make');
const { saveUnitsToFile, saveLessonsToFile } = require('./save');
const { units } = require('./origin');

const ROUTE = './6-1 자료실';

const makeUnits = async () => {
	const data = await init(ROUTE);

	// 단원별 자료
	const newUnits = [];
	Object.entries(data).forEach(([key, value]) => {
		if (key.includes('ch')) {
			const attachments = {};

			Object.entries(value['data']['단원별 자료']).forEach(([i, j]) => {
				attachments[i] = Object.keys(j)[0];
			});
			newUnits.push(attachments);
		}
	});

	const resUnits = units.map((unit, unitNo) => {
		const { attachments } = unit;
		let obj = {};

		Object.entries(attachments).forEach(([prop, b]) => {
			const tmp = Object.entries(newUnits[unitNo]);
			const _path = `../ch${unitNo + 1}/data/단원별 자료/`;

			if (prop.includes('평가')) {
				obj = {
					...obj,
					'평가 자료': tmp
						.filter(([i]) => i.includes('평가'))
						.map(([name, path]) => ({
							name,
							path: _path + name + '/' + path,
						})),
				};
			} else if (prop.includes('이미지')) {
				obj = {
					...obj,
					'이미지 자료': tmp
						.filter(([i]) => i.includes('이미지'))
						.map(([name, path]) => ({
							name,
							path: _path + name + '/' + path,
						})),
				};
			} else {
				obj = {
					...obj,
					'수업 자료': tmp
						.filter(([i, j]) => !i.includes('평가') && !i.includes('이미지'))
						.map(([name, path]) => ({
							name,
							path: _path + name + '/' + path,
						})),
				};
			}
		});

		return { ...unit, attachments: obj };
	});

	saveUnitsToFile(resUnits);
	return resUnits;
};

const makeLessons = async () => {
	const resUnits = await makeUnits();
	const data = await init(ROUTE);

	let path = '';
	// 차시별 자료
	const _newLessons = [];
	Object.entries(data).forEach(([key, value]) => {
		if (key.includes('ch')) {
			const tmp = [];

			Object.entries(value['data']['차시별 자료']).forEach(([i, j]) => {
				Object.entries(j).forEach(([f, d]) => {
					if (typeof d === 'object') {
						Object.keys(d).forEach((filename) => {
							tmp.push(`${f}/${filename}`);
						});
					} else {
						tmp.push(`${i}/${d}`);
					}
				});
			});
			_newLessons.push(tmp);
		}
	});

	const resLessons = resUnits.map((unit, unitNo) => {
		const { chapters } = unit;

		const newChapters = chapters.map((chapter) => {
			const { lessons } = chapter;
			let tmp = [];

			const newLessons = lessons.map((lesson, no) => {
				const lessonNo =
					lesson.lessonNo === '과학 이야기' || lesson.lessonNo === '특화    '
						? lesson.lessonNo
						: '-' + lesson.lessonNo + '차시';
				let arr = _newLessons[unitNo];
				console.log(lessonNo);
				arr = arr.filter((item) => {
					return item.includes(lessonNo);
				});

				// console.log(arr);
				tmp = [...tmp, ...arr];

				const _path = `../ch${unitNo + 1}/data/차시별 자료/`;
				const attachments = { '수업 PPT': [], 활동지: [], '멀티미디어 자료': [] };
				arr.forEach((i) => {
					if (i.endsWith('ppt') || i.endsWith('pptx')) {
						attachments['수업 PPT'] = [...attachments['수업 PPT'], { path: _path + i }];
					} else if (i.endsWith('hwp')) {
						attachments['활동지'] = [...attachments['활동지'], { path: _path + i }];
					} else if (i.endsWith('mp4')) {
						attachments['멀티미디어 자료'] = [...attachments['멀티미디어 자료'], { path: _path + i }];
					} else {
						console.error(i, '!ERROR');
					}
				});

				return { ...lesson, attachments };
			});

			console.log(tmp.length, _newLessons[unitNo].length);
			// console.log(tmp, _newLessons[unitNo]);

			return { ...chapter, lessons: newLessons };
		});

		return { ...unit, chapters: newChapters };
	});

	saveLessonsToFile(resLessons);
};

(async () => {
	await makeLessons();
})();
