declare interface BoxAndWhiskersData {
	range: [number, number];
	data: number[];
	split?: number;
	label: string;
	width?: number;
	height?: number;
	prefix?: string;
	suffix?: string;
}
