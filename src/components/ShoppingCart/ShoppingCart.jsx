import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/cartContext";
import styles from "./ShoppingCart.module.css";
import { TiShoppingCart } from "react-icons/ti";
import CartItem from "./CartItem.jsx";
import Path from "../../utils/paths.js";
import * as productService from "../../services/productService.js";
import { Helmet } from "react-helmet-async";

export default function ShoppingCart() {
  const [cartData, setCartData] = useState([]);
  const { cart, changeQuantity, removeFromCart } = useCart();

  useEffect(() => {
    async function loadCartData() {
      const products = await Promise.all(
        cart.map(async (item) => {
          const product = await productService.getOne(item.productId);

          if (product.availability === "Out of Stock") {
            // If the product is out of stock, skip it by returning null
            removeFromCart(item.productId, item.size);
            return null;
          }

          return {
            productId: item.productId,
            name: product.name,
            size: item.size,
            price: product.price,
            quantity: item.quantity,
            image: product.images[0]?.filePath || null,
          };
        })
      );

      // Filter out the null values from out-of-stock products
      setCartData(products.filter((product) => product !== null));
    }
    loadCartData();
  }, [cart, removeFromCart]);

  function handleItemDelete(itemId, size) {
    setCartData((currentData) =>
      currentData.filter(
        (item) => item.productId !== itemId || item.size !== size
      )
    );

    removeFromCart(itemId, size);
  }

  function handleQuantityUpdate(
    itemId,
    size,
    newQuantity,
    updatedTotalPriceForItem
  ) {
    setCartData((currentData) => {
      if (!Array.isArray(currentData)) return currentData;
      const updatedCartItems = currentData.map((item) => {
        if (item.productId === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: updatedTotalPriceForItem,
          };
        }
        return item;
      });

      return updatedCartItems;
    });
    changeQuantity(itemId, size, newQuantity);
  }

  return (
    <>
      <Helmet>
        <title>Voam Clothing | Shopping Cart</title>
        <meta
          name="description"
          content="Review the items you've added to your cart and proceed to checkout at Voam Clothing."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Voam Clothing | Shopping Cart" />
        <meta
          property="og:description"
          content="Review the items you've added to your cart and proceed to checkout at Voam Clothing."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://voamclothing.com/shopping-cart"
        />
        <meta
          property="og:image"
          content="https://voamclothing.com/assets/banner.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voam Clothing | Shopping Cart" />
        <meta
          name="twitter:description"
          content="Review the items you've added to your cart and proceed to checkout at Voam Clothing."
        />
        <meta
          name="twitter:image"
          content="https://voamclothing.com/assets/banner.png"
        />
      </Helmet>
      <div className={styles.shoppingCart}>
        <div className={styles.container}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <ul className={styles.productsList}>
            {cartData === undefined ? (
              <p>Loading...</p>
            ) : cartData.length == 0 ? (
              <>
                <TiShoppingCart className={styles.emptyCartIcon} />
                <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
                <p className={styles.emptyCartText}>
                  Looks like you haven't added anything to your cart.{" "}
                  <Link to={Path.Items}> Go ahead & explore. </Link>
                </p>
              </>
            ) : (
              cartData.map((cartItem, index) => (
                <CartItem
                  key={cartItem.productId + cartItem.size}
                  id={cartItem.productId}
                  productId={cartItem.productId}
                  quantity={cartItem.quantity}
                  size={cartItem.size}
                  onDelete={handleItemDelete}
                  hasBorder={
                    index !== cartData.length - 1 && cartData.length > 1
                  }
                  onUpdate={handleQuantityUpdate}
                />
              ))
            )}
          </ul>
          {cartData === undefined ? (
            <p>Loading</p>
          ) : (
            cartData.length != 0 && (
              <Link to={Path.Checkout}>
                <button className={styles.submitButton} type="submit">
                  Proceed to checkout (
                  {cartData
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  lv.)
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}
