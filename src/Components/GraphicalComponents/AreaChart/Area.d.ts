declare type AreaData = {
	value: number;
	label?: string;
	data?: string;
	areaColor?: string;
	strokeColor?: string;
};

declare interface AreaValuesI {
	values: AreaData[];
	label?: string;
	labelColor?: string;
}
declare interface Legend {
	label: string;
	color?: string;
}
declare interface AreaDataI {
	values: AreaValuesI[];
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
	defaultAreaColor?: string;
	defaultLabelColor?: string;
	defaultStrokeColor?: string;
	width?: number;
	height?: number;
	scaleFactor?: number;
	areaSize?: number;
	areaDelay?: number;
}
