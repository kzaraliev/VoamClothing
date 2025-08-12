import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FaTshirt } from "react-icons/fa";

import styles from "./Products.module.css";
import Path from "../../utils/paths";
import { formatPrice } from "../../utils/currencyConverter";

export default function ProductCard({ id, name, price, image, anchor }) {
  return (
    <Link to={`${Path.Items}/${id}`} className={styles.cardLink}>
      <Card className={styles.cardBackground}>
        <Card.Img
          variant="top"
          src={image}
          className={styles.cardImg}
          alt="card image"
        />
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{name}</Card.Title>
          {anchor && <span className={styles.anchor}>{formatPrice(anchor)}</span>}
          <Card.Text className={styles.price}>Price: {formatPrice(price)}</Card.Text> 
        </Card.Body>
      </Card>
    </Link>
  );
}
