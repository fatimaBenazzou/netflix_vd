/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BarChartI {
	data: BarDataI;
	SVGprops?: React.SVGProps<SVGSVGElement>;
	direction?: "horizontal" | "vertical";
}

const distance_between_bars = 2,
	distance_between_data = 10;

function drawHorizontal(data: BarDataI, ref: SVGSVGElement) {
	const [largestLabel, _largestNumberOfStacks, _maxNumber] = data.values.reduce(
		(acc, elm) => {
			return [
				Math.max(acc[0], elm.label?.length || 0),
				Math.max(acc[1], elm.values.length),
				Math.max(acc[2], ...elm.values.map((v) => v.value)),
			];
		},
		[0, 1, 1]
	);
	const stackedCount = data.stackedCount || _largestNumberOfStacks,
		barDelay = data.barDelay || 0.2,
		width = data.width || 220,
		scaleFactor = data.scaleFactor || (width - largestLabel * 12) / _maxNumber,
		BarCount = data.values.length * stackedCount,
		barHeight = data.barSize || (data.height ? (data.height - (BarCount + 1) * distance_between_data) / BarCount : 20),
		sizeOfGroup = stackedCount * barHeight + (stackedCount - 1) * distance_between_bars,
		height = data.values.length * sizeOfGroup + data.values.length * distance_between_data;
	const graph = d3
		.select(ref)
		// clear svg
		.attr("width", width)
		.attr("height", isNaN(height) ? 0 : height)
		.attr("viewbox", `0 0 ${width} ${height}`);
	graph.selectAll("*").remove();

	const bar = graph
		.selectAll("g")
		.data(data.values)
		.enter()
		.append("g")
		.style("transform", function (_, i) {
			return `translateX(${
				largestLabel + 1
			}ch) translateY(${i * barHeight * stackedCount + i * distance_between_data + distance_between_bars}px)`;
		});
	for (let i = 0; i < stackedCount; i++) {
		bar.append("rect")
			.attr("width", function (d) {
				return (d.values[i].value || 0) * scaleFactor;
			})
			.attr("y", i * barHeight + distance_between_bars * i)
			.attr("class", "horizontalBar")
			.style("--delay", (_, j) => `${j * barDelay}s`)
			// handle z index to show the smallest bar on top
			.attr("stroke", (d) => d.values[i].strokeColor || data.defaultStrokeColor || "none")
			.attr("height", barHeight - barHeight / 4)
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
				return (d.values[i].value || 0) * scaleFactor + 10;
			})
			.attr("class", "Bar-text")
			.style("--delay", (_, j) => `${i * 0.5 + j * barDelay + 1}s`)
			.attr("y", (i + 0.5) * barHeight + distance_between_bars * i)
			.attr("dy", ".35em")
			.attr("fill", (d) => d.labelColor || data.defaultLabelColor || "white")
			.text(function (d) {
				return `${data.prefix || ""}${d.values[i]?.value ? d.values[i].value : "0"}${data.suffix || ""}`;
			});
	}
	bar.append("text")
		.attr("x", 0)
		.attr("y", barHeight / 2)
		.attr("dy", ".35em")
		.attr("data", (d) => d.label || "")
		.attr("fill", (d) => d.labelColor || data.defaultLabelColor || "white")
		.style("transform", `translateX(-${largestLabel + 1}ch)`)
		.text(function (d) {
			return d.label || "";
		});
	if (data.legends) {
		const legend = graph
			.append("g")
			// position the legend to be at the bottom right
			.style(
				"transform",
				data.legendPosition
					? `translate(${data.legendPosition.x}px, ${data.legendPosition.y}px)`
					: `translate(calc(${width}px - ${Math.max(...data.legends.map((d) => d.label.length)) + 6}ch) , calc(${height}px - ${
							data.legends.length + 6
					  }ch))`
			)
			.attr("class", data.legendClassName || "")
			.selectAll("g")
			.data(data.legends || [])
			.join("g")
			.attr("transform", (_, i) => `translate(0, ${i * 20})`);

		legend
			.append("rect")
			.attr("width", 18)
			.attr("height", 18)
			.attr("fill", (d) => d.color || data.defaultBarColor || "white");

		legend
			.append("text")
			.attr("x", 24)
			.attr("y", 9)
			.attr("dy", "0.32em")
			.attr("fill", "white")
			.text((d) => d.label);
	}
}
function drawVertical(data: BarDataI, ref: SVGSVGElement) {
	const [largestLabel, _largestNumberOfStacks, _maxNumber] = data.values.reduce(
		(acc, elm) => {
			return [
				Math.max(acc[0], elm.label?.length || 0),
				Math.max(acc[1], elm.values.length),
				Math.max(acc[2], ...elm.values.map((v) => v.value)),
			];
		},
		[0, 1, 1]
	);
	const stackedCount = data.stackedCount || _largestNumberOfStacks,
		barDelay = data.barDelay || 0.2,
		height = data.height || 220,
		scaleFactor = data.scaleFactor || (height - largestLabel * 12) / _maxNumber,
		barWidth =
			data.barSize ||
			(data.width
				? ((data.width - (data.values.length + 1) * distance_between_data) / data.values.length -
						(stackedCount - 1) * distance_between_bars) /
				  stackedCount
				: 20),
		sizeOfGroup = stackedCount * barWidth + (stackedCount - 1) * distance_between_bars,
		width = data.values.length * sizeOfGroup + (data.values.length + 1) * distance_between_data;
	// width = data.values.length * (stackedCount * barWidth + (stackedCount - 1) * distance_between_bars) + data.values.length * distance_between_data
	//( width -  data.values.length * distance_between_data) / data.values.length = stackedCount * barWidth + (stackedCount - 1) * distance_between_bars
	// ( width -  data.values.length * distance_between_data) / data.values.length - (stackedCount - 1) * distance_between_bars = stackedCount * barWidth
	// (( width -  data.values.length * distance_between_data) / data.values.length - (stackedCount - 1) * distance_between_bars) / stackedCount = barWidth
	const graph = d3
		.select(ref)
		// clear svg
		.attr("width", isNaN(width) ? 0 : width)
		.attr("height", height)
		.attr("viewbox", `0 0 ${width} ${height}`);
	graph.selectAll("*").remove();

	const bar = graph
		.selectAll("g")
		.data(data.values)
		.enter()
		.append("g")
		.style("transform", function (_, i) {
			return `translateY(${largestLabel + 1}ch) translateX(${i * sizeOfGroup + i * distance_between_data}px)`;
		});
	for (let i = 0; i < stackedCount; i++) {
		bar.append("rect")
			.attr("height", function (d) {
				//console.log({ value: d.values[i]?.value, scaleFactor, height: (d.values[i]?.value || 0) * scaleFactor, _maxNumber });
				return (d.values[i]?.value || 0) * scaleFactor;
			})
			.attr("x", i * (barWidth + distance_between_bars))
			.attr("class", "VerticalBar")
			.style("--delay", (_, j) => `${j * barDelay}s`)
			// handle z index to show the smallest bar on top
			.attr("stroke", (d) => d.values[i].strokeColor || data.defaultStrokeColor || "none")
			.attr("width", barWidth)
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
			.attr("class", "Bar-text")
			.attr("dy", "-.1em")
			.style("--delay", (_, j) => `${i * 0.5 + j * barDelay + 1}s`)
			.attr("fill", (d) => d.labelColor || data.defaultLabelColor || "white")
			// rotate text
			.style("transform", function (d) {
				return `translate(${
					i * (barWidth + distance_between_bars)
				}px, ${(d.values[i].value || 0) * scaleFactor + 10}px) rotate(90deg)`;
			})
			.text(function (d) {
				return `${data.prefix || ""}${d.values[i]?.value ? d.values[i].value : "0"}${data.suffix || ""}`;
			});
	}
	bar.append("text")
		.attr("y", 0)
		.attr("x", barWidth / 2)
		.attr("dx", ".35em")
		.attr("data", (d) => d.label || "")
		.attr("fill", (d) => d.labelColor || data.defaultLabelColor || "white")
		.style("transform", `translateY(-${largestLabel + 1}ch) rotate(90deg)`)
		.text(function (d) {
			return d.label || "";
		});
	if (data.legends) {
		const legend = graph
			.append("g")
			// position the legend to be at the bottom right
			.style(
				"transform",
				data.legendPosition
					? `translate(${data.legendPosition.x}px, ${data.legendPosition.y}px) rotate(${data.legendRotation || 0}deg)`
					: `translate(calc(${height}px - ${data.legends.length + 6}ch), calc(${width}px - ${
							Math.max(...data.legends.map((d) => d.label.length)) + 6
					  }ch))`
			)
			.selectAll("g")
			.data(data.legends || [])
			.join("g")
			.attr("transform", (_, i) => `translate(0, ${i * 20})`);

		legend
			.append("rect")
			.attr("width", 18)
			.attr("height", 18)
			.attr("fill", (d) => d.color || data.defaultBarColor || "white");

		legend
			.append("text")
			.attr("y", 9)
			.attr("x", 24)
			.attr("dy", "0.32em")
			.attr("fill", "white")
			.text((d) => d.label);
	}
}
export default function BarChart({ data, SVGprops, direction = "horizontal" }: BarChartI) {
	const ref = useRef<SVGSVGElement>(null);
	useEffect(() => {
		if (!ref.current) return;
		if (direction === "horizontal") drawHorizontal(data, ref.current);
		else drawVertical(data, ref.current);
	}, [data, direction]);
	return <svg ref={ref} {...SVGprops} />;
}
