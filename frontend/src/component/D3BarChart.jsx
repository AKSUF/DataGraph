import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { getAlldata } from '../service/datafetch';

const BarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlldata();
        setData(data);
  if (data && data.length > 0) {

          // Create a bar chart with the data.
          const svg = d3.select(svgRef.current);
          const margin = { top: 20, right: 20, bottom: 50, left: 50 };
          const width = 500 - margin.left - margin.right;
          const height = 400 - margin.top - margin.bottom;
    
          const xScale = d3
            .scaleBand()
            .domain(data.map(d => d.title))
            .range([0, width])
            .padding(0.2);
    
          const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.intensity)])
            .range([height, 0]);
    
          const xAxis = d3.axisBottom(xScale);
          const yAxis = d3.axisLeft(yScale);
    
          svg.select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
    
          svg.select(".y-axis")
            .call(yAxis);
    
          svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.title))
            .attr("y", d => yScale(d.intensity))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.intensity));
        }

        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div id="bar-chart">
      <svg ref={svgRef} width="400" height="200">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;