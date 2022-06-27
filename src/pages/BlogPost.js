import React from "react";
import { CssBaseline, Box } from "@mui/material";
import BlogStack from "../components/BlogStack";

export default function BlogPost() {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
      </Box>
      <BlogStack></BlogStack>
    </React.Fragment>
  );
}
