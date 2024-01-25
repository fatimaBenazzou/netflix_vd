declare interface PieChartData {
	value: number;
	scale?: number;
	label: string;
	pieColor?: string;
	strokeColor?: string;
	labelColor?: string;
	dx?: number;
	dy?: number;
}

declare interface PieDataI {
	values: PieChartData[];
	suffix?: string;
	prefix?: string;
	defaultPieColor?: string;
	defaultLabelColor?: string;
	defaultStrokeColor?: string;
	size?: number;
}
