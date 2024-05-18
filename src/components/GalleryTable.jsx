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
function createData(title, date) {
  return { title, date };
}



export default function GalleryTable() {
  const [dataList, setDataList] = React.useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/admin/album`
      );
      setDataList(response.data); 
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
const deletePost = async(id)=>{
  try {
    const response = await axios.delete(
      `${SERVER_URL}/api/admin/post/${id}`,{headers: {
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
  React.useEffect(() => {
    
    fetchData();
  }, []); 

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
            <TableCell align="right">Date d'ajout</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {row.folderName}
              </TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
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
