import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerToolbar } from "@mui/x-date-pickers/DatePicker";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const cancatenateDateandHour = (hour,date) => {
  return `${date}T${hour}:00`;
}

export default function UpdateEventForm({eventId}) {
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

  // state
  const [formData, setFormData] = useState({
    image: null,
  });
  const [alert, setAlert] = useState({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [toastOpen, setToastOpen] = useState(false);
  // change handlers
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
      console.log(hourToTimestamp(hour,date));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = {
        title: formData.title_fr,
        date: cancatenateDateandHour(formData.H_Start,formData.date),
        description: formData.description_fr,
        H_Start: cancatenateDateandHour(formData.H_Start,formData.date),
        H_Fin: cancatenateDateandHour(formData.H_End,formData.date),
        location: formData.location_fr,
      }
      console.log(formDataToSend);
      console.log(formData.H_start);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${SERVER_URL}/api/admin/event/${eventId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ type: "success", message: "Evenement modifié avec succès" });
      setIsLoading(false);
      setToastOpen(true);
      // Optionally, you can redirect the user or perform some other action upon successful post creation
    } catch (error) {
      setIsLoading(false);
      setToastOpen(true);
      setAlert({
        type: "error",
        message: `Erreur ${error}`,
      });

      console.error("Erreur lors de la création du post:", error);
    }
  };

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
              onChange={handleChange}
              name="title_fr"
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
              onChange={handleChange}
              name="description_fr"
              id="outlined-required"
              label="Description (Français)"
              multiline
              placeholder="Description"
            />{" "}
          </Grid>
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <Grid item xs={6}>
              <DatePicker
                fullWidth
                label="Date d'evenement"
                name="date"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TimePicker
                    fullWidth
                    label="Heure de début"
                    name="H_Start"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimePicker
                    fullWidth
                    label="Heure de fin"
                    name="H_End"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </LocalizationProvider>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              onChange={handleChange}
              name="location_fr"
              id="outlined-required"
              label="Localisation"
              multiline
              placeholder="Localisation"
            />{" "}
          </Grid>

         
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              size="large"
              endIcon={<SendIcon />}
            >
              Modifier
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
