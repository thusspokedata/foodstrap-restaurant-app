import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  return (
    <>
      <Navbar bg="primary" sticky="top" variant="dark">
        <Container>
          <Navbar.Brand href="#">Restaurant App</Navbar.Brand>
          {isLoggedIn ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/tables">Tables</Nav.Link>
                <Nav.Link href="/orders">Orders</Nav.Link>
                <Nav.Link href="/scanner">Scanner</Nav.Link>
                <Nav.Link href="/kitchen">Kitchen</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={logoutUser} href="/login">
                  Log Out
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <div className="justify-content-end">
                <Nav className="me-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              </div>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
