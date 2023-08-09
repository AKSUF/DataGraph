import React, { useEffect, useState } from 'react';
import { getAlldata } from '../service/datafetch';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF8A8A'];

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

  // Compute the distribution of sectors
  const sectorCounts = data.reduce((counts, d) => {
    counts[d.sector] = (counts[d.sector] || 0) + 1;
    return counts;
  }, {});

  const sectorData = Object.keys(sectorCounts).map((sector) => ({
    sector,
    count: sectorCounts[sector],
  }));

  const isSmallScreen = window.innerWidth <= 500; // Define the threshold for small screens

  const outerRadius = isSmallScreen ? 140 : 300; // Adjust the outerRadius based on the screen size

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ResponsiveContainer width="90%" height={600} minHeight={400}>
        <PieChart>
          <Pie
            dataKey="count"
            data={sectorData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={outerRadius}
            fill="#8884d8"
            label
          >
            {sectorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend align="right" layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {sectorData.map((entry, index) => (
          <div
            key={`legend-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '8px',
              minWidth: '200px',
              maxWidth: '300px',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: 8,
              }}
            ></div>
            <div>{entry.sector}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
