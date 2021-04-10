import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Product from "../Product";

function ProductDetail() {
  let { productId } = useParams<any>();
  const [product, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      axios
        .get(`http://localhost:4000/products?id=${productId}`)
        .then((res) => res.data)
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => setError(err));
    })();
  }, []);
  return (
    <div>
      {product &&
        product.length > 0 &&
        product.map((prod, index) => (
          <div key={index}>
            <div>Product Id: {prod.id}</div>
            <div>Name: {prod.name}</div>
            <div>Category: {prod.category}</div>
            <div>Price: {prod.price}</div>
            <div>Quantity: {prod.quantity}</div>
          </div>
        ))}
    </div>
  );
}

export default ProductDetail;
