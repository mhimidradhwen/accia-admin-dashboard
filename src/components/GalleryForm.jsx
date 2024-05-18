import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { SERVER_URL } from "../utils";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function GalleryForm() {
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
  //states
const [title, setTitle] = React.useState('');
const [images, setImages] = React.useState('');
const [isLoading, setIsLoading] = React.useState(false);
const [alert, setAlert] = React.useState({});
const [toastOpen, setToastOpen] = React.useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleImagesChange = (event) => {
    setImages(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nameFolder", title);
      formDataToSend.append("zipFile", images);
      console.log(formDataToSend);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${SERVER_URL}/api/admin/album`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ type: "success", message: "Album créé avec succès" });
      setIsLoading(false);
      setToastOpen(true);
      // Optionally, you can redirect the user or perform some other action upon successful post creation
    } catch (error) {
      setIsLoading(false);
      setToastOpen(true);
      setAlert({
        type: "error",
        message: `Erreur ${error}`,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Snackbar
        open={toastOpen}
        color="red"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
      >
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            onChange={handleTitleChange}
            fullWidth
            id="outlined-required"
            label="Titre d'album"
            placeholder="Titre"
          />{" "}
        </Grid>
        
       

       

       
        <Grid item xs={6}>
          <Button
            component="label"
            role={undefined}
            fullWidth
            size="large"
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{height:55}}
          >
            Ajouter des images <VisuallyHiddenInput type="file" accept=".zip" onChange={handleImagesChange}/>
          </Button>{" "}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            endIcon={<SendIcon />}
            sx={{height:55}}
            type="submit"
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </Box>
    </form>
  );
}
