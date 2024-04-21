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

import { Button, TextField } from "@mui/material";

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
  const [categorie, setcategorie] = React.useState('');

  const handleChange = (event) => {
    setcategorie(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
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
            Ajouter des images <VisuallyHiddenInput type="file" />
          </Button>{" "}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            endIcon={<SendIcon />}
            sx={{height:55}}

          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
