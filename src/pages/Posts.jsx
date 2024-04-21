import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

import {
  Container,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import PostTable from "../components/PostTable";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { AddIcCallTwoTone } from "@mui/icons-material";
import NewPostForm from "../components/NewPostForm";
import PostForm from "../components/PostForm";
function Posts() {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [formData, setFormData] = useState({
    title: { fr: "", ar: "", eng: "" },
    description : { fr: "", ar: "", eng: "" }
  });
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box>
            <h3>Ajouter Une Publication</h3>
          </Box>
          <NewPostForm />
          {/* <PostForm post={formData} formHeading="Ajouter une publication (-)"/> */}
          <h3>Tous Les Publications</h3>
          <PostTable />
        </Box>
      </Box>
    </>
  );
}

export default Posts;
