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
import uuid from 'react-uuid';
import { withRouter } from "react-router";
import { createCategory, getAllCategories } from "../../api/category";
import { API } from "../../config";
import { isAuthenticated } from "../../auth";

function ManageCategories({history}) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const allCats = React.useCallback(() => {
    getAllCategories().then(data => {
      // console.log(data);
      setCategorys(data);
    }) 
  },[]);
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    allCats();
  }, [])
  const [categorys, setCategorys] = React.useState([]);
  const [data, setData] = React.useState({
    id:uuid().split("-")[4],
    categories:"",
    status:10
  })
  const [cat, setCat] = React.useState("Primary");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [showImage, setShowImage] = React.useState("https://woocommerce.com/wp-content/uploads/2013/05/productcategory2.png");
  const [image, setImage] = React.useState(null);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setShowImage(URL.createObjectURL(selectedFile));
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
      case "description":
        setDescription(event.target.value);
        break;
      case "cat":
        setCat(event.target.value);
      case "category":
        setData({...data,categories:event.target.value});
        break;
      default:
    }
  };
  const delCategories = (id) => {
    fetch(`${API}/category/${id}`,{
      method:"DELETE",
      headers:{
          Accept:'application/json',
          "Content-Type": "application/json",
          token: `Bearer ${isAuthenticated().accessToken}`
      },
  }).then(() => {
    alert("Category Deleted");
    allCats();
  }).catch(() => {
    alert("Something went wrong");
  })
  }
  const clickSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    createCategory(data).then(response => {
      if(response._id){
        setData({
          id:uuid().split('')[4],
          categories:"",
          status:10
        });
        allCats();
        setLoading(false);
      }else if(response.index===0){
        setLoading(false);
        setError(true);
      }else{
        setError(true);
        setLoading(false);
      }
    }).catch(err =>{
      console.log(err);
      setError(true);
    })

  }
  const showError = () => (
    <div style={{ display: error ? "" : "none", alignItems: "center" }}>
      <Alert severity="error">Something Went Wrong</Alert>
    </div>
  );

  return (
    <>
      <Header />
      <div
        className="manageCategoryConatiner"
      >
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
                <h2 style={{ padding: "10px" }}>Create New Category</h2>
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
                label="Category Name"
                value={data.categories}
                onChange={(e) => handleChange(e, "category")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                id="standard-basic"
                label="Slug"
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">
                  Parent Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Parent Category"
                  value={cat}
                  onChange={(e) => handleChange(e, "cat")}
                >
                  {/* {cat.map((cato) => ( */}
                    <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Electronic Gadgets">Electronic Gadgets</MenuItem>
                  <MenuItem value="Saree">Saree</MenuItem>
                  <MenuItem value="shirt">shirt</MenuItem>
                  <MenuItem value="Top">Top</MenuItem>
                  {/* ))} */}
                </Select>
              </FormControl>
              <TextField
                id="standard-basic"
                label="Description"
                value={description}
                onChange={(e) => handleChange(e, "description")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <img src={showImage} alt="showigcat" width="300px" />
              <label htmlFor="contained-button-file">
                <input
                  style={{ display: "none" }}
                  onChange={handleProductImg}
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  sx={{ margin: "20px auto" }}
                >
                  Upload
                </Button>
              </label>
              {showError()}
              <Button
                variant="contained"
                onClick={clickSubmit}
                sx={{ margin: "20px auto", width: "90%" }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
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
                  <StyledTableCell>Thumbnail</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Show in Home</StyledTableCell>
                  <StyledTableCell align="right">Slug</StyledTableCell>
                  <StyledTableCell align="right">
                    Parent Category
                  </StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { categorys.map((categori, index) => (
                  <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={
                        "https://image.shutterstock.com/image-illustration/mobile-devices-wireless-communication-technology-260nw-136413251.jpg"
                      }
                      alt="asdasdsdad"
                      width="35px"
                      height="35px"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {categori.categories}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <input type="checkbox" />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    dummy-data
                  </StyledTableCell>
                  <StyledTableCell align="right">Primary</StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon button={true} style={{ cursor: "pointer" }} onClick={() => history.push(`/admin/update-category/jnasbbs`)} />{" "}
                    <DeleteForeverIcon style={{ cursor: "pointer" }} onClick={() => delCategories(categori._id)} />{" "}
                  </StyledTableCell>
                </StyledTableRow>
                
                ))}
                {/* ------------------------   table dumm data  ---------------------------------- */}
                {/* ------------------------   table dumm data  ---------------------------------- */}
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

export default withRouter(ManageCategories);
