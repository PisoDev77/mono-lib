const str = `과학과 교육과정	pdf	과학과 교육과정.pdf
교과서 편수 자료	pdf	교과서 편수 자료.pdf
과학과 학기 지도 계획	pdf	초등_과학 6-2_과학과 학기 지도 계획.pdf
과학 관련 누리집	hwp	과학 관련 누리집.hwp
과학 도서 목록	hwp	과학 도서 목록.hwp
안전 활동지	hwp	초등_과학 6-2_안전 활동지.hwp
디지털 예절 활동지	hwp	초등_과학 6-2_디지털 예절 활동지.hwp
자료 출처	pdf	초등_과학 6-2_자료 출처.pdf
실험실 안전 수칙	mp4	실험실 안전 수칙.mp4
실험 기구 사용법(스포이트)	mp4	실험 기구 사용법(스포이트).mp4
실험 기구 사용법(알코올램프)	mp4	실험 기구 사용법(알코올램프).mp4
실험 기구 사용법(전기 가열 장치)	mp4	실험 기구 사용법(전기 가열 장치).mp4

`;
const arr = str
	.split('\n')
	.map((i) => i.trim())
	.filter((i) => i.trim() !== '')
	.map((i) => i.split('\t'))
	.map(([name, type, path]) => {
		return {
			name,
			type,
			icon: '../common/img/3/common/icon_' + type + '.png',
			path: '../ref_common/' + path,
		};
	});

console.log(arr);
