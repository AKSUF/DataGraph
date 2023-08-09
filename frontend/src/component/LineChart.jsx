import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { getAlldata } from '../service/datafetch';

const LineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getAlldata();
        setData(responseData);

        if (responseData && responseData.length > 0) {
          // Create a line chart with the data.
          const svg = d3.select(svgRef.current);
          const margin = { top: 50, right: 50, bottom: 100, left: 100 };
          const width = 1400 - margin.left - margin.right;
          const height = 900 - margin.top - margin.bottom;

          // Parse date and sort data by date
          const parseDate = d3.timeParse('%Y');
          responseData.sort((a, b) => parseDate(a.end_year) - parseDate(b.end_year));

          // Define x and y scales
          const xScale = d3.scaleTime().domain(d3.extent(responseData, d => parseDate(d.end_year))).range([0, width]);
          const yScale = d3.scaleLinear().domain([0, d3.max(responseData, d => d.intensity)]).range([height, 0]);

          // Define the line function
          const line = d3.line()
            .x(d => xScale(parseDate(d.end_year)))
            .y(d => yScale(d.intensity))
            .curve(d3.curveMonotoneX);

          // Draw the line
          svg.append("path")
            .datum(responseData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

          // Add x-axis
          svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

          // Add y-axis
          svg.append("g")
            .call(d3.axisLeft(yScale));

          // Add text labels for intensity values
          svg.selectAll(".label")
            .data(responseData)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", d => xScale(parseDate(d.end_year)))
            .attr("y", d => yScale(d.intensity) - 10) // Position the label above the line
            .attr("text-anchor", "middle")
            .text(d => d.intensity);
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="line-chart">
      <svg ref={svgRef} width="1400" height="900">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default LineChart;
