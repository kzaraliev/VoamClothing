import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import Path from "../../utils/paths";
import styles from "./NotFound.module.css";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div>
      <Helmet>
        <title>Voam Clothing | 404 - Page Not Found</title>
        <meta
          name="description"
          content="The page you are looking for might have been removed, its name changed, or it's temporarily unavailable. Return to the home page."
        />
        <meta
          name="keywords"
          content="404, page not found, error page, missing page, website error"
        />
        <meta
          property="og:title"
          content="Voam Clothing | 404 - Page Not Found"
        />
        <meta
          property="og:description"
          content="The page you are looking for might have been removed, its name changed, or it's temporarily unavailable. Return to the home page."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://voamclothing.com/assets/banner.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Voam Clothing | 404 - Page Not Found"
        />
        <meta
          name="twitter:description"
          content="The page you are looking for might have been removed, its name changed, or it's temporarily unavailable. Return to the home page."
        />
        <meta
          name="twitter:image"
          content="https://voamclothing.com/assets/banner.png"
        />
      </Helmet>
      <div id={styles.notfound}>
        <div className={styles.notfound}>
          <div className={styles.notfound_404}>
            <div></div>
            <h1>404</h1>
          </div>
          <h2>Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <Nav.Link as={Link} to={Path.Home}>
            Home page
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}
