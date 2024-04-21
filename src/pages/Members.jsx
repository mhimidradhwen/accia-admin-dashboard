import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import BackupTableIcon from '@mui/icons-material/BackupTable';

import MembersTable from "../components/MembersTable";
function Members() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      
          <h3>Tous Les Membres</h3>
          <Button variant="contained" sx={{mt:3,mb:3}} fullWidth startIcon={<BackupTableIcon />}>
      Exporter en CSV
      </Button>
          <MembersTable />
        </Box>
      </Box>
    </>
  );
}

export default Members;
