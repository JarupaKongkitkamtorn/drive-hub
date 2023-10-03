import React from "react";
import { CircularProgress, Box } from "@mui/material";

function Loading() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
