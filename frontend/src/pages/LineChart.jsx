import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { getAlldata } from '../service/datafetch';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '99%',
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  loading: {
    // marginTop: theme.spacing(2),
  },
}));

const LineChartComponent = () => {
  const classes = useStyles();
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
    return (
      <div className={classes.container}>
        <CircularProgress />
        <Typography variant="body1" className={classes.loading}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.container}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.container}>
    <Typography variant="h5" textAlign="center" marginBottom="15px" marginTop="10px" color="#2f2074">
  Line Chart
</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="end_year">
            <Label value="Year" position="insideBottom" offset={-10} />
          </XAxis>
          <YAxis>
            <Label value="Intensity" position="insideLeft" angle={-90} offset={0} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intensity" stroke="steelblue" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
