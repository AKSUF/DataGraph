import { Button } from "@mui/material";
import React from 'react';

const MainPageButton=({handleButtonClick})=> {

    return (
      <>

<Button variant="contained" onClick={() => handleButtonClick('allFetchData')}>
HomeData
  </Button>
 <Button variant="contained" onClick={() => handleButtonClick('linechart')}>
 Linechart
  </Button>
 <Button variant="contained" onClick={() => handleButtonClick('scatterplot')}>
 Scatterplot
  </Button>
 <Button variant="contained" onClick={() => handleButtonClick('barchart')}>
 Barchart
  </Button>
  <Button variant="contained" onClick={() => handleButtonClick('piechart')}>
  Piechart
  </Button>
 <Button variant="contained" onClick={() => handleButtonClick('groupbarchart')}>
   GroupBarChart
  </Button>

      </>
    );
  }
  export default MainPageButton;