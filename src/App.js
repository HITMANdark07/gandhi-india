import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import './App.css';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ManageOrders from "./pages/admin/ManageOrders";
import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute"
import ManageCategories from "./pages/admin/ManageCategories";
import ManageSpecifications from "./pages/admin/ManageSpecifications";
import AllProducts from "./pages/admin/AllProducts";
import AddProduct from "./pages/admin/AddProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import UpdateCategory from "./pages/admin/UpdateCategory";

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
           <Route path="/signup" exact component={Signup} />
           <PrivateRoute path="/cart" exact component={Cart} />
           <PrivateRoute path="/wishlist" exact component={Wishlist} />
           <Route path="/category/:categoryName" exact component={CategoryPage} />
           <Route path="/product/:productId" exact component={ProductPage} />
          {/*<Route path="/shop" exact component={Shop} /> */}
          {/* <PrivateRoute path="/user/dashboard" exact component={Dashboard} /> */}
          <AdminRoute path="/admin/orders" exact component={ManageOrders} /> 
          <AdminRoute path="/admin/manage-categories" exact component={ManageCategories} />
          <AdminRoute path="/admin/manage-specification" exact component={ManageSpecifications} /> 
          <AdminRoute path="/admin/manage-products" exact component={AllProducts} />
          <AdminRoute path="/admin/add-products" exact component={AddProduct} />
          <AdminRoute path="/admin/update-product/:productId" exact component={UpdateProduct} />
          <AdminRoute path="/admin/update-category/:categoryId" exact component={UpdateCategory} />
          {/* <Route path="/product/:productId" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
          <AdminRoute path="/admin/orders" exact component={Orders} />
          <PrivateRoute path="/profile/:userId" exact component={Profile} />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
