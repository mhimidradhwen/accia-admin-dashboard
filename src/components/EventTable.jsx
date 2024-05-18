import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from '@mui/icons-material/Create';
import { SERVER_URL } from "../utils";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import EditEventModal from "./EditEventModal";

const Timestamp_string ="2024-05-12T09:30:00.000Z";
function getDate(date){
  return date.split("T")[0];
}
function getHour(date){
  let hour = date.split("T")[1];
  hour = hour.split(".")[0];
  let h = hour.split(":")[0];
  let m = hour.split(":")[1];
  return h+":"+m;
}
export default function EventTable() {

const [events, setEvents] = React.useState([]);



const fetchData = async () => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/admin/event`
    );
    setEvents(response.data); 
    console.log(response.data);
    console.log(response.data[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
React.useEffect(()=>{
  fetchData();
}, [])


const deleteEvent = async(id)=>{
  try {
    const response = await axios.delete(
      `${SERVER_URL}/api/admin/event/${id}`,{headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },}
    );
    console.log(response.data);
    fetchData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  return (
    <div>

    <IconButton aria-label="delete" color="primary" onClick={fetchData}>
    <RefreshIcon />
  </IconButton>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Heure</TableCell>
            <TableCell align="right">Localisation</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {event.title}
              </TableCell>
              <TableCell align="right">{getDate(event.date)}</TableCell>
              <TableCell align="right">{`${getHour(event.H_Start)} - ${getHour(event.H_Fin)}`}</TableCell>
              <TableCell align="right">{event.Location}</TableCell>
              <TableCell align="right">{event.isVisite ? "Public" : "Privé"}</TableCell>
              <TableCell align="center">
              <EditEventModal eventId={event._id}/>
                <IconButton aria-label="delete"  color="primary">
                  <DeleteIcon onClick={()=>{deleteEvent(event._id)}}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
