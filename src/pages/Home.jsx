import React from "react";
import CategoryCard from "../components/CategoryCard";
import Corousal from "../components/Corousal";
import TinySlider from "tiny-slider-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getAllCategories } from "../api/category";

function Home() {
  const [categories, setCategories] = React.useState([]);
  const allCats = React.useCallback(() => {
    getAllCategories().then(data => {
      console.log(data);
      if(data.length>0){
        setCategories(data);
      }
    }) 
  },[]);
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    allCats();
  }, []);
  
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
          {categories.filter(cat => cat.status===10).map((cat) => 
            <CategoryCard key={cat._id} title={cat.categories} />
          )}
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
