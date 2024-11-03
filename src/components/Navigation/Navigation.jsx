import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PiShoppingCartDuotone } from "react-icons/pi";

import Path from "../../utils/paths.js";

function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      collapseOnSelect
      className="bg-body-tertiary"
      expand="lg"
      expanded={expanded}
      style={{ border: "1px solid black" }}
    >
      <Container>
        <Navbar.Brand as={Link} to={Path.Home}>
          <img
            src="/assets/logo.png"
            width="180"
            height="60"
            className="d-inline-block align-top"
            alt="Voam logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={Path.Home} onClick={handleNavItemClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={Path.Items} onClick={handleNavItemClick}>
              Items
            </Nav.Link>
            <Nav.Link as={Link} to={Path.About} onClick={handleNavItemClick}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to={Path.Contacts} onClick={handleNavItemClick}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              to={Path.ShoppingCart}
              onClick={handleNavItemClick}
            >
              Shopping Cart
              <PiShoppingCartDuotone />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
