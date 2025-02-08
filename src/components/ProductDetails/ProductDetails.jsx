import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import Figure from "react-bootstrap/Figure";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IoArrowUndoCircle } from "react-icons/io5";

import { useCart } from "../../context/cartContext";
import * as productService from "../../services/productService";
import Path from "../../utils/paths";
import styles from "./ProductDetails.module.css";
import { OrderFormKeys } from "../../utils/constants";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const errorMessages = {
    invalidSize: "Select product size",
    notEnoughQuantity: "We don't have that many products",
    zeroOrEmptyInput: "Can't do this",
  };

  useEffect(() => {
    productService
      .getOne(id)
      .then(setProduct)
      .catch((err) => {
        console.log(err);
        navigate(Path.Items);
      });
  }, [id]);

  const submitHandler = () => {
    const selectedSizeId = values.size;
    const selectedSize = product.sizes.find(
      (size) => size.name == selectedSizeId
    );
    if (!selectedSize) {
      setErrors(errorMessages.invalidSize);
      return;
    }

    if (parseInt(values.amount) <= 0 || values.amount == "") {
      setErrors(errorMessages.zeroOrEmptyInput);
      return;
    }
    setErrors("");

    const data = {
      productId: id,
      size: values.size,
      quantity: values.amount,
    };

    addToCart(id, values.size, values.amount);

    Swal.fire({
      timer: 4000,
      title: "Added to Cart!",
      text: "Your item has been successfully added to the shopping cart. Ready to check out or keep shopping?",
      icon: "success",
    });
  };

  const initialValues = useMemo(
    () => ({
      amount: 1,
      size: 0,
    }),
    []
  );

  const { values, onChange, onSubmit } = useForm(
    submitHandler,
    initialValues,
    product
  );

  return (
    <>
      <Helmet>
        <title>Voam Clothing | {product.name || "Product"}</title>
        <meta
          name="description"
          content={product.description || "Description unavailable"}
        />
        <meta property="og:title" content={product.name || "Product"} />
        <meta
          property="og:description"
          content={product.description || "Description unavailable"}
        />
        <meta
          property="og:image"
          content={
            product.images && product.images.length > 0
              ? product.images[0].filePath
              : "../../assets/hoodie_icon.png"
          }
        />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name || "Product"} />
        <meta
          name="twitter:description"
          content={product.description || "Description unavailable"}
        />
        <meta
          name="twitter:image"
          content={
            product.images && product.images.length > 0
              ? product.images[0].filePath
              : "../../assets/hoodie_icon.png"
          }
        />

        <meta
          property="og:url"
          content={`https://voamclothing.com/product/${product.id}`}
        />
        <meta
          property="twitter:url"
          content={`https://voamclothing.com/product/${product.id}`}
        />
      </Helmet>
      <button
        className={styles.backButton}
        onClick={() => navigate(Path.Items)}
      >
        <IoArrowUndoCircle className={styles.backIcon} />
        All Items
      </button>
      <div className={styles.container}>
        <div className={styles.content}>
          <Carousel fade className={styles.carousel} data-bs-theme="dark">
            {Object.keys(product).length !== 0 &&
              product.images.map((image, index) => {
                return (
                  <Carousel.Item key={index}>
                    <Figure.Image
                      alt="product-img"
                      src={image.filePath}
                      className={styles.productImg}
                    />
                  </Carousel.Item>
                );
              })}
          </Carousel>
          <div className={styles.productDetails}>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.productInfo}>
              {product?.anchor && (
                <p className={styles.anchor}>{product?.anchor} lv.</p>
              )}
              <p className={styles.price}>
                <b style={{ color: "#3b3b3b" }}>Price</b>: {product.price} lv.
              </p>
              <p className={styles.description}>
                <b style={{ color: "#3b3b3b" }}>Description</b>:{" "}
                {product.description}
              </p>
              {product.availability === "Out of Stock" ? (
                <p className={styles.outOfStock}>Out of Stock :(</p>
              ) : (
                <Form className={styles.formAddToCart} onSubmit={onSubmit}>
                  {(errors === errorMessages.invalidSize ||
                    errors === errorMessages.notEnoughQuantity ||
                    errors === errorMessages.zeroOrEmptyInput) && (
                    <p className={styles.invalid}>{errors}</p>
                  )}
                  <div className={styles.sizeAndQuantityContainer}>
                    <Form.Select
                      name={OrderFormKeys.Size}
                      onChange={onChange}
                      value={values.size}
                      className={styles.sizeSelector}
                    >
                      <option value="">Select size</option>
                      {Object.keys(product).length !== 0 &&
                        product.sizes.map((size) => {
                          return (
                            <option
                              value={size.name}
                              key={size.name}
                              name={size.name}
                            >
                              {size.name}
                            </option>
                          );
                        })}
                    </Form.Select>
                    <Form.Control
                      type="number"
                      id={OrderFormKeys.Amount}
                      name={OrderFormKeys.Amount}
                      onChange={onChange}
                      value={values.amount}
                      className={styles.amountSelector}
                      aria-label="Amount"
                    />
                  </div>
                  <Button
                    className={styles.submitButton}
                    type="submit"
                    variant="success"
                  >
                    Add to cart
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
