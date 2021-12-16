import { CircularProgress } from "@mui/material";
import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { getAllProducts } from "../api/product";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

function SearchPage({history,match:{params:{searchTerm}}}) {
    const [products, setProducts] = React.useState([]);
    const getProducts = useCallback(() => {
        getAllProducts().then(data => {
            setProducts(data);
            setLoading(false);
        }).catch(() => {
            history.goBack();
        })
    },[history]);
    const [loading, setLoading] = React.useState(true);
    const filteredProducts = products.filter((pro) => pro.name.toLowerCase().includes(searchTerm.toLowerCase()));
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getProducts();
    },[getProducts]);
    const showLoading = () => 
      loading && (
      <div style={{textAlign:"center", marginTop:"30px"}}>
          <CircularProgress />
      </div>
      );
  return (
    <div>
      <Header />
      <div style={{marginTop:"90px"}} >
        <div className="categoryTop">Search : {searchTerm}</div>
        {loading ? (
            showLoading()
        ):
        (
        <div className="category-section">
          {filteredProducts.length > 0 ? filteredProducts.map((prod) => (
            <ProductCard
              key={prod._id}
              id={prod._id}
              mrp={prod.mrp}
              title={prod.name}
              price={prod.price}
              prod={prod}
            />
          )): (
            <div style={{textAlign:"center", margin:"30px auto", fontSize:"40px"}}>
            No Matches Found
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(SearchPage);
