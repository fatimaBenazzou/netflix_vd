declare interface CorrelationDataI {
	value: number;
	right: string;
	bottom: string;
}
declare interface CorrelationHeatMapData {
	values: (CorrelationDataI | null)[][];
	labels: string[];
	size?: number;
	scaleFactor?: number;
	rectSize?: number;
	margin?: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	barDelay?: number;
	gap?: number;
	colorVariants?: number;
	colorRange?: string[];
}
