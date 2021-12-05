import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getCart } from "../api/cartHelper";
import CartCard from "../components/CartCard";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button } from "@mui/material";
import { withRouter } from "react-router";
function Cart({history}) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const total = getCart().reduce((acc, data) => data.count*data.price+acc,0);
  return (
    <>
      <Header />
      <div style={{ marginTop: "90px", width: "90%", marginLeft:"5%" }}>
        <h2 style={{ textAlign: "center", color: "gray" }}>My Cart</h2>
      </div>
      {getCart().length>0 ? (
          <div className="cartContainer" style={{minHeight:"60vh"}}>
          <div className="cartSection">
            {getCart().map((prod) => (
              <CartCard key={prod._id} prod={prod} />
            ))}
          </div>
          <div className="cartSummary">
              <h3>Cart Summary</h3>
            <table className="table">
              <tr className="tr">
                <th className="th">Product</th>
                <th className="th">Price</th>
                <th className="th">Quantity</th>
              </tr>
              {getCart().map((pro) => (
                <tr key={pro._id} className="tr">
                  <td className="td">{pro.name}</td>
                  <td className="td">₹{pro.price}/-</td>
                  <td className="td">{pro.count}</td>
                </tr>
              ))}
              <tr className="tr">
                  <td className="td" colSpan={2}>Total:</td>
                  <td className="td">₹{total}/-</td>
              </tr>
              <tr className="tr">
                  <td style={{textAlign:"right"}} colSpan={3}>
                      <Button color="primary" variant="contained"
                      startIcon={<ShoppingCartCheckoutIcon/>}
                      size="large"
                      fullWidth
                      >PLACE ORDER</Button> 
                  </td>
              </tr>
            </table>
          </div>
        </div>
      ):(
        <div className="cartContainer" style={{minHeight:"60vh"}}>
            <h2 style={{margin:"0 auto"}}>Your Cart is Empty</h2>
        </div>
      )}

      <Footer />
    </>
  );
}

export default withRouter(Cart);
