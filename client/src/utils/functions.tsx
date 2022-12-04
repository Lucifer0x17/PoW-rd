export const generateNumberToText = (ref: { current: any }) => {
	const element = ref.current;
	const startTime = Date.now();
	const duration = 2000;
	const letters = element.dataset.text.split("");
	const steps = letters.length;

	const map = (n: number, x1: number, y1: number, x2: number, y2: number) =>
		Math.min(Math.max(((n - x1) * (y2 - x2)) / (y1 - x1) + x2, x2), y2);

	const random = (set: string | any[]) =>
		set[Math.floor(Math.random() * set.length)];

	let frame;

	(function animate() {
		frame = requestAnimationFrame(animate);

		const step = Math.round(
			map(Date.now() - startTime, 0, duration, 0, steps)
		);

		element.innerText = letters
			.map((s: any, i: number) =>
				step - 1 >= i ? letters[i] : random("0123456789")
			)
			.join("");

		if (step >= steps) {
			cancelAnimationFrame(frame);
		}
	})();
};

export function shortId() {
	return "_" + Math.random().toString(36).substr(2, 9);
}

export function randomColor() {
	return `hsl(${Math.floor(Math.random() * 360)}, 95%, 90%)`;
}
