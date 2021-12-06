import React, { useState } from "react";
import styles from "../assets/css/productPage.module.css";
import Rating from '@mui/material/Rating';
import ReactImageZoom from 'react-image-zoom';
import { addItem } from "../api/cartHelper";
import { withRouter } from "react-router-dom";
function ProductMainCard({history,product,category}) {
  const [added , setAdded] = React.useState(false);
    const [count,setCount] = useState(1);
    const images = ["https://media.istockphoto.com/photos/plant-and-fan-for-living-room-decor-picture-id1279718203?b=1&k=20&m=1279718203&s=170667a&w=0&h=KclHT_uCZLGphHsk7B9QtRK1dsVf8tLj-xTXIVoQWno=",
                    "https://m.media-amazon.com/images/I/51QqXY279vL._SL1200_.jpg",
                  "https://media.architecturaldigest.com/photos/602ed4e4b515eae5c54f9803/16:9/w_2560%2Cc_limit/Ceiling-fans.1.gif",
                "https://image.made-in-china.com/2f0j00VRbGSOtsnqck/High-Quality-6-Inch-Table-Stand-Electrical-Mini-Fan.jpg"];
    const [ig, setig] = useState(images[0]);
    const increment=() =>{
        setCount(c => c+1);
    }
    React.useEffect(() => {
      document.getElementById("full").innerHTML=product.description;
    },[product]);
    const decriment = () => {
        if(count>1){
            setCount(c=> c-1);
        }
    }
    const imageSetter = (index) => {
      setig(images[index]);
    }
  return (
    <div className={styles.pContainer}>
      <div style={{flex:1,padding:"20px",flexDirection:"column", justifyContent:"center"}}
      // className={styles.pImage}
      >
      <ReactImageZoom width={400}  zoomPosition={window.innerWidth<900 ? "bottom" :"right"} zoomWidth={200} img={ig} />
        <div className={styles.pimages}>
          <img className={styles.imagesp} onClick={() => imageSetter(0)} src={images[0]} alt="Asdasdsa" />
          <img className={styles.imagesp} onClick={() => imageSetter(1)} src={images[1]} alt="Asdasdsa" />
          <img className={styles.imagesp} onClick={() => imageSetter(2)} src={images[2]} alt="Asdasdsa" />
          <img className={styles.imagesp} onClick={() => imageSetter(3)} src={images[3]} alt="Asdasdsa" />
        </div>
        {/* <img
          src={`https://media.istockphoto.com/photos/plant-and-fan-for-living-room-decor-picture-id1279718203?b=1&k=20&m=1279718203&s=170667a&w=0&h=KclHT_uCZLGphHsk7B9QtRK1dsVf8tLj-xTXIVoQWno=`}
          alt="producti"
        /> */}
      </div>
      <div className={styles.pContent}>
        <div className={styles.pCategory}>Category : {category}</div>
        <div className={styles.pTitle}>{product && product.name}</div>
        <div className={styles.pTitle}><Rating name="read-only" value={8} readOnly/></div>
        <div className={styles.pRates}>
          <div className={styles.pMrp}>₹{product && product.mrp}.00/-</div>
          <div className={styles.pSp}>₹{product && product.price}.00/-</div>
        </div>
        <div className={styles.pStock}>{product && product.qty>0 ? "In Stock":"Out of Stock"}</div>
        <div  className={styles.pDescription}>
        <div id="full">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga minima
          quaerat laborum dignissimos ratione nobis magnam, distinctio rerum at
          minus! Nihil nobis fugiat illum debitis tempore labore fuga a
          perferendis.
          </div>
        </div>
        <div className={styles.pCount}>
            <button className={styles.pBu} onClick={decriment}>-</button>
            <input  className={styles.pCInput} value={count} type="text" disabled />
            <button className={styles.pBu} onClick={increment}>+</button>
        </div>
        <button className={styles.pAdd}
        disabled={added}
        onClick={() => {
          if(product._id){
            addItem(product, () => {
              setAdded(true);
              history.push(history.location.pathname);
            })
          }
        }}>
            {added ? "Added": "Add"} to Cart
        </button>
      </div>
    </div>
  );
}

export default withRouter(ProductMainCard);
