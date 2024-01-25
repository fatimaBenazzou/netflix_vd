import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export interface StackedChartI {
	data: BarDataI;
	SVGprops?: React.SVGProps<SVGSVGElement>;
}
function draw(data: BarDataI, ref: SVGSVGElement | null) {
	if (!ref) return;
	const [largestLabel, _largestNumberOfStacks, _maxSum] = data.values.reduce(
		(acc, elm) => {
			return [
				Math.max(acc[0], elm.label?.length || 0),
				Math.max(acc[1], elm.values.length),
				Math.max(
					acc[2],
					elm.values.reduce((acc, elm) => acc + elm.value, 0)
				),
			];
		},
		[0, 1, -Infinity]
	);
	const barDelay = data.barDelay || 0.2;
	const stackedCount = data.stackedCount || _largestNumberOfStacks,
		width = data.width || 220,
		scaleFactor = data.scaleFactor || (width - largestLabel * 10) / _maxSum,
		barHeight = data.barSize || (data.height ? data.height / data.values.length : 20),
		height = barHeight * data.values.length + 10 * data.values.length + 10;
	const graph = d3
		.select(ref)
		// clear svg
		.attr("width", width)
		.attr("height", height)
		.attr("viewbox", `0 0 ${width} ${height}`);
	graph.selectAll("*").remove();
	const bar = graph
		.selectAll("g")
		.data(data.values)
		.enter()
		.append("g")
		.style("transform", function (_, i) {
			return `translateX(${largestLabel + 1}ch) translateY(${i * barHeight + i * 10 + 10}px)`;
		});
	for (let i = 0; i < stackedCount; i++) {
		bar.append("rect")
			.attr("width", function (d) {
				return (d.values[i].value || 0) * scaleFactor;
			})
			.attr("class", "horizontalBar")
			// handle z index to show the smallest bar on top
			.attr("stroke", (d) => d.values[i].strokeColor || data.defaultStrokeColor || "none")
			.attr("x", function (d) {
				return d.values.slice(0, i).reduce((acc, elm) => acc + elm.value, 0) * scaleFactor;
			})
			.style("--delay", (_, j) => `${j * barDelay}s`)
			.attr("height", barHeight - 1)
			.attr("fill", (d) => d.values[i].barColor || data.defaultBarColor || "white")
			// on mouse over add stroke width
			.on("mouseover", function () {
				d3.select<SVGRectElement, BarValuesI>(this)
					.attr("stroke-width", 2)
					.attr("stroke", (d) => {
						return d.values[i].strokeColor || data.defaultStrokeColor || "white";
					});
			})
			// on mouse out remove stroke width
			.on("mouseout", function () {
				d3.select<SVGRectElement, BarValuesI>(this)
					.attr("stroke-width", 0)
					.attr("stroke", (d) => {
						return d.values[i].strokeColor || data.defaultStrokeColor || "none";
					});
			});
		bar.append("text")
			.attr("x", function (d) {
				return d.values.slice(0, i).reduce((acc, elm) => acc + elm.value, 0) * scaleFactor + 10;
			})
			.attr("y", barHeight / 2)
			.attr("dy", ".35em")
			.attr("class", "Bar-text")
			.style("--delay", (_, j) => `${i * 0.5 + j * barDelay + 1}s`)
			.attr("fill", (d) => d.labelColor || data.defaultLabelColor || "white")
			.text(function (d) {
				return `${data.prefix || ""}${d.values[i].value ? d.values[i].value : ""}${data.suffix || ""}`;
			});
	}
	bar.append("text")
		.attr("x", 0)
		.attr("y", barHeight / 2)
		.attr("dy", ".35em")
		.attr("data", (d) => d.label || "")
		.attr("fill", (d) => d.labelColor || data.defaultLabelColor || "white")
		.style("transform", (d) => (d.label ? `translateX(-${d.label.length + 1}ch)` : ""))
		.text(function (d) {
			return d.label || "";
		});
}
export default function StackedChart({ data, SVGprops }: StackedChartI) {
	const ref = useRef<SVGSVGElement>(null);
	useEffect(() => {
		draw(data, ref.current);
	}, [data]);
	return <svg ref={ref} {...SVGprops} />;
}
