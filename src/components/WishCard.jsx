import React from "react";
import styles from "../assets/css/Feature.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { addItem } from "../api/cartHelper";
import { withRouter } from "react-router";
import { removeWish } from "../api/wishHelper";
import makeToast from "../Toaster";
import { API } from "../config";

function WishCard({ history, prod }) {
  const [added, setAdded] = React.useState(false);
  return (
    <div className={styles.productCard}>
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          padding: "8px",
          background: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
            removeWish(prod._id);
            makeToast("success",`${prod.name} removed from Wishlist`);
            history.push("/wishlist");
        }}
      >
        <DeleteForeverIcon size={55} color="secondary" />
      </div>
      <img
        className={styles.productImage}
        style={{width:'100%', cursor:"pointer"}}
        src={`${API}/image/photo/${prod.photo[0]}`}
        onClick={() =>  history.push(`/product/${prod._id}`)}
        alt="productssss"
      />
      <div className={styles.productContent}>
        <h4>{prod ? prod.name : "Silk Saree"}</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
          className={styles.addCartbu}
          style={{ backgroundColor: added ? "grey" : "" }}
          disabled={added}
          onClick={() => {
            if (prod._id) {
              addItem(prod, () => {
                setAdded(true);
                makeToast("success",`${prod.name} added to Cart`);
                removeWish(prod._id);
                history.push(history.location.pathname);
              });
            }
          }}
        >
          {added ? "Added" : "Add"} to Cart
        </button>
        </div>
        <div className={styles.rates}>
          <div className={styles.mrp}>
            ₹ {prod.mrp ? prod.mrp.toFixed(2) : "12000"}/-
          </div>
          <div className={styles.sp}>
            ₹ {prod.mrp ? prod.price.toFixed(2) : "10000"}/-
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(WishCard);
