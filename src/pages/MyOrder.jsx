import React from "react";
import Header from "../components/Header";

function MyOrder() {
  return (
    <div>
      <Header />
      <div
        style={{
          minHeight: "60vh",
          marginTop: "100px",
          width: "90%",
          marginLeft: "5%",
        }}
      >
          <h1 style={{textAlign:"center"}}>MY ORDERs PAGE</h1>
      </div>
    </div>
  );
}

export default MyOrder;
