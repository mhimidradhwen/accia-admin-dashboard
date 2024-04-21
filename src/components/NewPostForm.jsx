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

const NewPostForm = () => {
  const [formData, setFormData] = useState({
    image: null, // For file upload
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(formDataToSend)

      const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWIyZDJlMTEwNTJmOGU3NmUwNWRhYSIsImlzQWRtaW4iOnRydWUsImVtYWlsIjoicmFkaHdlbkBlbWFpbC5jb20iLCJpYXQiOjE3MTM2NjMyMzgsImV4cCI6MTcxMzY2ODYzOH0.zR9CPaV7dtcfTEmBEerlvF2x2Cy-P2os524ettlgNg0"
      const response = await axios.post(
        "https://acca-backend-1.onrender.com/api/admin/post",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ type: "success", message: "Post created successfully" });

      console.log("Post created:", response.data);
      console.log(formDataToSend)
      // Optionally, you can redirect the user or perform some other action upon successful post creation
    } catch (error) {
      setAlert({
        type: "error",
        message: `fix this ${error.response.data.message}`,
      });

      console.error("Error creating post:", error);
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

      {/* <label htmlFor="title_ar">Title AR:</label>
      <input
        type="text"
        id="title_ar"
        name="title_ar"
        value={formData.title_ar}
        onChange={handleChange}
      />

      <label htmlFor="description">Description AR:</label>
      <textarea
        id="description_ar"
        name="description_ar"
        value={formData.description_ar}
        onChange={handleChange}
      ></textarea>

      <label htmlFor="title_fr">Title FR:</label>
      <input
        type="text"
        id="title_fr"
        name="title_fr"
        value={formData.title_fr}
        onChange={handleChange}
      />

      <label htmlFor="description_fr">Description FR:</label>
      <textarea
        id="description_fr"
        name="description_fr"
        value={formData.description_fr}
        onChange={handleChange}
      ></textarea>

      <label htmlFor="title_eng">Title EN:</label>
      <input
        type="text"
        id="title_eng"
        name="title_eng"
        value={formData.title_eng}
        onChange={handleChange}
      />

      <label htmlFor="description_eng">Description EN:</label>
      <textarea
        id="description_eng"
        name="description_eng"
        value={formData.description_eng}
        onChange={handleChange}
      ></textarea>

      <label htmlFor="visible">Description EN:</label>
      <textarea
        id="visible"
        name="isVisible"
        value={formData.isVisible}
        onChange={handleChange}
      ></textarea>

      <label htmlFor="image">Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

      <button type="submit">Submit</button> */}

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
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              endIcon={<SendIcon />}
            >
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default NewPostForm;
