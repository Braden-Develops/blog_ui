import React from "react";
import ContactForm from "../components/ContactForm";
import Box from "@mui/material/Box";

export default function Contact() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "1em"
        }}
      >
        <ContactForm></ContactForm>
      </Box>
      <img src={require("../static/squidward.gif")} alt=""></img>
    </React.Fragment>
  );
}
