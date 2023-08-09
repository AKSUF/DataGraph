import { Typography } from "@mui/material"
import BarChart from "../component/GroupBar";

export default function GroupBarChart(){
return(
    <>
<Typography variant="h5" textAlign="center" marginBottom="15px" marginTop="10px" color="#2f2074">
  GroupBar Chart
</Typography>
    <BarChart/>
    </>
)
}