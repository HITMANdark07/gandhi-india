import React, { useCallback, useState } from "react";
import styles from "../assets/css/productPage.module.css";
import Rating from '@mui/material/Rating';
import ReactImageZoom from 'react-image-zoom';
import { addItem } from "../api/cartHelper";
import { withRouter } from "react-router-dom";
import makeToast from "../Toaster";
import { API } from "../config";
function ProductMainCard({history,product,category}) {
  const [added , setAdded] = React.useState(false);
    const [count,setCount] = useState(1);
    const [images,setImages] = useState([]);
    const [ig, setig] = useState('https://promocity.co.ke/wp-content/uploads/2021/03/DummyProductmob.jpg');
    const increment=() =>{
        setCount(c => c+1);
    }
    const populatePhotos = useCallback((product) => {
      if(product.photo){
        product.photo.forEach((p,idx) => {
          if(idx===0){
            setig(`${API}/image/photo/${p}`);
          }
          setImages((prev) => [...prev, `${API}/image/photo/${p}`]);
        })
      }
    },[]);
    React.useEffect(() => {
      document.getElementById("full").innerHTML=product.description;
      setImages([]);
      populatePhotos(product);
    },[product,populatePhotos]);
    const decriment = () => {
        if(count>1){
            setCount(c=> c-1);
        }
    }
    // images = product.photo;
    const imageSetter = (index) => {
      setig(images[index]);
    }
  return (
    <div className={styles.pContainer}>
      <div style={{flex:1,padding:"20px",flexDirection:"column", justifyContent:"center"}}
      // className={styles.pImage}
      >
      <ReactImageZoom width={400} style={{zindex:40}}  zoomPosition={window.innerWidth<900 ? "bottom" :"right"} zoomWidth={200} img={ig} />
        <div className={styles.pimages}>
          {images.map((ig,idx) => (
            <img className={styles.imagesp} key={ig} onClick={() => imageSetter(idx)} src={ig} alt="Asdasdsa" />
          ))}
        </div>
        {/* <img
          src={`https://media.istockphoto.com/photos/plant-and-fan-for-living-room-decor-picture-id1279718203?b=1&k=20&m=1279718203&s=170667a&w=0&h=KclHT_uCZLGphHsk7B9QtRK1dsVf8tLj-xTXIVoQWno=`}
          alt="producti"
        /> */}
      </div>
      <div className={styles.pContent}>
        <div className={styles.pCategory}>Category : {category}</div>
        <div className={styles.pTitle}>{product && product.name}</div>
        <div className={styles.pTitle} style={{zindex:0}}><Rating name="read-only" value={8} readOnly /></div>
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
              makeToast("success",`${product.name} added to Cart`);
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
