import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Path from "../../utils/paths";

import styles from "./Home.module.css";
import banner from "../../assets/banner.png";
import RecentlyAddedProducts from "./RecentlyAddedProducts/RecentlyAddedProducts";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <div className={styles.home}>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Voam Clothing</title>
        <meta name="title" content="Voam Clothing" />
        <meta
          name="description"
          content="Discover the latest trends in fashion at Voam, your ultimate destination for stylish and affordable clothing. From chic dresses to casual essentials, explore our exclusive collection and find your perfect outfit for every occasion. Enjoy fast shipping, easy returns, and exceptional customer service. Shop now and elevate your wardrobe with Voam Clothing!"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://voamclothing.com/" />
        <meta property="og:title" content="Voam Clothing" />
        <meta
          property="og:description"
          content="Discover the latest trends in fashion at Voam, your ultimate destination for stylish and affordable clothing. From chic dresses to casual essentials, explore our exclusive collection and find your perfect outfit for every occasion. Enjoy fast shipping, easy returns, and exceptional customer service. Shop now and elevate your wardrobe with Voam Clothing!"
        />
        <meta
          property="og:image"
          content="https://voamclothing.com/assets/banner.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://voamclothing.com/" />
        <meta property="twitter:title" content="Voam Clothing" />
        <meta
          property="twitter:description"
          content="Discover the latest trends in fashion at Voam, your ultimate destination for stylish and affordable clothing. From chic dresses to casual essentials, explore our exclusive collection and find your perfect outfit for every occasion. Enjoy fast shipping, easy returns, and exceptional customer service. Shop now and elevate your wardrobe with Voam Clothing!"
        />
        <meta
          property="twitter:image"
          content="https://voamclothing.com/assets/banner.png"
        />
      </Helmet>
      {/* <h1 className={styles.title}>Voam Clothing ®</h1>
      <h2 className={styles.slogan}>
        Elevate Your Urban Vibe with Every Stride!
      </h2> */}
      <div className={styles.imageContainer}>
        <Image
          className={styles.banner}
          src={banner}
          fluid
          alt="banner voam"
          width={1050}
          height={600}
        />
      </div>
      <Link to={Path.Items} type="button" className={styles.shopNow}>
        Shop now
      </Link>
      <RecentlyAddedProducts />
    </div>
  );
}

export default Home;
