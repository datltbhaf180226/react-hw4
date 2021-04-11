import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPenSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Product.module.scss";

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: string;
  category: string;
  categoryId: string;
}

function Product() {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:4000/products")
        .then((res) => res.data)
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => console.log(err))
    })();
  }, []);

  return (
    <div className={styles.productWrapper}>
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div>
            <span>Product List</span>
          </div>
          <div className={styles.addProductIcon}>
            <Link to="/product/add">
              <FontAwesomeIcon id="addProd" icon={faPlusSquare} />
              <label htmlFor="addProd">
                <span>Add</span>
              </label>
            </Link>
          </div>
        </div>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.length > 0 &&
              product.map((prod, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{prod.id}</td>
                  <td>
                    <Link to={`/product/${prod.id}`}>{prod.name}</Link>
                  </td>
                  <td>{prod.category}</td>
                  <td>{prod.price}</td>
                  <td>{prod.quantity}</td>
                  <td className={styles.action}>
                    <div>
                      <Link to={`/product/edit/${prod.id}`}>
                        <FontAwesomeIcon icon={faPenSquare} />
                      </Link>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faMinusSquare} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
