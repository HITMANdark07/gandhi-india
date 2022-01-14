import React, { useCallback } from 'react'
import { withRouter } from 'react-router'
import { getProductByCategoryId, getProductById } from '../api/product'
import Footer from '../components/Footer'
// import Header from '../components/Header'
import Nav from '../components/Nav'
import ProductCard from '../components/ProductCard'
import ProductMainCard from '../components/ProductMainCard'

function ProductPage({history,match:{params:{productId}}}) {

  const getProducts = useCallback((id) => {
    getProductByCategoryId(id).then(response => {
      if(response.length>=0){
        setProducts(response.filter(res => res._id!==productId));
      }else{
        alert("Something Went Wrong");
      }
    }).catch(() => {
      alert("Something Went Wrong");
    })
  },[productId])

  const getProduct = useCallback(() => {
    getProductById(productId).then(response => {
      if(response){
        setProduct(response);
        setCatoegory(response.category)
        getProducts(response.category._id);
      }else{
        history.goBack();
      }
    }).catch(() => history.goBack())
  },[getProducts,history,productId]);
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        getProduct();
      }, [productId,getProduct]);
    const [category, setCatoegory] = React.useState("");
    const [product, setProduct] = React.useState({});
    const [products, setProducts] = React.useState([]);
    
    return (
        <>
        {/* <Header/>   */}
        <Nav />
        <div className='head'>
            <ProductMainCard product={product} category={category.name} />
        </div>
        <div className="categoryTop">
          RELATED PRODUCTS
        </div>
        <div className="category-section">
        {
          products.map((pro) => (
            <ProductCard key={pro._id} prod={pro} id={pro._id} title={pro.name} mrp={pro.mrp} price={pro.price} />
          ))
        }
      </div>
      <Footer/>
        </>
    )
}

export default withRouter(ProductPage);
