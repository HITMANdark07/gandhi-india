import { CircularProgress } from "@mui/material";
import React from "react";
import { getOrders } from "../api/order";
import Header from "../components/Header";
import { API } from "../config";

function MyOrder() {

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const gettingOrders = () => {
    getOrders().then(response => {
      setOrders(response);
      setLoading(false);
    }).catch((err) =>{
      console.log(err);
      setLoading(false);
    })
  }
  React.useEffect(() => {
    gettingOrders();
  },[]);
  return (
    <div>
      <Header />
      <div
        style={{
          minHeight: "60vh",
          margin: "100px auto",
        }}
      >
          <h1 style={{textAlign:"center"}}>MY ORDERS</h1>
          {loading && <div style={{textAlign:"center"}}><CircularProgress /></div>}
          {!loading && orders.length===0 && (
            <div style={{textAlign:"center"}}>NO ORDERS YET</div>
          )}
          {orders.map((order) => (
            <div className="ordercard" key={order._id}>
            <div style={{display:"flex",flexDirection:"column"}}>
              <div className="cardelem"><b>ORDER_ID</b>: {order._id}</div>
              <div style={{display:"flex", flexDirection:"row"}}>
                {order.products.map((pro) => (
                  <img key={pro._id} className="cardelem" src={`${API}/image/photo/${pro.photo[0]}`} height={250} width={200} alt="asdas" />
                ))}
              </div>
              <div className="cardelem">
                <b>ORDER STATUS</b>: {order.status.toUpperCase()}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column", justifyContent:"space-evenly"}}>
              <div className="cardelem">{order.address.fullName}</div>
              <div className="cardelem">+91{order.address.phone}</div>
              <div className="cardelem">{order.address.address1+" "+order.address.state+" "+order.address.city}</div>
              <div className="cardelem">Pincode: 700101</div>
              {order.coupon && <div className="cardelem"><b>COUPON APPLIED</b> : {order.coupon.code}</div>}
              {order.coupon && <div className="cardelem"><b>TOTAL DISCOUNT</b>: {order.total_discount}</div>}
              <div className="cardelem"><b>TOTAL AMOUNT</b>: {order.total_amount}</div>
              <div className="cardelem"><b>PAYMENT METHOD</b>: {order.payment_mode}</div>
            </div>
            {/* <div style={{display:"flex",flexDirection:"column", justifyContent:"space-evenly"}}>
              <div>ADDRESS:</div>
              
            </div> */}
          </div>
          ))}
      </div>
    </div>
  );
}

export default MyOrder;
