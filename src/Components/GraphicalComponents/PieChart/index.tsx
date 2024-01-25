import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export interface PieChartI {
	data: PieDataI;
	SVGprops?: React.SVGProps<SVGSVGElement>;
}

// function that generate hex gradient array from array of colors
/* function generateHexGradientArrayFromColors(colors: string[], steps: number) {
	const gradientArray: string[] = [];
	const stepsArray = [];
	for (let i = 0; i < steps; i++) {
		stepsArray.push(i);
	}
	const stepsRatio = 1 / (steps - 1);
	stepsArray.forEach((step) => {
		const gradientStep = d3.interpolateRgb(...(colors as [string, string]))(step * stepsRatio);
		gradientArray.push(gradientStep);
	});
	return gradientArray;
} */
function draw(data: PieDataI, ref: SVGSVGElement | null) {
	if (!ref) return;
	//const total = data.values.reduce((acc, elm) => acc + elm.value, 0);
	const width = data.size || 220,
		height = width,
		outerRadius = Math.min(width, height) / 2;
	const graph = d3
		.select(ref)
		// clear svg
		.attr("width", width + 50)
		.attr("height", height + 70)
		.attr("viewbox", `0 0 ${width + 50} ${height + 70}`);
	graph.selectAll("*").remove();
	// Create new svg
	const svg = graph.append("g").attr("transform", `translate(${(width + 50) / 2}, ${height / 2 + 50})`);

	const colorScale = d3.scaleOrdinal(["#221f1f", "#E50914", "#0e9342"]).domain(data.values.map((d) => d.label));

	const arcGenerator = d3.arc<d3.PieArcDatum<PieChartData>>().innerRadius(0).outerRadius(outerRadius);
	/* const arcGeneratorBig = d3
		.arc<d3.PieArcDatum<PieChartData>>()
		.innerRadius(0)
		.outerRadius((d) => (d.data.scale || 1) * outerRadius + 5); */

	const pieGenerator = d3
		.pie<PieChartData>()
		.padAngle(0)
		.value((d) => d.value);

	const arc = svg.selectAll().data(pieGenerator(data.values)).enter();

	// Add transition to the pie generation
	arc.append("path")
		.attr("d", arcGenerator)
		.style("fill", (d) => d.data.pieColor || colorScale(d.data.label))
		.style("stroke", (d) => d.data.strokeColor || data.defaultStrokeColor || "none")
		.style("stroke-width", 1)
		.style("transform", (d) => `scale(${d.data.scale || 1})`)
		// scale on mouse over
		.on("mouseover", function () {
			d3.select<SVGPathElement, d3.PieArcDatum<PieChartData>>(this)
				.transition()
				.duration(200)
				// scale up
				.style("transform", (d) => `scale(${Math.max(d.data.scale || 1, 1.1)})`)
				.style("stroke", (d) => d.data.strokeColor || data.defaultStrokeColor || "white")
				.style("stroke-width", 2)
				.attr("d", arcGenerator);
		})
		// scale back on mouse out
		.on("mouseout", function () {
			d3.select<SVGPathElement, d3.PieArcDatum<PieChartData>>(this)
				.transition()
				.duration(200)
				.attr("d", arcGenerator)
				.style("stroke", (d) => d.data.strokeColor || data.defaultStrokeColor || "none")
				.style("stroke-width", 1)
				.style("transform", (d) => `scale(${d.data.scale || 1})`);
		})
		.transition() // Add transition
		.duration(2000) // Set the duration of the transition in milliseconds
		.attrTween("d", (d) => {
			const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
			return function (t) {
				return arcGenerator(interpolate(t)) as string;
			};
		});

	// Add legend at the top right
	const legend = graph
		.append("g")
		.selectAll("g")
		.data(data.values)
		.join("g")
		.attr("transform", (_, i) => `translate(0, ${i * 20})`);

	legend
		.append("rect")
		.attr("width", 18)
		.attr("height", 18)
		.attr("fill", (d) => d.pieColor || colorScale(d.label));

	legend
		.append("text")
		.attr("x", 24)
		.attr("y", 9)
		.attr("dy", "0.32em")
		.attr("fill", "white")
		.text((d) => d.label);
}
export default function PieChart({ data, SVGprops }: PieChartI) {
	const ref = useRef<SVGSVGElement>(null);
	useEffect(() => {
		draw(data, ref.current);
	}, [data]);
	return <svg ref={ref} {...SVGprops} />;
}
