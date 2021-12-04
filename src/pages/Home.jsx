import React from "react";
import CategoryCard from "../components/CategoryCard";
import Corousal from "../components/Corousal";
import TinySlider from "tiny-slider-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true,
    loop: true,
    items:2,
    controls: false,
    gutter: 5,
    responsive: {
      420: {
        items: 2,
      },
      760:{
        items:4,
      },
      900:{
        items:6
      }
    },
  };
  return (
    <>
      <div>
        <Header />
        <div style={{ marginTop: "60px" }}>
          <Corousal />
        </div>

        <div className="category-section">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
        <div className="categoryTop">
          FEATURE PRODUCTS
        </div>
        <div
          className="productSlider"
        >
          <TinySlider settings={settings}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </TinySlider>
        </div>
        <div className="categoryTop">
          TOP SAREES
        </div>
        <div className="category-section">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
