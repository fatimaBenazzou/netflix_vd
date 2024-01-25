import React, { useEffect } from "react";
import * as d3 from "d3";

interface DirectorsScatterPlotProps {
	data: NetflixData[];
}

const DirectorsScatterPlot: React.FC<DirectorsScatterPlotProps> = ({ data }) => {
	useEffect(() => {
		if (!data || data.length === 0) return;

		const margin = { top: 20, right: 20, bottom: 50, left: 50 };
		const width = 600 - margin.left - margin.right;
		const height = 400 - margin.top - margin.bottom;

		const svg = d3
			.select("#directors-scatter-plot")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const getFrequentDirectors = (topCount: number) => {
			const directorsMap = new Map<string, { count: number; years: string[] }>();

			/*  data.forEach((d) => {
        const directors = d.director.split(",").map((director) => director.trim());
        directors.forEach((director) => {
          const count = directorsMap.get(director)?.count || 0;
          const years = directorsMap.get(director)?.years || [];
          directorsMap.set(director, { count: count + 1, years: [...years, d.release_year] });
        });
      }); */

			const sortedDirectors = Array.from(directorsMap.entries()).sort((a, b) => b[1].count - a[1].count);
			return sortedDirectors.slice(0, topCount);
		};

		const topDirectors = getFrequentDirectors(10);

		const xScale = d3
			.scaleLinear()
			.domain([0, d3.max(topDirectors, (d) => d[1].count) || 0])
			.range([0, width]);

		const yScale = d3
			.scaleBand()
			.domain(topDirectors.map((director) => director[0]))
			.range([height, 0])
			.padding(0.1);

		// Définir une échelle de couleurs
		const colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, d3.max(topDirectors, (d) => d[1].count) || 1]);

		// Tooltip
		const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
		// set the tooltip's text
		tooltip.text("tooltip");

		const showTooltip = (event: MouseEvent, director: [string, { count: number; years: string[] }]) => {
			const firstYear = Math.min(...director[1].years.map((year) => parseInt(year, 10)));
			const lastYear = Math.max(...director[1].years.map((year) => parseInt(year, 10)));

			tooltip.transition().duration(200).style("opacity", 0.9);
			tooltip
				.html(
					`<strong>${director[0]}</strong><br/>Nombre de films : ${director[1].count}<br/>
               Première année : ${firstYear}<br/>
               Dernière année : ${lastYear}`
				)
				.style("left", event.pageX + "px")
				.style("top", event.pageY - 28 + "px");
		};

		const hideTooltip = () => {
			tooltip.transition().duration(500).style("opacity", 0);
		};

		// Ajouter x-axis
		svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale));

		// Ajouter y-axis
		svg.append("g").call(d3.axisLeft(yScale));

		// Ajouter des cercles pour les réalisateurs
		svg.selectAll("circle.director")
			.data(topDirectors)
			.enter()
			.append("circle")
			.attr("class", "director")
			.attr("cx", (d) => xScale(d[1].count))
			.attr("cy", (d) => yScale(d[0]) || 0)
			.attr("r", 6)
			.style("fill", (d) => colorScale(d[1].count))
			.on("mouseover", (event, d) => showTooltip(event, d))
			.on("mouseout", () => hideTooltip());
	}, [data]);

	return <div id="directors-scatter-plot" />;
};

export default DirectorsScatterPlot;
