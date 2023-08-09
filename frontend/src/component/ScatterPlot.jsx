import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { getAlldata } from '../service/datafetch';

const ScatterPlot = () => {
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
          // Create a scatter plot with the data.
          const svg = d3.select(svgRef.current);
          const margin = { top: 20, right: 20, bottom: 50, left: 50 };
          const width = 400 - margin.left - margin.right;
          const height = 200 - margin.top - margin.bottom;

          // Define x and y scales
          const xScale = d3.scaleLinear().domain([0, d3.max(responseData, d => d.intensity)]).range([0, width]);
          const yScale = d3.scaleLinear().domain([0, d3.max(responseData, d => d.likelihood)]).range([height, 0]);

          // Draw the data points
          svg.selectAll("circle")
            .data(responseData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.intensity))
            .attr("cy", d => yScale(d.likelihood))
            .attr("r", 5) // Adjust the size of the dots here
            .attr("fill", "steelblue");

          // Add x-axis
          svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

          // Add y-axis
          svg.append("g")
            .call(d3.axisLeft(yScale));
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
    <div id="scatter-plot">
      <svg ref={svgRef} width="400" height="200">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default ScatterPlot;
