import React from "react";
import CategoryCard from "../components/CategoryCard";
import Corousal from "../components/Corousal";
import TinySlider from "tiny-slider-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getAllCategories } from "../api/category";
import { getFeatureProducts } from "../api/product";

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
      getFeatureProducts(`?category=${d.id}`).then(res => {
        const s ={
          category:d.categories,
          prods:res
        };
        console.log(s);
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
  console.log(products);
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    allCats();
    getFPro();
  }, []);
  const getFPro =() => {
    getFeatureProducts("?limit=true").then(response => {
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
        <Header />
        <div style={{ marginTop: "60px" }}>
          <Corousal />
        </div>

        <div className="category-section">
          {categories.filter(cat => cat.status===10).map((cat) => 
            <CategoryCard key={cat._id} id={cat.id} title={cat.categories} />
          )}
        </div>
        <div className="categoryTop">
          FEATURE PRODUCTS
        </div>
        <div
          className="productSlider"
        >
          <TinySlider settings={settings}>
            {
              featureProducts.map((pro) => (
                <ProductCard key={pro._id} title={pro.name} id={pro._id} mrp={pro.mrp} price={pro.price} prod={pro}  />
              ))
            }
          </TinySlider>
        </div>
        {products.map((pro,i) => (
          <React.Fragment key={i}>
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
        </React.Fragment>
        ))}
      </div>
      <Footer/>
    </>
  );
}

export default Home;
