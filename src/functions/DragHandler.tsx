export default class DragHandler {
	touchStartY: number;
	constructor() {
		this.touchStartY = 0;
	}
	OnTouchStart(e: TouchEvent) {
		this.touchStartY = e.touches[0].clientY;
	}
	DragHandler(func: (direction: number) => void) {
		return (e: TouchEvent) => {
			const touchEndY = e.changedTouches[0].clientY;
			const touchDistance = touchEndY - this.touchStartY;
			if (touchDistance > 0) func(-1);
			else func(1);
		};
	}
}
