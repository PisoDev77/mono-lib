const { saveRefCommonToFile } = require('./save');

const str = `과학과 교육과정	pdf	과학과 교육과정.pdf
교과서 편수 자료	pdf	교과서 편수 자료.pdf
과학과 학기 지도 계획	pdf	초등_과학 5-1_과학과 학기 지도 계획.pdf
과학 관련 누리집	hwp	과학 관련 누리집.hwp
과학 도서 목록	hwp	과학 도서 목록.hwp
안전 활동지	hwp	초등_과학 5-1_안전 활동지.hwp
디지털 예절 활동지	hwp	초등_과학 5-1_디지털 예절 활동지.hwp
자료 출처	pdf	초등_과학 5-1_자료 출처.pdf
실험실 안전 수칙	mp4	실험실 안전 수칙.mp4
실험 기구 사용법(디지털 현미경)	mp4	실험 기구 사용법(디지털 현미경).mp4
실험 기구 사용법(눈금실린더)	mp4	실험 기구 사용법(눈금실린더).mp4
실험 기구 사용법(전자저울)	mp4	실험 기구 사용법(전자저울).mp4
`;

const arr = str
	.trim()
	.split('\n')
	.map((i) => i.split('\t'))
	.filter((i) => i.map((j) => j.trim() !== ''));

const res = arr.map(([name, type, path]) => {
	const icon = '../common/img/3/common/icon_' + (type === 'mp4' ? 'play' : type) + '.png';
	return {
		name,
		type,
		icon,
		path: `../ref_common/${path}`,
	};
});
saveRefCommonToFile(res);
