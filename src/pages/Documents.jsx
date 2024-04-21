import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import DocForm from "../components/DocForm";

import DocTable from "../components/DocTable";
function Documents() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h3>Ajouter Un Document</h3>
          <DocForm />
          <h3>Tous Les Documents</h3>
          <DocTable />
        </Box>
      </Box>
    </>
  );
}

export default Documents;
