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

export default function DocForm() {
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
            label="Titre de document"
            placeholder="Titre"
          />{" "}
        </Grid>
        <Grid item xs={6}>
<FormControl fullWidth>

        <InputLabel id="demo-multiple-checkbox-label">Categorie</InputLabel>

        <Select
          value={categorie}
          onChange={handleChange}
          autoWidth
          fullWidth
          placeholder="Categorie"
          label="Categorie"
          >
          <MenuItem value="">
            <em>Selectionner ...</em>
          </MenuItem>
          <MenuItem value={10}>Guide</MenuItem>
          <MenuItem value={21}>Rapport</MenuItem>
        </Select>
</FormControl>
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
            Ajouter un document <VisuallyHiddenInput type="file" />
          </Button>{" "}
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            endIcon={<SendIcon />}
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
