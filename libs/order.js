export default async function order(steps) {
	for (const step of steps) {
		await new Promise((resolve) => {
			step();
			resolve();
		});
	}
}
