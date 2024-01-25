import React from "react";
import * as d3 from "d3";
interface LineValuesI<T = number> {
	value: T;
	label: string;
	lineColor?: string;
	textColor?: string;
}
interface LineDataI {
	values: (LineValuesI | number)[];
	defaultLineColor?: string;
	defaultTextColor?: string;
	width?: number;
	height?: number;
	scaleFactor?: number;
	lineHeight?: number;
}
interface LineChartI {
	data: LineDataI;
	SVGprops?: React.ClassAttributes<SVGSVGElement>;
}
export default class LineChart extends React.Component<LineChartI> {
	ref!: SVGSVGElement;
	componentDidMount() {
		this.draw(this.props.data);
	}
	draw(data: LineDataI) {
		const width = data.width || 200,
			scaleFactor = data.scaleFactor || 10,
			lineHeight = data.lineHeight || (data.height ? data.height / data.values.length : 20);

		const graph = d3
			.select(this.ref)
			.attr("width", width)
			.attr("height", lineHeight * data.values.length);

		const line = graph
			.selectAll("g")
			.data(data.values)
			.enter()
			.append("g")
			.attr("transform", function (_, i) {
				return "translate(0," + i * lineHeight + ")";
			});

		line.append("rect")
			.attr("width", function (d) {
				return (typeof d === "number" ? d : d.value) * scaleFactor;
			})
			.attr("height", lineHeight - 1)
			.attr("fill", function (d) {
				return (typeof d === "number" ? false : d.lineColor) || data.defaultLineColor || "white";
			});

		line.append("text")
			.attr("x", function (d) {
				return (typeof d === "number" ? d : d.value) * scaleFactor + 10;
			})
			.attr("y", lineHeight / 2)
			.attr("dy", ".35em")
			.style("fill", function (d) {
				return (typeof d === "number" ? false : d.textColor) || data.defaultTextColor || "white";
			})
			.text(function (d) {
				return typeof d === "number" ? d : d.value;
			});
	}
	render() {
		return (
			<div className="text-white">
				<h1>Hii</h1>
				<svg ref={(ref: SVGSVGElement) => (this.ref = ref)} {...this.props.SVGprops} />
			</div>
		);
	}
}
