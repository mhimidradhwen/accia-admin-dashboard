import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import { Typography, styled } from "@mui/material";

function About() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>A Propos</h1>
        </Box>
      </Box>
    </>
  );
}

export default About;
