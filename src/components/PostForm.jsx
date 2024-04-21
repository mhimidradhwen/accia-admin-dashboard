import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PostForm(props) {
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
    image: null, // For file upload
  });
  // const [formData, setFormData] = useState({
  //   title_fr: props.post.title.fr,
  //   description_fr: props.post.description.fr,
  //   title_eng: props.post.title.eng,
  //   description_eng: props.post.description.eng,
  //   title_ar: props.post.title.ar,
  //   description_ar: props.post.description.ar,
  //   isVisible:props.post.isVisible
  // });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWIyZDJlMTEwNTJmOGU3NmUwNWRhYSIsImlzQWRtaW4iOnRydWUsImVtYWlsIjoicmFkaHdlbkBlbWFpbC5jb20iLCJpYXQiOjE3MTM2NjMyMzgsImV4cCI6MTcxMzY2ODYzOH0.zR9CPaV7dtcfTEmBEerlvF2x2Cy-P2os524ettlgNg0"
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updatePost = async (e) => {
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
      console.log("to send")
      console.log(formDataToSend);
      const response = await axios.put(
        `https://acca-backend-1.onrender.com/api/admin/post/${props.post._id}`,
        formDataToSend,
        config
      );
      console.log("Form submitted successfully!");
      console.log(props.post._id);
      console.log(response.data)
      console.log(response.data.poste.updatedAt)
      console.log(response.data.poste.createdAt)
      console.log(formDataToSend);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
   <>
   <Box sx={{ p: 2}}>

   <Typography variant="h4" sx={{mb:2}}>{props.formHeading}</Typography>
    <form onSubmit={updatePost}>
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
              // onClick={()=>{updatePost(props.post._id)}}
              fullWidth
              type="submit"

              size="large"
              endIcon={<SendIcon />}
            >
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
              </Box>
    </>
  );
}
