import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Landing() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          padding: "1em"
        }}
      >
        <Box><Typography variant='h1'>Welcome to my blog website!</Typography></Box>
        <Box><img src={require("../static/squidward.gif")} alt=""></img></Box>
      </Box>
    </React.Fragment>
  );
}