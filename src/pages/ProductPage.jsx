import React from 'react'
import { withRouter } from 'react-router'
import { getProductById, getProductsByCategory } from '../api/product'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import ProductMainCard from '../components/ProductMainCard'

function ProductPage({history,match:{params:{productId}}}) {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        getProduct();
      }, [productId]);
    const [category, setCatoegory] = React.useState("");
    const [product, setProduct] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const getProduct = () => {
      getProductById(productId).then(response => {
        if(response){
          setProduct(response);
          setCatoegory(response.categories_id)
          getProducts(response.categories_id);
        }else{
          history.goBack();
        }
      }).catch(() => history.goBack())
    };
    const getProducts = (id) => {
      getProductsByCategory(id).then(response => {
        if(response.length>=0){
          setProducts(response.filter(res => res._id!=productId));
        }else{
          alert("Something Went Wrong");
        }
      }).catch(() => {
        alert("Something Went Wrong");
      })
    }
    return (
        <>
        <Header/>  
        <div style={{marginTop:'80px'}}>
            <ProductMainCard product={product} category={category} />
        </div>
        <div className="categoryTop">
          RELATED PRODUCTS
        </div>
        <div className="category-section">
        {
          products.map((pro) => (
            <ProductCard prod={pro} id={pro._id} title={pro.name} mrp={pro.mrp} price={pro.price} />
          ))
        }
      </div>
      <Footer/>
        </>
    )
}

export default withRouter(ProductPage);
