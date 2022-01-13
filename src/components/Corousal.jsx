import React, { useRef } from "react";
import TinySlider from "tiny-slider-react";
import banner1 from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.jpeg";
import banner3 from "../assets/banner3.jpeg";

function Corousal() {

  const tinyRef = useRef();
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    // height:"inherit",
    display:'flex',
    flexDirection:'row'
  };
  const loadingImage =
    "data:image/gif;base64,R0lGODlhAQABAPAAAMzMzAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
  const imgStyles = {
    width: "100%",
    // borderRadius:'30px',
    height: "400px",
    objectFit: "fill",
  };
  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true,
    loop: true,
    autoplay:true,
    autoplayTimeout:2000,
    items: 1,
    controls:false,
    gutter: 5,
    // responsive: {
    //   420: {
    //     items: 1,
    //   },
    // },
  };
  console.log(tinyRef?.current);

  const imgs = [banner2, banner3, banner1];
  return (
    <div style={styles}>
      <TinySlider ref={tinyRef} settings={settings} >
        {imgs.map((el, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              className={`tns-lazy-img`}
              src={loadingImage}
              data-src={el}
              alt=""
              style={imgStyles}
            />
           </div>
        ))}
      </TinySlider>
      
    </div>
    
  );
}


export default Corousal;
