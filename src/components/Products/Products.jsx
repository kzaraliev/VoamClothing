import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";

import styles from "./Products.module.css";
import * as productService from "../../services/productService";
import Pagination from "./Pagination.jsx";

import ProductCard from "./ProductCard.jsx";
import SEO from "../SEO/SEO.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  let productsPerPageNumber;

  if (window.innerWidth > 768) {
    productsPerPageNumber = 6;
  } else {
    productsPerPageNumber = 4;
  }

  const [currentPage, setCurrentPage] = useState(1);

  const [productsPerPage] = useState(6);
  const [sortText, setSortText] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getAll()
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastBooks = currentPage * productsPerPage;
  const indexOfFirstBook = indexOfLastBooks - productsPerPage;
  const currentProducts = products.slice(indexOfFirstBook, indexOfLastBooks);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const isLastPage = currentPage === totalPages;
  const isSingleRowOnLastPage =
    isLastPage &&
    (currentProducts.length === 2 || currentProducts.length === 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function selectOrderHandler(eventKey) {
    setProducts(
      [...products].sort((a, b) => {
        if (
          typeof a[eventKey] === "number" &&
          typeof b[eventKey] === "number"
        ) {
          return a[eventKey] - b[eventKey];
        } else if (
          typeof a[eventKey] === "string" &&
          typeof b[eventKey] === "string"
        ) {
          return a[eventKey].localeCompare(b[eventKey]);
        }
      })
    );
    setSortText(eventKey.charAt(0).toUpperCase() + eventKey.slice(1));
  }

  return (
    <>
      <SEO
        title="Voam Clothing | All Items"
        description="Explore a wide range of fashion items on Voam, from stylish dresses to casual essentials. Find your next favorite outfit with our curated collection of trendy clothing."
        type="website"
        imageSrc="https://voamclothing.com/assets/banner.png"
        url="https://voamclothing.com/items"
      />
      <div className={styles.products}>
        <div className={styles.header}>
          <h1 className={styles.title}>All Items:</h1>
          <Dropdown className={styles.dropdown} onSelect={selectOrderHandler}>
            <Dropdown.Toggle className={styles.dropdownButton}>
              {sortText !== "" ? `Order by: ${sortText}` : "Order by"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="name">Name</Dropdown.Item>
              <Dropdown.Item eventKey="price">Price</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {isLoading ? (
          <div className={styles.empty}>
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div
              className={`${styles.grid} ${
                isSingleRowOnLastPage ? styles.centerSingleItem : ""
              }`}
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0].filePath}
                  anchor={product.anchor}
                  className={styles.item}
                />
              ))}
            </div>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </>
  );
}
