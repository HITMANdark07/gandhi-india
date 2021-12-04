import React from "react";
import Header from "../../components/Header";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
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
import { Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import uuid from "react-uuid";

function AddProduct() {
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
  const [seller, setSeller] = React.useState("Seller01");
  const [regPrice, setRegPrice] =React.useState(0);
  const [salePrice, setSalePrice] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [shortDes, setShortDesc] = React.useState(EditorState.createEmpty());
  const [fullDes, setFullDesc] = React.useState(EditorState.createEmpty());
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [showimage, setShowImage] = React.useState(
    "https://thumbs.dreamstime.com/b/product-text-made-wooden-cube-white-background-181800372.jpg"
  );
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setShowImage(URL.createObjectURL(selectedFile));
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
      case "sale":
          setSalePrice(event.target.value);
          break;
      case "regular":
          setRegPrice(event.target.value);
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
  const wrapperStyle = {
    border: "1px solid #969696",
  };
  const editorStyle = {
    height: "12rem",
    padding: "1rem",
  };
  return (
    <>
      <Header />
      <div className="manageCategoryConatiner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 6,
            margin: "10px",
          }}
        >
          <TableContainer component={Paper}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ paddingLeft: "15px" }}>Product Details</h2>
              <Button variant="contained" startIcon={<SaveIcon />}>
                SAVE & PUBLISH
              </Button>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px",
              }}
            >
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Seller</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Seller"
                  value={seller}
                  onChange={(e) => handleChange(e, "category")}
                >
                  {/* {cat.map((cato) => ( */}
                  <MenuItem value="Seller01">Seller01</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  {/* ))} */}
                </Select>
              </FormControl>
              <TextField
                id="standard-basic"
                label="Product Name"
                value={title}
                onChange={(e) => handleChange(e, "title")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <Typography
                sx={{ fontSize: "16px", padding: "5px", fontWeight: "600" }}
              >
                Short Description
              </Typography>

              <Editor
                editorState={shortDes}
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(e) => {
                  setShortDesc(e);
                  //   console.log(stateToHTML(e.getCurrentContent()));
                }}
              />
              <Typography
                sx={{ fontSize: "16px", padding: "5px", fontWeight: "600" }}
              >
                Full Description
              </Typography>
              <Editor
                editorState={fullDes}
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(e) => {
                  setFullDesc(e);
                  // console.log(stateToHTML(e.getCurrentContent()));s
                }}
              />

              <TextField
                id="standard-basic"
                label="Regular Price"
                value={regPrice}
                type="number"
                onChange={(e) => handleChange(e, "regular")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                id="standard-basic"
                type="number"
                label="Sale Price"
                value={salePrice}
                onChange={(e) => handleChange(e, "sale")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              {/* <Typography
                sx={{ fontSize: "16px", padding: "5px", fontWeight: "600" }}
              >
                Specifications
              </Typography>
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Seller</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Clothing Design/ Style"
                  value={seller}
                  onChange={(e) => handleChange(e, "category")}
                >
                  {cat.map((cato) => (
                  <MenuItem value="Seller01">Seller01</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                   ))} 
                </Select>
              </FormControl> */}

              {showError()}
              {showLoading()}
              <Button
                variant="contained"
                sx={{ margin: "20px auto", width: "90%" }}
                startIcon={<SaveIcon />}
              >
                SAVE & PUBLISH
              </Button>
            </div>
          </TableContainer>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            margin: "20px",
          }}
        >
          <Paper elevation={2} sx={{ margin: "10px auto", marginTop: "0px" }}>
            <Typography sx={{ padding: "10px", fontWeight: "600" }}>
              Product Category
            </Typography>
            <hr />
            <div style={{ display: "flex", flexWrap: "wrap", padding: "12px" }}>
              <input type="radio" id="html" name="fav_language" value="HTML" /> {" "}
              <label for="html">Electronic Gadgets</label>
              <br />
                <input type="radio" id="css" name="fav_language" value="CSS" /> {" "}
              <label for="css">Saree</label>
              <br />
               {" "}
              <input
                type="radio"
                id="javascript"
                name="fav_language"
                value="JavaScript"
              />
                <label for="javascript">Shirts</label>
              <input type="radio" id="html" name="fav_language" value="HTML" /> {" "}
              <label for="html">Pants</label>
              <br />
                <input type="radio" id="css" name="fav_language" value="CSS" /> {" "}
              <label for="css">Trousers</label>
              <br />
               {" "}
              <input
                type="radio"
                id="javascript"
                name="fav_language"
                value="JavaScript"
              />
                <label for="javascript">Footwear</label>
            </div>
          </Paper>
          <Paper elevation={2} sx={{ margin: "10px auto", marginTop: "0px" }}>
            <Typography sx={{ padding: "10px", fontWeight: "600" }}>
              Product Image
            </Typography>
            <hr />
            <div style={{ display: "flex", flexWrap: "wrap", padding: "12px" }}>
              <label htmlFor="contained-button-file">
                <img
                  src={showimage}
                  alt="sourceig"
                  height="150px"
                  width="250px"
                />
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
            </div>
          </Paper>
          <Paper elevation={2} sx={{ margin: "10px auto", marginTop: "0px" }}>
            <Typography sx={{ padding: "10px", fontWeight: "600" }}>
              Product Gallery
            </Typography>
            <hr />
            <div style={{ display: "flex", flexWrap: "wrap", padding: "12px" }}>
              <label htmlFor="contained-button-file">
                <img
                  src={showimage}
                  alt="sourceig"
                  height="150px"
                  width="250px"
                />
              </label>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
