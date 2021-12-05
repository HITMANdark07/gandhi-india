import React from "react";
import styles from "../assets/css/product.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { removeItem, updateItem } from "../api/cartHelper";
import { withRouter } from "react-router";

function CartCard({ history, prod }) {
  const [count, setCount] = React.useState(prod.count);
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
            removeItem(prod._id);
            history.push("/cart");
        }}
      >
        <DeleteForeverIcon size={55} color="secondary" />
      </div>
      <img
        className={styles.productImage}
        src={`https://thumbs.dreamstime.com/b/product-text-made-wooden-cube-white-background-181800372.jpg`}
        alt="productssss"
      />
      <div
        className={styles.productPreview}
        onClick={() => history.push(`/product/${prod ? prod.id : "lalsldasl"}`)}
      ></div>
      <div className={styles.productContent}>
        <h4>{prod ? prod.name : "Silk Saree"}</h4>
        {/* <div><Rating name="read-only" value={8} readOnly/></div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "25px",
            }}
            onClick={() => {
              if (count > 1) {
                updateItem(prod._id, count - 1);
                setCount(count - 1);
                history.push("/cart");
              }
            }}
          >
            -
          </button>
          <input
            style={{
              padding: "8px",
              width: "20px",
              border: "none",
              textAlign: "center",
              fontSize: "20px",
              color: "tomato",
            }}
            value={count}
            type="text"
            disabled
          />
          <button
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "25px",
            }}
            onClick={() => {
              updateItem(prod._id, count + 1);
              setCount(count + 1);
              history.push("/cart");
            }}
          >
            +
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

export default withRouter(CartCard);
