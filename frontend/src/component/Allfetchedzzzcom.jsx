import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { getAlldata } from "../service/datafetch";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function AllFetchData() {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAlldata();
        setFetchedData(fetchedData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterGraphData = fetchedData.filter((cp) => {
    const lowerSearchText = searchText.toLowerCase();
    return (
      (cp.title && cp.title.toLowerCase().includes(lowerSearchText)) ||
      (cp.description &&
        cp.description.toLowerCase().includes(lowerSearchText)) ||
      (cp.country && cp.country.toLowerCase().includes(lowerSearchText)) ||
      (cp.end_year && cp.end_year.toLowerCase().includes(lowerSearchText)) ||
      (cp.intensity && cp.intensity.toString().includes(lowerSearchText)) ||
      (cp.sector && cp.sector.toLowerCase().includes(lowerSearchText)) ||
      (cp.topic && cp.topic.toLowerCase().includes(lowerSearchText)) ||
      (cp.insight && cp.insight.toLowerCase().includes(lowerSearchText)) ||
      (cp.url && cp.url.toLowerCase().includes(lowerSearchText)) ||
      (cp.region && cp.region.toLowerCase().includes(lowerSearchText)) ||
      (cp.start_year &&
        cp.start_year.toLowerCase().includes(lowerSearchText)) ||
      (cp.impact && cp.impact.toLowerCase().includes(lowerSearchText)) ||
      (cp.added && cp.added.toLowerCase().includes(lowerSearchText)) ||
      (cp.published && cp.published.toLowerCase().includes(lowerSearchText)) ||
      (cp.relevance && cp.relevance.toString().includes(lowerSearchText)) ||
      (cp.pestle && cp.pestle.toLowerCase().includes(lowerSearchText)) ||
      (cp.source && cp.source.toLowerCase().includes(lowerSearchText)) ||
      (cp.likelihood && cp.likelihood.toString().includes(lowerSearchText))
    );
  });

  const handleClearSearch = () => {
    setSearchText("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
        marginTop="8px"
      >
        <TextField
          type="text"
          style={{
            zIndex: 20,
            background: "white",
            borderRadius: "10px",
            marginBottom: "5px",
          }}
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search here"
          variant="outlined"
          className="search-input"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <IconButton
                className="clear-search-button"
                onClick={handleClearSearch}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      <Grid container spacing={1}>
        {filterGraphData.map((item, index) => (
          <Grid item key={index} xl={2} lg={3} md={4} xs={6}>
            <Card
              sx={{
                backgroundColor: "#fff", // Set the background color
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                borderRadius: "8px", // Add rounded corners
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Country: {item.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Region: {item.region}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Year: {item.start_year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Year: {item.end_year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Intensity: {item.intensity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sector: {item.sector}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Topic: {item.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Insight: {item.insight}
                </Typography>
              </CardContent>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ display: "flex", alignItems: "center", fontSize:'15'}}
                >
                  <Link
                    href={item.url}
                    target="_blank"
                    sx={{
                      marginRight: "auto",
                      marginBottom: "10px",
                      marginLeft: "10px",
                      textDecoration: "none", // Add this line to remove the underline
                    }}
                  >
                    Learn More
                  </Link>

                  <span
                    style={{
                      marginLeft: "auto",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  >
                    Relevance: {item.relevance}
                  </span>
                </Typography>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
