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
import { SERVER_URL } from "../utils";

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
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = {
        title_ar: formData.title_ar,
        title_fr: formData.title_fr,
        title_eng: formData.title_eng,
        description_ar: formData.description_ar,
        description_fr: formData.description_fr,
        description_eng: formData.description_eng,
        isVisible: formData.isVisible,
      };
      const token = localStorage.getItem("token");

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios
        .put(
          `${SERVER_URL}/api/admin/post/${postID}`,
          formDataToSend,
          headers
        )
        .then(
          setAlert({ type: "success", message: "Post updated successfully" })
        );

      console.log("Post updated:", response.data);
      console.log(formDataToSend);
    } catch (error) {
      setAlert({
        type: "error",
        message: `fix this ${error}`,
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
            <Button variant="contained" type="submit" fullWidth size="large">
              Modifier
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default UpdatePostForm;
