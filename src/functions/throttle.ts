export default function throttle(func: (direction: number) => void, delay: number) {
	let lastCall: number = 0;

	return function executedFunction(e: WheelEvent) {
		const now = Date.now();
		if (now - lastCall >= delay) {
			lastCall = now;
			func(e.deltaY > 0 ? 1 : -1);
		}
		//e.preventDefault();
		return false;
	};
}
