import throttle from "@/functions/throttle";
import { useEffect, useState } from "react";
import DragHandler from "@/functions/DragHandler";

export function useScrollSteps(dragHandler: DragHandler, startStep = 1, { minSteps = 1, maxSteps = 2 }) {
	const [currentStep, setCurrentStep] = useState(startStep);
	function OnScroll(direction: number) {
		if (direction < 0) setCurrentStep((step) => (step <= minSteps ? step : step - 1));
		else setCurrentStep((step) => (step >= maxSteps ? step : step + 1));
	}
	function OnKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowUp") setCurrentStep((step) => (step === 1 ? step : step - 1));
		else if (e.key === "ArrowDown") setCurrentStep((step) => (step === maxSteps ? step : step + 1));
	}
	useEffect(() => {
		const handleScroll = throttle(OnScroll, 600); // 300ms throttle time
		const OnTouchEnd = dragHandler.DragHandler(OnScroll);

		window.addEventListener("wheel", handleScroll);
		window.addEventListener("touchstart", dragHandler.OnTouchStart);
		window.addEventListener("touchend", OnTouchEnd);
		// on arrow key down or up, we can navigate between steps
		window.addEventListener("keydown", OnKeyDown);

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("touchstart", dragHandler.OnTouchStart);
			window.removeEventListener("touchend", OnTouchEnd);
			window.removeEventListener("keydown", OnKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (currentStep < minSteps) setCurrentStep(minSteps);
		else if (currentStep > maxSteps) setCurrentStep(maxSteps);
	}, [currentStep, maxSteps, minSteps]);
	return { currentStep, setCurrentStep } as const;
}
