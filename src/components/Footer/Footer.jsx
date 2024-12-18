import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import styles from "./Footer.module.css";

function Footer() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <footer className={styles.footer}>
      <PrivacyPolicy show={modalShow} onHide={() => setModalShow(false)} />
      <div className={styles.privacyPolicy} onClick={() => setModalShow(true)}>
        PRIVACY POLICY
      </div>
      <ul className={styles.contacts}>
        <li className={styles.contactElement}>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=voaminfo@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MdEmail className={styles.icon} />
          </a>
        </li>
        <li className={styles.contactElement}>
          <a
            href="https://www.instagram.com/voamclothing_/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className={styles.icon} />
          </a>
        </li>
        <li className={styles.contactElement}>
          <a
            href="https://www.tiktok.com/@voamclothing"
            target="_blank"
            rel="noreferrer"
          >
            <FaTiktok className={styles.icon} />
          </a>
        </li>
      </ul>
      <p className={styles.copyright}>
        Copyright © 2024 Voam Clothing. All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
