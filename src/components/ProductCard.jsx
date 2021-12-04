import React from "react";
import styles from "../assets/css/product.module.css";
import Rating from '@mui/material/Rating';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { withRouter } from "react-router";

function ProductCard({history}) {
  return (
      <div className={styles.productCard}>
          <img className={styles.productImage} src={`https://cdn.shopify.com/s/files/1/0876/4704/products/nora-fatehi-in-burgundy-saree-with-raw-silk-blouse-celebrity-devnaagri-925092_800x.jpg?v=1596512619`} alt="productssss"/>
          <div className={styles.productPreview}
           onClick={() => history.push(`/product/asdaa`)}
            >
          <VisibilityIcon sx={{ fontSize: 40 }} />
          </div>
          <div className={styles.productContent}>
              <button className={styles.addCartbu}>Add to Cart</button>
              <h4>Silk Saree</h4>
              <div><Rating name="read-only" value={8} readOnly/></div>
              <div className={styles.rates}>
                  <div className={styles.mrp}>₹ 1500.00/-</div>
                  <div className={styles.sp}>₹ 1300.00/-</div>
              </div>
          </div>
      </div>
  );
}

export default withRouter(ProductCard);
