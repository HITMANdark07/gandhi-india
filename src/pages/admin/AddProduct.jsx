import React from "react";
import Header from "../../components/Header";
import TableContainer from "@mui/material/TableContainer";
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
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import uuid from "react-uuid";
import { getAllCategories } from "../../api/category";
import { isAuthenticated } from "../../auth";
import { createProduct } from "../../api/product";
import { EditorState } from "draft-js";

function AddProduct() {

  const [categories, setCategories] = React.useState([]);
  const allCats = React.useCallback(() => {
    getAllCategories().then(data => {
      // console.log(data);
      if(data){
        setCategories(data);
      }else{
        setError(true);
      }
    }) 
  },[]);
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    allCats();
  }, [])
  const [seller, setSeller] = React.useState("Seller01");
  const [category, setCategory] = React.useState("");
  const [regPrice, setRegPrice] =React.useState(0);
  const [salePrice, setSalePrice] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [full, setFull] = React.useState(EditorState.createEmpty());
  const [short, setShort] = React.useState(EditorState.createEmpty());
  const [quantity, setQuantity] = React.useState(0);
  const [shortDes, setShortDesc] = React.useState("");
  const [fullDes, setFullDesc] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
  const clickSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setLoading(true);
    const data = {
      id:uuid().split("-")[4],
      categories_id:category,
      sub_categories_id:category,
      name:title,
      mrp:regPrice,
      price:salePrice,
      qty:quantity, //
      image:'', //
      short_desc:shortDes,
      description: fullDes,
      // best_seller: "trgdrestrcdyvfubygu",
      // meta_title: "xscdvfybyguu",
      // meta_desc: "wxecrvtbynu",
      // meta_keyword: "xtrytuyi",
      added_by:isAuthenticated().username,
      status:"on"
    }
    createProduct(data).then(response => {
      if(response._id){
        setLoading(false);
        setError(false);
        setTitle("");
        setRegPrice(0);
        setSalePrice(0);
        setQuantity(0);
        setFull(EditorState.createEmpty());
        setShort(EditorState.createEmpty());
        setShortDesc("");
        setFullDesc("");
        console.log(response);
      }else{
        setLoading(false);
        setError(true);
      }
    })
  
  }
  const handleChange = (event, name) => {
    setError(false);
    switch (name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "sale":
          setSalePrice(event.target.value);
          break;
      case "regular":
          setRegPrice(event.target.value);
          break;
      case "quantity":
            setQuantity(event.target.value);
            break;
      case "seller":
          setSeller(event.target.value);
          break;
      case "category":
          setCategory(event.target.value);
          break;
      default:
    }
  };
  const showError = () => (
    <div style={{ display: error ? "" : "none", alignItems: "center" }}>
      <Alert severity="error">Something Went Wrong</Alert>
    </div>
  );
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
              <Button variant="contained" onClick={clickSubmit} startIcon={loading ? <CircularProgress size={25} color="inherit" /> :<SaveIcon />}>
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
              {showError()}
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Seller</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Seller"
                  value={seller}
                  onChange={(e) => handleChange(e, "seller")}
                >
                  {/* {cat.map((cato) => ( */}
                  <MenuItem value="Seller01">Seller01</MenuItem>
                  <MenuItem value="Seller02">Seller02</MenuItem>
                  <MenuItem value="Seller03">Seller03</MenuItem>
                  <MenuItem value="Seller04">Seller04</MenuItem>
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
                editorState={short}
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(e) => {
                  setShortDesc(stateToHTML(e.getCurrentContent()));
                  setShort(e);
                }}
              />
              <Typography
                sx={{ fontSize: "16px", padding: "5px", fontWeight: "600" }}
              >
                Full Description
              </Typography>
              <Editor
                editorState={full}
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(e) => {
                  setFullDesc(stateToHTML(e.getCurrentContent()));
                  setFull(e);
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
              <TextField
                id="standard-basic"
                type="number"
                label="Product Quantity"
                value={quantity}
                onChange={(e) => handleChange(e, "quantity")}
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
              <Button
                variant="contained"
                sx={{ margin: "20px auto", width: "90%" }}
                onClick={clickSubmit}
                startIcon={loading ? <CircularProgress size={25} color="inherit" /> : <SaveIcon />}
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
              {
                categories.map((cat) => (
                <div key={cat._id}>
                <input type="radio" id={cat._id} name="categories" value={cat._id} onChange={(e) => handleChange(e,"category")} />
                <label htmlFor={cat._id}>{cat.categories}</label><br/>
                </div>
                ))
              }
              
              {/* <br />
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
                <label for="javascript">Footwear</label> */}
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
