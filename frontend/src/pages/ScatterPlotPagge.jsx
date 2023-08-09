import React, { useEffect, useState } from 'react';
import { getAlldata } from '../service/datafetch';
import { Typography } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const ScatterPlot = () => {
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

  const maxIntensity = Math.max(...data.map((d) => d.intensity));
  const maxLikelihood = Math.max(...data.map((d) => d.likelihood));

  return (
<>
  
  <Typography variant="h5" textAlign="center" marginBottom="15px" marginTop="10px" color="#2f2074" >
  ScatterPlot Chart
</Typography>
<ResponsiveContainer width="100%" height={450}>

<ScatterChart margin={{ top: 20, right: 20, bottom: 50, left: 50 }}>
  <CartesianGrid />
  <XAxis dataKey="intensity" type="number" domain={[0, maxIntensity]}>
    <Label value="Intensity" offset={0} position="insideBottom" />
  </XAxis>
  <YAxis dataKey="likelihood" type="number" domain={[0, maxLikelihood]}>
    <Label value="Likelihood" angle={-90} position="insideLeft" />
  </YAxis>
  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  <Scatter data={data} fill="steelblue" line shape="circle" />
</ScatterChart>
</ResponsiveContainer>
</>
  
  );
};

export default ScatterPlot;
