import React from "react";
import AllFetchData from "./Allfetchedzzzcom";
import LineChartComponent from "../pages/LineChart";
import ScatterPlot from "../pages/ScatterPlotPagge";
import BarChartComponent from "../pages/BarChartPage";
import PieChart from "../pages/PiChartPage";
import GroupBarChart from "../pages/GroupBarchart";

const MainPageMain = ({ activeComponent }) => {
  const isAllFetchDataActive = activeComponent !== "piechart" && activeComponent !== "barchart" && activeComponent !== "scatterplot" && activeComponent !== "linechart" && activeComponent !== "groupbarchart";

  return (
    <div>
      {isAllFetchDataActive && <AllFetchData />}
      {activeComponent === "piechart" && <PieChart />}
      {activeComponent === "barchart" && <BarChartComponent />}
      {activeComponent === "scatterplot" && <ScatterPlot />}
      {activeComponent === "linechart" && <LineChartComponent />}
      {activeComponent === "groupbarchart" && <GroupBarChart />}
    </div>
  );
};

export default MainPageMain;
