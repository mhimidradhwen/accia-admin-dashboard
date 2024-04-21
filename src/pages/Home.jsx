import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import { Grid, Typography, styled } from "@mui/material";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DashboardCard from "../components/DashboardCard";
import PostCharts from "../components/PostCharts";
import MembersCharts from "../components/MembersCharts";
import PostTable from "../components/PostTable";


function Home() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography sx={{ mt: 3 ,mb:3}} variant="h4">Statistiques</Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <DashboardCard
                titre="Publications"
                count="47"
                cardColor="#29bf12"
                path="/posts"
              />
            </Grid>
            <Grid item xs={3}>
              <DashboardCard
                titre="Evenements"
                count="3"
                cardColor="#f21b3f"
                path="/events"
              />
            </Grid>{" "}
            <Grid item xs={3}>
              <DashboardCard
                titre="Documents"
                count="35"
                cardColor="#08bdbd"
                path="/documents"
              />
            </Grid>{" "}
            <Grid item xs={3}>
              <DashboardCard
                titre="Membres"
                count="201"
                cardColor="#ff9914"
                path="/members"
              />
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: 1, pt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <PostCharts />
              </Grid>
              <Grid item xs={6}>
                <MembersCharts />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ mt: 3 ,mb:3}} variant="h4">Tous Les Membres</Typography>
                <PostTable />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
