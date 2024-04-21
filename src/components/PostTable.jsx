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
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import EditPostModal from "./EditPostModal";

export default function PostTable() {
  const [dataList, setDataList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://acca-backend-1.onrender.com/api/admin/post"
      );
      setDataList(response.data); 
      console.log(response.data);
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWIyZDJlMTEwNTJmOGU3NmUwNWRhYSIsImlzQWRtaW4iOnRydWUsImVtYWlsIjoicmFkaHdlbkBlbWFpbC5jb20iLCJpYXQiOjE3MTM2NjMyMzgsImV4cCI6MTcxMzY2ODYzOH0.zR9CPaV7dtcfTEmBEerlvF2x2Cy-P2os524ettlgNg0"
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
const deletePost = async(id)=>{
  try {
    const response = await axios.delete(
      `https://acca-backend-1.onrender.com/api/admin/post/${id}`,{headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },}
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  useEffect(() => {
    
    fetchData();
  }, []); 
  return (
    //   <div>
    //   <h1>Data List</h1>
    //   {dataList.length === 0 ? (
    //     <p>No data available</p>
    //   ) : (
    //     <ul>
    //       {dataList.map((item, index) => (
    //         <li key={index}>{item.name}</li> // Assuming each item has a 'name' property
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <div>
      <IconButton aria-label="delete" color="primary" onClick={fetchData}>
        <RefreshIcon />
      </IconButton>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Visibilité</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell align="right">Owner</TableCell>

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title.fr}
                </TableCell>
                <TableCell align="right">{row.description.fr}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">
                  {row.isVisible ? "visible" : "privé"}
                </TableCell>
                <TableCell align="right">
                  <img src={row.image.url} alt="image" />
                </TableCell>
                <TableCell align="right">{row.user.firstName}</TableCell>
                <TableCell align="center">
                  {/* <IconButton aria-label="delete" color="primary">
                    <CreateIcon />
                  </IconButton>{" "} */}
                  <EditPostModal postID={row._id} />
                  <IconButton aria-label="delete" color="primary">
                    <DeleteIcon onClick={()=>{deletePost(row._id)}}/>
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
