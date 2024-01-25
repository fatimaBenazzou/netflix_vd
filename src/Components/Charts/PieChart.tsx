import { useEffect } from "react";
import * as d3 from "d3";

interface PieChartProps {
	data: NetflixData[];
	outerRadius: number;
}

function PieChart(props: PieChartProps) {
	const { data, outerRadius } = props;

	const margin = {
		top: 50,
		right: 100,
		bottom: 50,
		left: 50,
	};

	const width = 3 * outerRadius + margin.left + margin.right;
	const height = 3 * outerRadius + margin.top + margin.bottom;

	useEffect(() => {
		drawChart();
	}, [data]);

	function drawChart() {
		// Remove the old svg
		d3.select("#pie-container").select("svg").remove();

		// Create new svg
		const svg = d3
			.select("#pie-container")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${width / 2}, ${height / 2})`);

		// Group data by type (Movie or TV Show)
		const groupedData = d3.group(data, (d) => d.type);

		// Create a list with the count of elements for each type
		const counts = Array.from(groupedData, ([type, items]) => ({
			type,
			count: items.length,
		}));

		const colorScale = d3.scaleOrdinal<string, string>(["#221f1f", "#E50914"]).domain(counts.map((d) => d.type));

		const arcGenerator = d3.arc<d3.PieArcDatum<{ type: string; count: number }>>().innerRadius(0).outerRadius(outerRadius);

		const pieGenerator = d3
			.pie<{ type: string; count: number }>()
			.padAngle(0)
			.value((d) => d.count);

		const arc = svg.selectAll().data(pieGenerator(counts)).enter();

		// Append arcs
		arc.append("path")
			.attr("d", arcGenerator)
			.style("fill", (d) => colorScale(d.data.type))
			.style("stroke", "#ffffff")
			.style("stroke-width", 0);

		// Add legend at the top right
		const legend = svg
			.append("g")
			.attr("transform", `translate(${width - 400}, -200)`)
			.selectAll("g")
			.data(counts)
			.join("g")
			.attr("transform", (_, i) => `translate(0, ${i * 20})`);

		legend
			.append("rect")
			.attr("width", 18)
			.attr("height", 18)
			.attr("fill", (d) => colorScale(d.type));

		legend
			.append("text")
			.attr("x", 24)
			.attr("y", 9)
			.attr("dy", "0.32em")
			.attr("fill", "white")
			.text((d) => d.type);
	}

	return <div id="pie-container" />;
}

export default PieChart;
