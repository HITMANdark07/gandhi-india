import React from "react";
import Header from "../../components/Header";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import uuid from "react-uuid";

function ManageSpecifications() {
  const [options, setOPtions] = React.useState("");
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const id = uuid().split("-")[4];
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [cat, setCat] = React.useState("Primary");
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
      } else {
        setImage(null);
        setError(false);
      }
    } else {
      console.log("please select your file");
    }
  };
  const handleChange = (event, name) => {
    switch (name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:
    }
  };

  const showError = () => (
    <div style={{ display: error ? "" : "none", alignItems: "center" }}>
      <Alert severity="error">{error}</Alert>
    </div>
  );
  const showLoading = () => {
    loading && (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  };
  return (
    <>
      <Header />
      <div className="manageCategoryConatiner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            margin: "20px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <h2 style={{ padding: "5px" }}>Create New Specification</h2>
              </TableHead>
            </Table>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <TextField
                id="standard-basic"
                label="Specification Name"
                value={title}
                onChange={(e) => handleChange(e, "title")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <textarea style={{marginTop:"20px", padding:"10px", fontSize:"1rem"}} placeholder="Options" rows={12} />
              
              {showError()}
              {showLoading()}
              <Button
                variant="contained"
                sx={{ margin: "20px auto", width: "90%" }}
                startIcon={<SaveIcon />}
              >
                SAVE
              </Button>
            </div>
          </TableContainer>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 6,
            margin: "20px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Options</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* ------------------------   table dumm data  ---------------------------------- */}
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Saree length
                  </StyledTableCell>
                  <StyledTableCell align="right">
                  6.30 m, 6.00 m, 5.40 m, 5.35 m, 6.2 m, 5.5 m, 5.6 m, 5.20 m, 5.80 m, 6 m, 6.5 m, 6.10 m, 6.50 m, 6.0 m, 5.30 m, 5.75 m, 5.3 m, 5 m, 6.4 m, 6.3 m, 5.0 m, 6.9 m, 6.15 m, 5.70 m, 5.15 m, 5.1 m, 5.4 m, 5.45 m, 5.7 m, 5.8 m, 5.2 m, 5.50 m, 5.25 m,
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon button style={{ cursor: "pointer" }} />{" "}
                    <DeleteForeverIcon style={{ cursor: "pointer" }} />{" "}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Saree length
                  </StyledTableCell>
                  <StyledTableCell align="right">
                  6.30 m, 6.00 m, 5.40 m, 5.35 m, 6.2 m, 5.5 m, 5.6 m, 5.20 m, 5.80 m, 6 m, 6.5 m, 6.10 m, 6.50 m, 6.0 m, 5.30 m, 5.75 m, 5.3 m, 5 m, 6.4 m, 6.3 m, 5.0 m, 6.9 m, 6.15 m, 5.70 m, 5.15 m, 5.1 m, 5.4 m, 5.45 m, 5.7 m, 5.8 m, 5.2 m, 5.50 m, 5.25 m,
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon button style={{ cursor: "pointer" }} />{" "}
                    <DeleteForeverIcon style={{ cursor: "pointer" }} />{" "}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Saree length
                  </StyledTableCell>
                  <StyledTableCell align="right">
                  6.30 m, 6.00 m, 5.40 m, 5.35 m, 6.2 m, 5.5 m, 5.6 m, 5.20 m, 5.80 m, 6 m, 6.5 m, 6.10 m, 6.50 m, 6.0 m, 5.30 m, 5.75 m, 5.3 m, 5 m, 6.4 m, 6.3 m, 5.0 m, 6.9 m, 6.15 m, 5.70 m, 5.15 m, 5.1 m, 5.4 m, 5.45 m, 5.7 m, 5.8 m, 5.2 m, 5.50 m, 5.25 m,
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon button style={{ cursor: "pointer" }} />{" "}
                    <DeleteForeverIcon style={{ cursor: "pointer" }} />{" "}
                  </StyledTableCell>
                </StyledTableRow>
                
                {/* ------------------------   table dumm data  ---------------------------------- */}
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" colSpan="2">
                    Number of Specification: 3
                  </StyledTableCell>
                  </StyledTableRow>
                {/* {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default ManageSpecifications;
