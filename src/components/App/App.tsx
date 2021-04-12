import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddProduct from "../AddProduct";

import Home from "../Home";
import Product from "../Product/Product";
import "../../assets/styles/global.scss";
import ProductDetail from "../ProductDetail";
import EditProduct from "../EditProduct";
import { Login } from "../Login/Login";
import { Register } from "../Login/Register";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/product">
            <Product />
          </Route>
          <Route exact path="/product/add">
            <AddProduct />
          </Route>
          <Route exact path="/product/:productId">
            <ProductDetail />
          </Route>
          <Route exact path="/product/edit/:productId">
            <EditProduct />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
