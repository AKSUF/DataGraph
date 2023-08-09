import React, { useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Button } from "@mui/material";
import { getFilteredData } from "../service/datafetch";
import AllFetchData from "./Allfetchedzzzcom"; // Assuming you have the AllFetchData component
export default function SearchBar(){
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
  
    return (
      <div>
       
        {loading ? <div>Loading...</div> : null}
        {error ? <div>{error}</div> : null}
        <AllFetchData data={filteredData} /> {/* Pass the filtered data as props to AllFetchData */}
      </div>
    );
  };
  

  



