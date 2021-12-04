import React from "react";
import Header from "../components/Header";
import styles from "../assets/css/CategoryPage.module.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
function CategoryPage() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
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
          <div className={styles.sidenavContent}>
            <Link to="/category/electronic-gadgets">Electronic Gadgets</Link>
          </div>
          <div className={styles.sidenavContent}>
            <Link to="/category/handicrafts">HandiCrafts</Link>
          </div>
          <div className={styles.sidenavContent}>
            <Link to="/category/kitchen-appliances">Kitchen Appliances</Link>
          </div>
          <div className={styles.sidenavContent}>
            <Link to="/category/saree">Saree</Link>
          </div>
        </div>
      </div>
      <div className={styles.productCards} >
      <div className="category-section">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default CategoryPage;
