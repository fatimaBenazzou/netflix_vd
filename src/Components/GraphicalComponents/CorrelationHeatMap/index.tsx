import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useTooltip from "@/hooks/useTooltip";

export interface CorrelationHeatMapI {
	data: CorrelationHeatMapData;
	SVGprops?: React.SVGProps<SVGSVGElement>;
}
function generateColorScale(colors: string[], range: [number, number], steps = 2) {
	const valuesPerStep = Math.abs(range[1] - range[0]) / (steps - 1);
	return d3
		.scaleLinear<string>()
		.domain(Array.from({ length: steps }, (_, i) => i * valuesPerStep + Math.min(...range)))
		.range(colors.map((color) => (d3.color(color) as d3.RGBColor).toString()))
		.interpolate(d3.interpolateRgb);
}

const verticalDelay = 0.2,
	horizontalDelay = 0.3;
function draw(data: CorrelationHeatMapData, ref: SVGSVGElement, setTooltip: (tooltip: TooltipI) => void, hideTooltip: () => void) {
	const size = data.size || 600,
		gap = data.gap || 5;
	const graph = d3
		.select(ref)
		// clear svg
		.attr("width", size)
		.attr("height", size)
		.attr("viewbox", `0 0 ${size} ${size}`);
	graph.selectAll("*").remove();

	const Values = data.values
		.map((d, y) => d.map((v, x) => ({ x, y, data: v })))
		.flat()
		.filter((d) => d.data !== null) as { x: number; y: number; data: CorrelationDataI }[];

	const maxValue = Math.max(...Values.map((elm) => (elm.data ? elm.data.value : 0)));
	const minValue = Math.min(...Values.map((elm) => (elm.data ? elm.data.value : maxValue)));
	const color = generateColorScale(
		data.colorRange || ["#221f1f", "#E50914"],
		[minValue, maxValue],
		data.colorRange?.length || data.colorVariants || 10
	);
	const largestLabel = Math.max(...data.labels.map((elm) => elm.length));

	const scale = (size - largestLabel * 10) / data.labels.length - gap;
	const zoneSize = scale + gap;
	if (scale === Infinity) return;
	const index = data.labels.length - 1;
	graph
		.append("g")
		.selectAll("rect")
		.data(Values)
		.join("rect")
		// rounded border
		.attr("rx", 10)
		.attr("ry", 10)
		// add tooltip on mouseenter
		.on("mouseenter", (e, d) => {
			setTooltip({
				display: true,
				position: {
					x: e.clientX,
					y: e.clientY,
				},
				html: `${d.data.right} / ${d.data.bottom} : ${d.data.value}`,
			});
		})
		.on("mouseleave", hideTooltip)
		.attr("class", "heat-rect")
		.style("--delay", (d) => `${(index - d.x) * verticalDelay + (index - d.y) * horizontalDelay}s`)
		.attr("x", (d) => d.x * zoneSize)
		.attr("y", (d) => d.y * zoneSize)
		.attr("width", scale)
		.attr("height", scale)
		.attr("fill", (d) => color(d.data.value));

	// add labels
	graph
		.append("g")
		.attr("transform", `translate(${size - largestLabel * 10},0)`)
		.selectAll("text")
		.data(
			// reverse labels
			data.labels
		)
		.join("text")
		.attr("x", 0)
		.attr("y", (_, i) => i * zoneSize + (scale * 2) / 3)

		.attr("fill", "white")
		.text((d) => d);

	graph
		.append("g")
		.attr("transform", `translate(0,${size - largestLabel * 10})`)
		.selectAll("text")
		.data(data.labels.slice().reverse())
		.join("text")
		.attr("x", (_, i) => i * zoneSize + (scale * 2) / 3)
		.attr("y", 0)
		// rotate text
		.attr("transform", (_, i) => `rotate(90, ${i * zoneSize + scale / 3}, 0)`)

		.attr("fill", "white")
		.text((d) => d);
}
export default function CorrelationHeatMap({ data, SVGprops }: CorrelationHeatMapI) {
	const ref = useRef<SVGSVGElement>(null);
	const { hideTooltip, setTooltip } = useTooltip();
	useEffect(() => {
		if (!ref.current) return;
		draw(data, ref.current, setTooltip, hideTooltip);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	return <svg ref={ref} {...SVGprops} />;
}
