import React, { useEffect, useState } from 'react';
import { getAlldata } from '../service/datafetch';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import * as d3 from 'd3'; // Import the d3 library

const GroupedBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getAlldata();
        setData(responseData);

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

  // Group data by regions
  const groupedData = d3.group(data, d => d.region);

  // Compute average intensity and relevance for each region
  const regionData = Array.from(groupedData, ([region, data]) => ({
    region,
    avgIntensity: d3.mean(data, d => d.intensity),
    avgRelevance: d3.mean(data, d => d.relevance),
  }));

  return (
    <div id="grouped-bar-chart">
      <ResponsiveContainer width="97%" height={450}>
        <BarChart data={regionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgIntensity" fill="steelblue" />
          <Bar dataKey="avgRelevance" fill="orange" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupedBarChart;
