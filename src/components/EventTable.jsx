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



export default function EventTable() {

const [events, setEvents] = React.useState([]);
const fetchData = async () => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/admin/events`
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
              <TableCell align="right">{event.date}</TableCell>
              <TableCell align="right">{event.hour}</TableCell>
              <TableCell align="right">{event.localisation}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete"  color="primary">
                  <CreateIcon />
                </IconButton> <IconButton aria-label="delete"  color="primary">
                  <DeleteIcon />
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
