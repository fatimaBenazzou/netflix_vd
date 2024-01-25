import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface MovieRatingBarChartProps {
  data: NetflixData[];
}

const MovieRatingBarChart: React.FC<MovieRatingBarChartProps> = ({ data }) => {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 20, left: 120 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select('#chart-container') // Utilisez une ID ou une classe pour sélectionner votre conteneur
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Extract unique ratings
    const ratings = [...new Set(data.map((d) => d.rating))];

    const maxCount = d3.max(data, (d) => data.filter((item) => item.rating === d.rating).length) || 0;

    const xScale = d3.scaleLinear().domain([0, maxCount]).range([0, width]);

    const yScale = d3.scaleBand().domain(ratings).range([0, height]).padding(0.1);

    svg
      .selectAll('rect')
      .data(ratings)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (rating) => yScale(rating) || 0)
      .attr('width', (rating) => xScale(data.filter((item) => item.rating === rating).length))
      .attr('height', yScale.bandwidth())
      .attr('fill', '#E50914');

    // Add x-axis
    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g').call(d3.axisLeft(yScale));
  });

  return <div id="chart-container" />;
};

export default MovieRatingBarChart;
