/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface AreaChartI {
	data: AreaDataI;
	SVGprops?: React.SVGProps<SVGSVGElement>;
}

const distance_between_areas = 2,
	distance_between_data = 10;

function drawArea(data: AreaDataI, ref: SVGSVGElement) {
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
		areaDelay = data.areaDelay || 0.2,
		width = data.width || 220,
		scaleFactor = data.scaleFactor || (width - largestLabel * 12) / _maxNumber,
		AreaCount = data.values.length * stackedCount,
		areaHeight = data.areaSize || (data.height ? (data.height - (AreaCount + 1) * distance_between_data) / AreaCount : 20),
		sizeOfGroup = stackedCount * areaHeight + (stackedCount - 1) * distance_between_areas,
		height = data.values.length * sizeOfGroup + data.values.length * distance_between_data;
	const graph = d3
		.select(ref)
		// clear svg
		.attr("width", width)
		.attr("height", isNaN(height) ? 0 : height)
		.attr("viewbox", `0 0 ${width} ${height}`);
	graph.selectAll("*").remove();

	const area = graph
		.selectAll("g")
		.data(data.values)
		.enter()
		.append("g")
		.style("transform", function (_, i) {
			return `translateX(${
				largestLabel + 1
			}ch) translateY(${i * areaHeight * stackedCount + i * distance_between_data + distance_between_areas}px)`;
		});
	for (let i = 0; i < stackedCount; i++) {
		area.append("rect")
			.attr("width", function (d) {
				return (d.values[i].value || 0) * scaleFactor;
			})
			.attr("y", i * areaHeight + distance_between_areas * i)
			.attr("class", "horizontalArea")
			.style("--delay", (_, j) => `${j * areaDelay}s`)
			// handle z index to show the smallest area on top
			.attr("stroke", (d) => d.values[i].strokeColor || data.defaultStrokeColor || "none")
			.attr("height", areaHeight - areaHeight / 4)
			.attr("fill", (d) => d.values[i].areaColor || data.defaultAreaColor || "white")
			// on mouse over add stroke width
			.on("mouseover", function () {
				d3.select<SVGRectElement, AreaValuesI>(this)
					.attr("stroke-width", 2)
					.attr("stroke", (d) => {
						return d.values[i].strokeColor || data.defaultStrokeColor || "white";
					});
			})
			// on mouse out remove stroke width
			.on("mouseout", function () {
				d3.select<SVGRectElement, AreaValuesI>(this)
					.attr("stroke-width", 0)
					.attr("stroke", (d) => {
						return d.values[i].strokeColor || data.defaultStrokeColor || "none";
					});
			});

		area.append("text")
			.attr("x", function (d) {
				return (d.values[i].value || 0) * scaleFactor + 10;
			})
			.attr("class", "Area-text")
			.style("--delay", (_, j) => `${i * 0.5 + j * areaDelay + 1}s`)
			.attr("y", (i + 0.5) * areaHeight + distance_between_areas * i)
			.attr("dy", ".35em")
			.attr("fill", (d) => d.labelColor || data.defaultLabelColor || "white")
			.text(function (d) {
				return `${data.prefix || ""}${d.values[i]?.value ? d.values[i].value : "0"}${data.suffix || ""}`;
			});
	}
	area.append("text")
		.attr("x", 0)
		.attr("y", areaHeight / 2)
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
			.attr("fill", (d) => d.color || data.defaultAreaColor || "white");

		legend
			.append("text")
			.attr("x", 24)
			.attr("y", 9)
			.attr("dy", "0.32em")
			.attr("fill", "white")
			.text((d) => d.label);
	}
}

export default function AreaChart({ data, SVGprops }: AreaChartI) {
	const ref = useRef<SVGSVGElement>(null);
	useEffect(() => {
		if (!ref.current) return;
		drawArea(data, ref.current);
	}, [data]);
	return <svg ref={ref} {...SVGprops} />;
}
