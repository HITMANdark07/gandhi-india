import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import { getCart, emptyCart } from "../api/cartHelper";
import { withRouter } from "react-router";
import { getWish } from "../api/wishHelper";
import WishCard from "../components/WishCard";
function Wish({history}) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Header />
      <div style={{ marginTop: "90px", width: "90%", marginLeft:"5%" }}>
        <h2 style={{ textAlign: "center", color: "gray" }}>My WishList</h2>
      </div>
      {getWish().length>0 ? (
          <div className="cartContainer" style={{minHeight:"60vh"}}>
              <div className="cartSection">
            {getWish().map((prod) => (
              <WishCard key={prod._id} prod={prod} />
            ))}
            </div>
        </div>
      ):(
        <div className="cartContainer" style={{minHeight:"60vh"}}>
            <h2 style={{margin:"0 auto"}}>Your Wishlist is Empty</h2>
        </div>
      )}

      <Footer />
    </>
  );
}

export default withRouter(Wish);
