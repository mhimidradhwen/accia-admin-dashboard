import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function EventForm() {
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Titre (Français)"
            placeholder="Titre"
          />{" "}
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Description (Français)"
            multiline
            placeholder="Description"
          />{" "}
        </Grid>
        <Grid item xs={6}>
      
        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs} >
        <DateTimePicker fullWidth label="Date et Heure" defaultValue={dayjs('2022-04-17T15:30')} />
    </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Localisation"
            multiline
            placeholder="Localisation"
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
          >
            Ajouter une image <VisuallyHiddenInput type="file" />
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
