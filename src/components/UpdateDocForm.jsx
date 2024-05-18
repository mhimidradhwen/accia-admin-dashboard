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
import { Alert, Button, TextField } from "@mui/material";


const UpdateDocForm = ({ docId }) => {
    const [categorie, setcategorie] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [alert, setAlert] = React.useState(null);
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
    
    const handleCategoryChange = (event) => {
      setcategorie(event.target.value);
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formDataToSend = {
        title: title,
        type: categorie,
      }
      console.log(formDataToSend);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.put(
          `${SERVER_URL}/api/admin/document/${docId}`,
          formDataToSend,
          config
        );
        setAlert({ type: "success", message: "Document modifié avec succès" });
  
        console.log(response);
      } catch (error) {
        setAlert({ type: "error", 
        message: `fix this ${error.response.data.message}`});
  
        console.error(error);
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
       <Button
         variant="contained"
         fullWidth
         size="large"
         type="submit"
       >
         Modifier
       </Button>
     </Grid>
   </Grid>
 </Box>
 </form>
  );
};

export default UpdateDocForm;
