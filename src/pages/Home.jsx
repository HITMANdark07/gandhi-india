import React from "react";
import CategoryCard from "../components/CategoryCard";
import Corousal from "../components/Corousal";
import TinySlider from "tiny-slider-react";
// import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FeatureProduct from "../components/FeatureProduct";
import Footer from "../components/Footer";
import { getAllCategories } from "../api/category";
import Nav from '../components/Nav';
import container from '../assets/Container.png';
import { getFeatureProducts, getProductByCategoryId } from "../api/product";

function Home() {
  const [categories, setCategories] = React.useState([]);
  const [featureProducts, setFeatureProducts]=React.useState([]);
  const [products,setProducts] =React.useState([]);
  const allCats = React.useCallback(() => {
    getAllCategories().then(data => {
      if(data.length>0){
        setCategories(data);
        getProdsByCategories(data);
      }
    }) 
  },[]);
  const getProdsByCategories = (data) =>{
    data.forEach((d)=> {
      getProductByCategoryId(d._id).then(res => {
        const s ={
          category:d.name,
          prods:res
        };
        if(s.prods.length>0){
          setProducts(prev => [...prev,{...s}]);
        }
      })
    })
  }
  // const getProds =(id) => {
  //   getFeatureProducts(`?category=${id}?limit=5`).then(res => {
  //     return res;
  //   })
  // }
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    allCats();
    getFPro();
  }, [allCats]);
  const getFPro =() => {
    getFeatureProducts().then(response => {
      if(response){
        setFeatureProducts(response);
      }
    }).catch(() => {
      alert("Something Went Wrong");
    })
  }
  
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
        {/* <Header /> */}
        <Nav />
        <div className="head">
          <Corousal />
        </div>

        <div className="category-section">
          {categories.map((cat) => 
            <CategoryCard key={cat._id} id={cat._id} slug={cat.slug} title={cat.name} />
          )}
        </div>
        <div className="categoryTop">
          FEATURE PRODUCTS
        </div>
        <div
          className="productSlider"
          style={{backgroundImage: "url(" + container + ")", backgroundRepeat:'no-repeat',backgroundSize:'cover'}}
        >
          <TinySlider settings={settings} >
            {
              featureProducts.map((pro) => (
                <FeatureProduct key={pro._id} title={pro.name} id={pro._id} mrp={pro.mrp} price={pro.price} prod={pro}  />
              ))
            }
          </TinySlider>
        </div>
        {products.map((pro,i) => (
          <div className="shadow-container" key={i}>
          <div className="categoryTop">
            TOP {pro.category.toUpperCase()}
          </div>
          <div className="category-section">
          {
            pro.prods.map((prod) => (
              <ProductCard key={prod._id} id={prod._id} mrp={prod.mrp} title={prod.name} price={prod.price} prod={prod} />
            ))
          }
        </div>
        </div>
        ))}
      </div>
      <Footer/>
    </>
  );
}

export default Home;
