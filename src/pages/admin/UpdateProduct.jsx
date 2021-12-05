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
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import uuid from "react-uuid";
import { getProductById, updateProductById } from "../../api/product";
import { getAllCategories } from "../../api/category";
import { stateToHTML } from "draft-js-export-html";

function UpdateProduct({
  match: {
    params: { productId },
  },
}) {
  const [categories, setCategories] = React.useState([]);
  const allCats = React.useCallback(() => {
    getAllCategories().then((data) => {
      // console.log(data);
      if (data) {
        setCategories(data);
      } else {
        setError(true);
      }
    });
  }, []);
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    allCats();
    getProduct();
  }, [allCats]);
  const [seller, setSeller] = React.useState("Seller01");
  const [category, setCategory] = React.useState("");
  const [regPrice, setRegPrice] = React.useState(0);
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
  const getProduct = React.useCallback(() => {
    getProductById(productId).then((data) => {
      if (data) {
        setTitle(data.name);
        const short_desc = htmlToDraft(data.short_desc);
        const contentState = ContentState.createFromBlockArray(
          short_desc.contentBlocks,
          short_desc.entityMap
        );
        setShort(EditorState.createWithContent(contentState));
        const full_desc = htmlToDraft(data.description);
        const contentFullState = ContentState.createFromBlockArray(
          full_desc.contentBlocks,
          full_desc.entityMap
        );
        setFull(EditorState.createWithContent(contentFullState));
        setQuantity(data.qty);
        setCategory(data.categories_id);
        setRegPrice(data.mrp);
        setSalePrice(data.price);
      } else {
        setError(true);
      }
    });
  });
  const clickSubmit = () => {
    setLoading(true);
    const data = {
      categories_id: category,
      sub_categories_id: category,
      name: title,
      mrp: regPrice,
      price: salePrice,
      qty: quantity, //
      image: "", //
      short_desc: shortDes,
      description: fullDes,
    };
    updateProductById(productId, data).then((data) => {
      if (data._id) {
        setLoading(false);
        alert("Product Updated");
      } else {
        setLoading(false);
        alert("something Went Wrong");
      }
    });
  };
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
              <Button
                variant="contained"
                startIcon={
                  loading ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    <SaveIcon />
                  )
                }
                onClick={clickSubmit}
              >
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

              {showError()}
              <Button
                variant="contained"
                sx={{ margin: "20px auto", width: "90%" }}
                startIcon={
                  loading ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    <SaveIcon />
                  )
                }
                onClick={clickSubmit}
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
                <input type="radio" id={cat._id} name="categories" value={cat.id} onChange={(e) => handleChange(e,"category")} />
                <label htmlFor={cat._id}>{cat.categories}</label><br/>
                </div>
                ))
              }
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

export default UpdateProduct;
