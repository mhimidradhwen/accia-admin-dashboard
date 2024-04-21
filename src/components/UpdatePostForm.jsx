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
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

const UpdatePostForm = ({ postID }) => {
  const [formData, setFormData] = useState({
    title_ar: "",
    description_ar: "",
    title_fr: "",
    description_fr: "",
    title_eng: "",
    description_eng: "",
    isVisible: "true",
    image: null, 
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
        console.log(e.target.value )
        console.log(e.target.name )
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title_ar", formData.title_ar);
      console.log(formData)
      formDataToSend.append("description_ar", formData.description_ar);
      formDataToSend.append("title_fr", formData.title_fr);
      formDataToSend.append("description_fr", formData.description_fr);
      formDataToSend.append("title_eng", formData.title_eng);
      formDataToSend.append("description_eng", formData.description_eng);
      formDataToSend.append("isVisible", formData.isVisible);
      formDataToSend.append("image", formData.image);

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWIyZDJlMTEwNTJmOGU3NmUwNWRhYSIsImlzQWRtaW4iOnRydWUsImVtYWlsIjoicmFkaHdlbkBlbWFpbC5jb20iLCJpYXQiOjE3MTM2NjkxNjQsImV4cCI6MTcxMzY3NDU2NH0.Dx2FvlIAha_oQirCtxNcb2ycvGe3-DM1PE9cjuq0j2c"
      const response = await axios.put(
        `https://acca-backend-1.onrender.com/api/admin/post/${postID}`,
        formData.description_ar,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ type: "success", message: "Post updated successfully" });

      console.log("Post updated:", response.data);
      console.log(formDataToSend);
      // Optionally, you can redirect the user or perform some other action upon successful post creation
    } catch (error) {
      setAlert({
        type: "error",
        message: `fix this ${error.response.data.message}`,
      });

      console.error("Error updating post:", error);
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
      {alert && (
        <Alert
          variant="filled"
          severity={alert.type}
          onClose={() => {
            setAlert(null);
          }}
        >
          {alert.message}{" "}
        </Alert>
      )}

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
              value={formData.isVisible}
              onChange={handleChange}
              name="isVisible"
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Publique"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
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
              startIcon={<CloudUploadIcon />}
            >
              Ajouter une image{" "}
              <VisuallyHiddenInput type="file" name="image" accept="image/*" />
            </Button>{" "}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
            >
              Modifier
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default UpdatePostForm;
