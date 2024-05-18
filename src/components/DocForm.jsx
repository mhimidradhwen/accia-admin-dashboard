import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { SERVER_URL } from "../utils";
import { Alert, Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { BounceLoader } from "react-spinners";
import LoadingButton from "./LoadingButton";

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
  const [categorie, setcategorie] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [alert, setAlert] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleCategoryChange = (event) => {
    setcategorie(event.target.value);
  };
  
  const handleVisibilityChange = (event) => {
    setIsVisible(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("type", categorie);
    formDataToSend.append("pdfDocument", file);
    formDataToSend.append("folderName", "document");
    formDataToSend.append("isVisible", isVisible);
    console.log(formDataToSend);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/admin/document`,
        formDataToSend,
        config
      );
      setAlert({ type: "success", message: "Post created successfully" });
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setAlert({ type: "error", 
      message: `fix this ${error.response.data.message}`});

      console.error(error);
      setIsLoading(false);
    }
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
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
            fullWidth
            id="outlined-required"
            label="Titre de document"
            placeholder="Titre"
            value={title}
            onChange={handleTitleChange}
          />{" "}
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">Categorie</InputLabel>

            <Select
              value={categorie}
              onChange={handleCategoryChange}
              autoWidth
              fullWidth
              placeholder="Categorie"
              label="Categorie"
            >
              <MenuItem value="">
                <em>Selectionner ...</em>
              </MenuItem>
              <MenuItem value={"Guide"}>Guide</MenuItem>
              <MenuItem value={"Rapport"}>Rapport</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="isVisible"
            >
              <FormControlLabel
                value="true"
                onChange={handleVisibilityChange}
                control={<Radio />}
                name="isVisible"
                label="Publique"
              />
              <FormControlLabel
                value="false"
                onChange={handleVisibilityChange}
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
            onChange={handleFileChange}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Ajouter un document <VisuallyHiddenInput type="file" />
          </Button>{" "}
        </Grid>
        <Grid item xs={6}>
        {isLoading && (
              <BounceLoader color="#36d7b7" cssOverride={override} />
            )}
            {!isLoading && (
              
          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
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
}
