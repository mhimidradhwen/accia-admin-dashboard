import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import { Typography, styled } from "@mui/material";
import DocForm from "../components/DocForm";
import PostTable from "../components/PostTable";
import EventForm from "../components/EventForm";
import EventTable from "../components/EventTable";

function Events() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h3>Ajouter Un Evenement</h3>
          <EventForm />
          <h3>Tous Les Evenements</h3>
          <EventTable />
        </Box>
      </Box>
    </>
  );
}

export default Events;
