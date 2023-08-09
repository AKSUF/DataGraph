import {  Button } from "@mui/material";
import React from 'react';

const  Mainpagesidebarbutton=({handleButtonsideClick})=> {
    return (
      <>
<Button variant="contained" onClick={() => handleButtonsideClick('allFetchData')} sx={{marginTop:'2rem'}}>
HomeData
  </Button>
 <Button variant="contained" onClick={() => handleButtonsideClick('linechart')}>
 LineChart
  </Button>
 <Button variant="contained" onClick={() => handleButtonsideClick('scatterplot')}>
 Scatterplot
  </Button>
 <Button variant="contained" onClick={() => handleButtonsideClick('barchart')}>
 BarChart
  </Button>
  <Button variant="contained" onClick={() => handleButtonsideClick('piechart')}>
  PieChart
  </Button>
 <Button variant="contained" onClick={() => handleButtonsideClick('groupbarchart')}>
   GroupBarChart
  </Button>

      </>
    );
  }
  export default  Mainpagesidebarbutton;