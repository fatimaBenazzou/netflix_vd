import { useEffect, useState } from "react";

export default function useSelectedVariant(currentStep: number) {
	const [selectedVariant, setSelectedVariant] = useState<null | string>(null);
	const [selectedHistory, setSelectedHistory] = useState<string[]>([]);
	useEffect(() => {
		setSelectedVariant(selectedHistory.length > 0 ? selectedHistory[selectedHistory.length - 1] : null);
	}, [selectedHistory]);
	return {
		currentVariant: selectedVariant ? selectedVariant : `step${currentStep}`,
		pushHistory: (variantName: string) => {
			setSelectedHistory((history) => [...history, variantName]);
		},
		popHistory: () => {
			setSelectedHistory((history) => history.slice(0, history.length - 1));
		},
		hasSelectedHistory: selectedHistory.length > 0,
	};
}
