import React from "react";
import styles from "../assets/css/product.module.css";
import Rating from "@mui/material/Rating";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { addItem } from "../api/cartHelper";
import { withRouter } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addWish } from "../api/wishHelper";
import makeToast from "../Toaster";

function ProductCard({ history, id, mrp, price, title, prod }) {
  const [added, setAdded] = React.useState(false);
  const [wish, setWish] = React.useState(false);
  return (
    <div className={styles.productCard}>
      <img
        className={styles.productImage}
        style={{ cursor: "pointer" }}
        src={`https://thumbs.dreamstime.com/b/product-text-made-wooden-cube-white-background-181800372.jpg`}
        alt="productssss"
      />
      <div
        style={{
          position: "absolute",
          padding: "10px",
          zIndex: 40,
          cursor: "pointer",
          borderRadius: "30px",
        }}
        onClick={() => {
            if(!wish){
              addWish(prod,() => {
                history.push(history.location.pathname);
                setWish(true);
                makeToast("success",`${prod.name} added to Wishlist`);
            })
            }
        }}
      >
        <FavoriteIcon sx={{ fontSize: 30 }} color={wish ? "" : "error"} />
      </div>
      <div
        className={styles.productPreview}
        onClick={() => history.push(`/product/${id ? id : "lalsldasl"}`)}
      >
        <VisibilityIcon sx={{ fontSize: 40 }} />
      </div>
      <div className={styles.productContent}>
      <div>
          <Rating name="read-only" color="#ff631c" value={4.5} readOnly />
        </div>
        <p style={{color:"#ff631c", fontWeight:"750"}}>{title ? title : "Silk Saree"}</p>
        <div className={styles.rates}>
          <div className={styles.mrp}>₹ {mrp ? mrp.toFixed(2) : "12000"}/-</div>
          <div className={styles.sp}>
            ₹ {price ? price.toFixed(2) : "10000"}/-
          </div>
        </div>
        <div className={styles.rates}>
        <button
          className={styles.addCartbu}
          style={{ backgroundColor: added ? "grey" : "" }}
          disabled={added}
          onClick={() => {
            if (prod._id) {
              addItem(prod, () => {
                setAdded(true);
                makeToast("success",`${prod.name} added to Cart`);
                history.push(history.location.pathname);
              });
            }
          }}
        >
          {added ? "Added" : "Add"} to Cart
        </button>
        <button
          className={styles.addCartbu}
          onClick={() => {
            history.push(`/product/${id ? id : "lalsldasl"}`);
          }}
        >
          Buy Now
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default withRouter(ProductCard);
