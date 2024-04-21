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
import { Typography } from "@mui/material";

function createData(firstname, lastname, email, phone, payement) {
  return { firstname, lastname, email, phone, payement };
}

const rows = [
  createData("Radhwen", "Mhimid", "radhwen@gmail.com", "23230168", "Valide"),
  createData("Bacem", "Ben Ammar", "bacem@gmail.com", "23230168", "Non Valide"),
  createData("Radhwen", "Mhimid", "radhwen@gmail.com", "23230168", "Valide"),
  createData("Bacem", "Ben Ammar", "bacem@gmail.com", "23230168", "Non Valide"),
 
];

export default function MembersTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell align="right">Prenom</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Telephone</TableCell>
            <TableCell align="right">Payement</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstname}
              </TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.payement}</TableCell>
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
