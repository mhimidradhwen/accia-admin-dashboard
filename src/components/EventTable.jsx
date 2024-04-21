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

function createData(title, date, hour , localisation) {
  return { title, date, hour, localisation };
}

const rows = [
  createData("Evenement 1", "24/02/2024", "17h00", "Bizerte"),
  createData("Evenement 2", "01/01/2024", "13h00", "Hammamet"),
  createData("Evenement 3", "24/02/2024", "21h00", "Tunis"),
  createData("Evenement 4", "29/03/2024", "21h00", "Bizerte"),
];

export default function EventTable() {
  return (
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
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.hour}</TableCell>
              <TableCell align="right">{row.localisation}</TableCell>
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
  );
}
