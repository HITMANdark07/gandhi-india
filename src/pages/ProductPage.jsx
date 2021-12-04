import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import ProductMainCard from '../components/ProductMainCard'

function ProductPage() {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, [])
    return (
        <>
        <Header/>  
        <div style={{marginTop:'80px'}}>
            <ProductMainCard />
        </div>
        <div className="categoryTop">
          RELATED PRODUCTS
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
      <Footer/>
        </>
    )
}

export default ProductPage
