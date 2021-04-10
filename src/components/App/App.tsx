import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddProduct from "../AddProduct";

import Home from "../Home";
import Product from "../Product/Product";
import "../../assets/styles/global.scss";
import ProductDetail from "../ProductDetail";
import EditProduct from "../EditProduct";

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
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
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
