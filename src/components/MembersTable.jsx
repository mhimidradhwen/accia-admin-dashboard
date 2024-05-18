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
import CreateIcon from "@mui/icons-material/Create";
import { Button, Switch, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { useState } from "react";
import { SERVER_URL } from "../utils";

function createData(firstname, lastname, email, phone, payement) {
  return { firstname, lastname, email, phone, payement };
}

function removeObjectById(list, idToRemove) {
  return (list = list.filter((obj) => obj._id !== idToRemove));
}
const rows = [
  createData("Radhwen", "Mhimid", "radhwen@gmail.com", "23230168", "Valide"),
  createData("Bacem", "Ben Ammar", "bacem@gmail.com", "23230168", "Non Valide"),
  createData("Radhwen", "Mhimid", "radhwen@gmail.com", "23230168", "Valide"),
  createData("Bacem", "Ben Ammar", "bacem@gmail.com", "23230168", "Non Valide"),
];

export default function MembersTable() {
  const [dataList, setDataList] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `${SERVER_URL}/api/admin/users/profile/${id}`,
        config
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [csvMembers, setCsvMembers] = useState([]);
  const convertToCSV = (data) => {
    const fieldsToRemove = [
      "password",
      "_id",
      "profilePhoto",
      "createdAt",
      "updatedAt",
      "__v",
      "id",
      "isAdmin",
    ]; // Define fields to remove
    const filteredData = data.map((obj) => {
      const newObj = { ...obj };
      fieldsToRemove.forEach((field) => delete newObj[field]);
      return newObj;
    });
    const header = Object.keys(filteredData[0]).join(",");
    const rows = filteredData.map((obj) =>
      Object.values(obj)
        .map((val) => (typeof val === "string" ? `"${val}"` : val))
        .join(",")
    );
    return [header, ...rows].join("\n");
  };

  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${SERVER_URL}/api/admin/users/profile`,
        config
      );
      setDataList(removeObjectById(response.data, localStorage.getItem("id")));
      console.log(response.data);
      setCsvMembers(response.data);
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleExport = () => {
    const csvData = convertToCSV(csvMembers);
    downloadCSV(csvData, "usersData.csv");
  };
  const handlePayement = (userID) => {
    console.log(userID);
    //TODO:update isVerified to !isVerified
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 3 }}
        fullWidth
        startIcon={<BackupTableIcon />}
        onClick={handleExport}
      >
        Exporter en CSV
      </Button>
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
            {dataList.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.tel}</TableCell>
                <TableCell align="right">
                  <Switch
                    onClick={() => handlePayement(row._id)}
                    value={row.isVerified}
                    size="small"
                    checked={row.isVerified}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" color="primary">
                    <DeleteIcon onClick={() => deleteUser(row._id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
