import useTooltip from "@/hooks/useTooltip";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export interface BoxAndWhiskersI {
	data: BoxAndWhiskersData;
	SVGprops?: React.SVGProps<SVGSVGElement>;
}
function draw(data: BoxAndWhiskersData, ref: SVGSVGElement, setTooltip: (tooltip: TooltipI) => void, hideTooltip: () => void) {
	const width = data.width || 600;
	const height = data.height || 100;
	const graph = d3
		.select(ref)
		// clear svg
		.attr("width", width)
		.attr("height", height)
		.attr("viewbox", `0 0 ${width} ${height}`);
	graph.selectAll("*").remove();
	const boxHeight = height / 4;
	const innerWidth = width - 20;
	const context = graph.append("g").attr("transform", `translate(10,${height / 2 - boxHeight / 2})`);
	// generate d3 x axis with values from data.range[0] to data.range[1] split into data.split parts
	const xScale = d3.scaleLinear().domain(data.range).range([0, innerWidth]);
	const xAxis = d3.axisBottom(xScale).ticks(data.split || 10);
	context.append("g").attr("transform", `translate(0,${boxHeight})`).call(xAxis);
	// if data is empty return
	const q1 = d3.quantile(data.data, 0.25);
	const median = d3.quantile(data.data, 0.5);
	const q3 = d3.quantile(data.data, 0.75);
	if (q1 === undefined || median === undefined || q3 === undefined) return;
	// calculate the quartiles

	const interQuantileRange = q3 - q1;
	const min = q1 - 1.5 * interQuantileRange;
	const max = q1 + 1.5 * interQuantileRange;

	// create an array with outliers
	const outliers = data.data.filter((x) => x < min || x > max);
	// create the new data set without the outliers
	const newData = data.data.filter((x) => x >= min && x <= max);
	const nMin = d3.min(newData);
	const nMax = d3.max(newData);
	if (nMin === undefined || nMax === undefined) return;

	// draw box
	context
		.append("rect")
		.attr("x", xScale(q1))
		.attr("y", -boxHeight)

		.attr("width", xScale(q3) - xScale(q1))
		.attr("height", boxHeight)
		.attr("fill", "red")
		.attr("stroke", "white")
		.attr("stroke-width", 3);

	// draw median
	context
		.append("line")
		.attr("x1", xScale(median))
		.attr("y1", -boxHeight)
		.attr("x2", xScale(median))
		.attr("y2", 0)
		.attr("stroke", "white")
		.attr("stroke-width", 3);
	// draw min and max
	context
		.append("line")
		.attr("x1", xScale(nMin))
		.attr("y1", -boxHeight + boxHeight / 4)
		.attr("x2", xScale(nMin))
		.attr("y2", -boxHeight / 4)
		.attr("stroke", "white")
		.attr("stroke-width", 3);
	context

		.append("line")
		.attr("x1", xScale(nMax))
		.attr("y1", -boxHeight + boxHeight / 4)
		.attr("x2", xScale(nMax))
		.attr("y2", -boxHeight / 4)
		.attr("stroke", "white")
		.attr("stroke-width", 3);
	// draw Whiskers
	context
		.append("line")
		.attr("x1", xScale(nMin))
		.attr("y1", -boxHeight / 2)
		.attr("x2", xScale(q1))
		.attr("y2", -boxHeight / 2)
		.attr("stroke", "white")
		.attr("stroke-width", 5);

	context
		.append("line")
		.attr("x1", xScale(nMax))
		.attr("y1", -boxHeight / 2)
		.attr("x2", xScale(q3))
		.attr("y2", -boxHeight / 2)
		.attr("stroke", "white")
		.attr("stroke-width", 5);

	// draw outliers as small red circles
	context
		.selectAll("circle")
		.data(outliers)
		.enter()
		.append("circle")
		.attr("cx", (d) => xScale(d))
		.attr("cy", -boxHeight / 2)
		.attr("r", 4)
		.attr("fill", "red")
		.attr("stroke", "white")
		.attr("stroke-width", 1)
		.on("mouseover", (e, d) => {
			setTooltip({
				position: {
					x: e.clientX,
					y: e.clientY,
				},
				html: `type: Outlier<br/>value: ${data.prefix || ""}${d}${data.suffix || ""}`,
				display: true,
			});
		})
		.on("mouseout", hideTooltip);
	// draw transparent box for tooltip
	context
		.append("rect")
		.attr("x", xScale(nMin))
		.attr("y", -boxHeight)
		.attr("width", xScale(nMax) - xScale(nMin))
		.attr("id", "tooltipBox")
		.attr("height", boxHeight)
		.attr("fill", "transparent")
		.on("mouseover", (e) => {
			setTooltip({
				position: {
					x: e.clientX,
					y: e.clientY,
				},
				html: `type: Interquartile range<br/> value: ${data.prefix || ""}${nMax - nMin}${data.suffix || ""}`,
				display: true,
			});
		})
		.on("mouseout", hideTooltip);
	context
		.append("rect")
		.attr("x", xScale(q1))
		.attr("y", -boxHeight)
		.attr("width", xScale(q3) - xScale(q1))
		.attr("id", "tooltipBox")
		.attr("height", boxHeight)
		.attr("fill", "transparent")
		.on("mouseover", (e) => {
			setTooltip({
				position: {
					x: e.clientX,
					y: e.clientY,
				},
				html: `type: Interquartile range<br/> value: ${data.prefix || ""}${q3 - q1}${data.suffix || ""}`,
				display: true,
			});
		})
		.on("mouseout", hideTooltip);
	context
		.selectAll("toto")
		.data([
			{
				type: "Q1",
				value: q1,
			},
			{
				type: "Median",
				value: median,
			},
			{
				type: "Q3",
				value: q3,
			},
		])
		.enter()
		.append("rect")
		.attr("x", (d) => xScale(d.value) - 5)
		.attr("y", -boxHeight)
		.attr("z", 10)
		.attr("width", 10)
		.attr("height", boxHeight)
		.attr("fill", "transparent")
		.on("mouseover", (e, d) => {
			setTooltip({
				position: {
					x: e.clientX,
					y: e.clientY,
				},
				html: `type: ${d.type}<br/>
            value: ${data.prefix || ""}${d.value}${data.suffix || ""}`,
				display: true,
			});
		})
		.on("mouseout", hideTooltip);
	// draw rect for line tooltip
	context
		.append("rect")
		.attr("x", xScale(nMin) - 5)
		.attr("y", -boxHeight)
		.attr("width", 10)
		.attr("height", boxHeight)
		.attr("fill", "transparent")
		.on("mouseover", (e) => {
			setTooltip({
				position: {
					x: e.clientX,
					y: e.clientY,
				},
				html: `type: Min<br/>
        value: ${data.prefix || ""}${nMin}${data.suffix || ""}`,
				display: true,
			});
		})
		.on("mouseout", hideTooltip);
	// draw rect for line tooltip
	context
		.append("rect")
		.attr("x", xScale(nMax) - 5)
		.attr("y", -boxHeight)
		.attr("width", 10)
		.attr("height", boxHeight)
		.attr("fill", "transparent")
		.on("mouseover", (e) => {
			setTooltip({
				position: {
					x: e.clientX,
					y: e.clientY,
				},
				html: `type: Max<br/>
        value: ${data.prefix || ""}${nMax}${data.suffix || ""}`,
				display: true,
			});
		})
		.on("mouseout", hideTooltip);
}
export default function BoxAndWhiskers({ data, SVGprops }: BoxAndWhiskersI) {
	const ref = useRef<SVGSVGElement>(null);
	const { hideTooltip, setTooltip } = useTooltip();
	useEffect(() => {
		if (!ref.current) return;
		draw(data, ref.current, setTooltip, hideTooltip);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	return <svg ref={ref} {...SVGprops} />;
}
