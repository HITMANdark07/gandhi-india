import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import './App.css';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
// import ManageOrders from "./pages/admin/ManageOrders";
import PrivateRoute from "./auth/PrivateRoute";
import SearchPage from "./pages/SearchPage";
// import ThankYou from "./pages/ThankYou";
import Wish from "./pages/Wish";

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
           <Route path="/signup" exact component={Signup} />
           <PrivateRoute path="/cart" exact component={Cart} />
           <PrivateRoute path="/wishlist" exact component={Wish} />
           {/* <PrivateRoute path="/thank-you" exact component={ThankYou} /> */}
           <Route path="/category/:categoryId" exact component={CategoryPage} />
           <Route path="/search/:searchTerm" exact component={SearchPage} />
           <Route path="/product/:productId" exact component={ProductPage} />
          {/*<Route path="/shop" exact component={Shop} /> */}
          {/* <PrivateRoute path="/user/dashboard" exact component={Dashboard} /> */}
          {/* <Route path="/product/:productId" exact component={Product} />
          <PrivateRoute path="/profile/:userId" exact component={Profile} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
