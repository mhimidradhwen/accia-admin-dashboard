import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { SERVER_URL } from "../utils";
import { BounceLoader } from "react-spinners";

const NewPostForm = () => {
  const [formData, setFormData] = useState({
    image: null, // For file upload
  });

  const [alert, setAlert] = useState({type: null, message: null});
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [toastOpen, setToastOpen] = useState(false);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title_ar", formData.title_ar);
      formDataToSend.append("description_ar", formData.description_ar);
      formDataToSend.append("title_fr", formData.title_fr);
      formDataToSend.append("description_fr", formData.description_fr);
      formDataToSend.append("title_eng", formData.title_eng);
      formDataToSend.append("description_eng", formData.description_eng);
      formDataToSend.append("isVisible", formData.isVisible);
      formDataToSend.append("image", formData.image);
      console.log(formDataToSend);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${SERVER_URL}/api/admin/post`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ type: "success", message: "Post créé avec succès" });
      setIsLoading(false);
      setToastOpen(true);
      // Optionally, you can redirect the user or perform some other action upon successful post creation
    } catch (error) {
      setIsLoading(false);
      setToastOpen(true);
      setAlert({
        type: "error",
        message: `Erreur ${error.response.data.message}`,
      });

      console.error("Erreur lors de la création du post:", error);
    }
  };

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
              value={formData.title_fr}
              fullWidth
              name="title_fr"
              id="outlined-required"
              label="Titre (Français)"
              onChange={handleChange}
              placeholder="Titre"
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="description_fr"
              value={formData.description_fr}
              id="outlined-required"
              label="Description (Français)"
              multiline
              onChange={handleChange}
              placeholder="Description"
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="title_eng"
              value={formData.title_eng}
              fullWidth
              id="outlined-required"
              label="Titre (Anglais)"
              multiline
              onChange={handleChange}
              placeholder="Titre"
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              value={formData.description_eng}
              onChange={handleChange}
              name="description_eng"
              fullWidth
              id="outlined-required"
              label="Description (Anglais)"
              multiline
              placeholder="Description"
            />{" "}
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              value={formData.title_ar}
              name="title_ar"
              onChange={handleChange}
              fullWidth
              id="outlined-required"
              label="Titre (Arabe)"
              multiline
              placeholder="Titre"
            />{" "}
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              value={formData.description_ar}
              onChange={handleChange}
              name="description_ar"
              fullWidth
              id="outlined-required"
              label="Description (Arabe)"
              multiline
              placeholder="Description"
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="isVisible"
            >
              <FormControlLabel
                value="true"
                onChange={handleChange}
                control={<Radio />}
                name="isVisible"
                label="Publique"
              />
              <FormControlLabel
                value="false"
                onChange={handleChange}
                control={<Radio />}
                name="isVisible"
                label="Privée"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <Button
              component="label"
              role={undefined}
              fullWidth
              size="large"
              variant="outlined"
              tabIndex={-1}
              onChange={handleChange}
              startIcon={<CloudUploadIcon />}
            >
              Ajouter une image{" "}
              <VisuallyHiddenInput type="file" name="image" accept="image/*" />
            </Button>{" "}
          </Grid>
          <Grid item xs={6}>
            {isLoading && (
              <BounceLoader color="#36d7b7" cssOverride={override} />
            )}
            {!isLoading && (
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                
                endIcon={<SendIcon />}
              >
                Ajouter
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default NewPostForm;