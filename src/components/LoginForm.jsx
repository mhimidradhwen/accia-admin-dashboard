import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BounceLoader} from "react-spinners";
import { SERVER_URL } from "../utils";

function LoginForm() {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${SERVER_URL}/api/auth/login`, creds)
        .then(setIsLoading(true))
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.user._id);
          console.log(response.data)
          navigate("/");
        });
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("id"));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setAlert({
        type: "error",
        message: `${error.response.data.message}`,
      });
    }
  };
  return (
    <Container maxWidth="sm">
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, marginTop: 20 }}>
              {isLoading &&  <BounceLoader color="#36d7b7" cssOverride={override}/>}
      {!isLoading && (
          <Grid container spacing={2}>
              <Typography></Typography>
              <Grid item xs={12}>
                {" "}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  onChange={handleChange}
                  name="email"
                  value={creds.email}
                  placeholder="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={creds.password}
                  label="Password"
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          )}
          </Box>
        </form>
      
    </Container>
  );
}

export default LoginForm;
