import React from "react";
import styles from "../assets/css/product.module.css";
import Rating from '@mui/material/Rating';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { withRouter } from "react-router";

function ProductCard({history,id, mrp, price, title}) {
  return (
      <div className={styles.productCard}>
          <img className={styles.productImage} src={`https://thumbs.dreamstime.com/b/product-text-made-wooden-cube-white-background-181800372.jpg`} alt="productssss"/>
          <div className={styles.productPreview}
           onClick={() => history.push(`/product/${id?id:'lalsldasl'}`)}
            >
          <VisibilityIcon sx={{ fontSize: 40 }} />
          </div>
          <div className={styles.productContent}>
              <button className={styles.addCartbu}>Add to Cart</button>
              <h4>{title ? title : "Silk Saree"}</h4>
              <div><Rating name="read-only" value={8} readOnly/></div>
              <div className={styles.rates}>
                  <div className={styles.mrp}>₹ {mrp ? mrp.toFixed(2) : "12000"}/-</div>
                  <div className={styles.sp}>₹ {price ? price.toFixed(2): "10000"}/-</div>
              </div>
          </div>
      </div>
  );
}

export default withRouter(ProductCard);
