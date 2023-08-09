import React, { useEffect, useState } from 'react';
import { getAlldata } from '../service/datafetch';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Typography } from '@mui/material';

const BarChartComponent = () => {
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

  return (
    <div id="bar-chart" style={{ width: '100%', height: 500 }}>
    <Typography variant="h5" textAlign="center" marginBottom="15px" marginTop="10px" color="#2f2074">
  Bar Chart
</Typography>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 50, left: 50 }}>
          <CartesianGrid />
          <XAxis dataKey="title">
            <Label value="Title" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Intensity" angle={-90} position="insideLeft"/>
          </YAxis>
          <Tooltip />
          <Bar dataKey="intensity" fill="steelblue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
