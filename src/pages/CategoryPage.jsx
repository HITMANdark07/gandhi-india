import React from "react";
import Header from "../components/Header";
import styles from "../assets/css/CategoryPage.module.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getAllCategories } from "../api/category";
import { getProductsByCategory } from "../api/product";
function CategoryPage({match:{params:{categoryId}}}) {
  const [categories, setCategories] = React.useState([]);
  const [products,setProducts] = React.useState([]);
  const allCats = React.useCallback(() => {
    getAllCategories().then((data) => {
      // console.log(data);
      if (data) {
        setCategories(data);
      } else {
        alert("Something Went Wrong");
      }
    });
  }, []);
  const getProducts = () => {
    getProductsByCategory(categoryId).then(response => {
      if(response.length>=0){
        setProducts(response);
      }else{
        alert("Someting went wrong");
      }
    })
  }
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    allCats();
    getProducts();
  }, [categoryId])
  return (
    <>
      <Header />
      <div className={styles.sidebar}>
        <div className={styles.sidenav}>
            {/* <div className={styles.sidenavTitle}> Best Seller</div>
          <div className={styles.sidenavContent}>
            <Link to="/about">About</Link>
          </div>
          <div className={styles.sidenavContent}>
            <Link to="/services">Services</Link>
          </div>
          <div className={styles.sidenavContent}>
            <Link to="/clients">Clients</Link>
          </div>
          <div className={styles.sidenavContent}>
            <Link to="/contact">Contact</Link>
          </div> 
          <hr/> */}
          <div className={styles.sidenavTitle}>Categories</div>
          {categories.map((cat) => (
            <div className={styles.sidenavContent} key={cat._id}>
            <Link to={`/category/${cat.id}`}>{cat.categories}</Link>
          </div>
          ))}
        </div>
      </div>
      <div className={styles.productCards} style={{minHeight:"80vh"}} >
      <div className="category-section">
          {
            products.map((product) => (
              <ProductCard key={product._id} title={product.name} id={product._id} mrp={product.mrp} price={product.price} prod={product} />
            ))
          }
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default CategoryPage;
