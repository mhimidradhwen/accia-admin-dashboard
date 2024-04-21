import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import GalleryForm from "../components/GalleryForm";
import GalleryTable from "../components/GalleryTable";

function Gallery() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h3>Ajouter Un Album</h3>
          <GalleryForm />
          <h3>Tous Les Albums</h3>
          <GalleryTable />
        </Box>
      </Box>
    </>
  );
}

export default Gallery;
