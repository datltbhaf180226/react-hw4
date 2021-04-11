import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import Product from "../Product";
import styles from "./AddProduct.module.scss";

interface Category {
  id: string;
  name: string;
}

function AddProduct() {
  const [category, setCategory] = useState<Category[]>([]);
  const [message, setMessage] = useState<String>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:4000/categories")
        .then((res) => res.data)
        .then((data) => {
          setCategory(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  async function onSubmit(data: Product, e: any) {
    const categoryData = JSON.parse(data.category);
    const category = String(categoryData.name);
    const categoryId = categoryData.id;
    const newProduct = {
      name: data.name,
      category: category,
      price: Number(data.price),
      quantity: Number(data.quantity),
      categoryId: categoryId,
    };
    try {
      await axios.post("http://localhost:4000/products", newProduct);
      console.log(newProduct);
      e.target.reset();
      setMessage("Add product successfully")
      setTimeout(()=> {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <div>
            <span>Product Name</span>
          </div>
          <div>
            <input
              {...register("name", {
                validate: {
                  isRequired: (value) => value.length > 0,
                  maxLength: (value) => value.length < 20,
                },
              })}
            />
          </div>
          {errors.name && errors.name.type === "isRequired" && (
            <p>Please enter the product name</p>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <p>The product name must be less than 20 characters</p>
          )}
        </div>

        <select
          {...register("category", {
            validate: {
              isSelected: (value) => Number(value) !== 0,
            },
          })}
        >
          <option value="">Select category</option>
          {category &&
            category.length > 0 &&
            category.map((item: Category) => (
              <option value={JSON.stringify(item)} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        {errors.category && errors.category.type === "isSelected" && (
          <p>Please select a category</p>
        )}
        <div className={styles.inputWrapper}>
          <div>
            <span>Price</span>
          </div>
          <div>
            <input
              type="string"
              {...register("price", {
                validate: {
                  isNumber: (value) => isNaN(Number(value)) === false,
                  value: (value) => Number(value) > 0,
                },
              })}
            />
            {errors.price && errors.price.type === "isNumber" && (
              <p>The price must be a number</p>
            )}
            {errors.price && errors.price.type === "value" && (
              <p>The price must be greater than zero</p>
            )}
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <div>
            <span>Quantity</span>
          </div>
          <div>
            <input
              type="string"
              {...register("quantity", {
                validate: {
                  isNumber: (value) => isNaN(Number(value)) === false,
                  value: (value) => Number(value) > 0,
                },
              })}
            />
            {errors.quantity && errors.quantity.type === "isNumber" && (
              <p>The quantity must be a number</p>
            )}
            {errors.quantity && errors.quantity.type === "value" && (
              <p>The price must be greater than zero</p>
            )}
          </div>
        </div>

        <button type="submit">Create</button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
}

export default AddProduct;
