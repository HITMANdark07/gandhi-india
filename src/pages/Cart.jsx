import React from 'react'
import Footer from '../components/Footer';
import Header from "../components/Header";

function Cart() {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, [])
    return (
        <>
           <Header/> 
           <div style={{margin:"90px auto", width:'90%', height:"50vh"}}>
               <h2 style={{textAlign:"center", color:"gray" }}>My Cart</h2>
           </div>
           <Footer/>
        </>
    )
}

export default Cart