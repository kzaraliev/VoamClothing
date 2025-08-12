import { useEffect, useState } from "react";

import * as productService from "../../../services/productService";
import defaultImg from "../../../assets/hoodie_icon.png";
import styles from "./StepTwo.module.css";
import { formatPrice } from "../../../utils/currencyConverter";

export default function OrderItem({ productId, quantity, size, hasBorder }) {
  const [product, setProduct] = useState();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await productService.getOne(productId);
        if (productData) {
          setProduct(productData);
        } else {
          // Product doesn't exist, set as null to handle in render
          setProduct(null);
        }
      } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
        // Product fetch failed, set as null to handle in render
        setProduct(null);
      }
    }
    fetchProduct();
  }, [productId]);

  const imgSrc = product?.images?.[0] ? product.images[0].filePath : defaultImg;

  return (
    <>
      {product === undefined ? (
        <p>Loading...</p>
      ) : product === null ? (
        <li className={`${styles.cartItem} ${hasBorder ? styles.borderItems : ""}`}>
          <div className={styles.productImgSection}>
            <img
              src={defaultImg}
              alt="Product not found"
              className={styles.imgCartItem}
            />
          </div>
          <div className={styles.productData}>
            <p className={styles.productName}>Продуктът не е наличен</p>
            <p>Size {size}</p>
            <p>Този продукт вече не съществува</p>
            <p>Quantity: {quantity}</p>
          </div>
        </li>
      ) : (
        <li
          className={`${styles.cartItem} ${
            hasBorder ? styles.borderItems : ""
          }`}
        >
          <div className={styles.productImgSection}>
            <img
              src={imgSrc}
              alt="Cart item image"
              className={styles.imgCartItem}
            />
          </div>
          <div className={styles.productData}>
            <p className={styles.productName}>{product.name}</p>
            <p>Size {size}</p>
            <p>Price: {formatPrice(product.price * quantity)}</p>
            <p>Quantity: {quantity}</p>
          </div>
        </li>
      )}
    </>
  );
}
