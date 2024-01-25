declare type BarData = {
	value: number;
	label?: string;
	barColor?: string;
	strokeColor?: string;
};

declare interface BarValuesI {
	values: BarData[];
	label?: string;
	labelColor?: string;
}
declare interface Legend {
	label: string;
	color?: string;
}
declare interface BarDataI {
	values: BarValuesI[];
	legends?: Legend[];
	legendClassName?: string;
	legendRotation?: number;
	legendPosition?: {
		x: number;
		y: number;
	};
	suffix?: string;
	prefix?: string;
	stackedCount?: number;
	defaultBarColor?: string;
	defaultLabelColor?: string;
	defaultStrokeColor?: string;
	width?: number;
	height?: number;
	scaleFactor?: number;
	barSize?: number;
	barDelay?: number;
}
