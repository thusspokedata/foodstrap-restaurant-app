import React, { useContext } from 'react';
// import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from '../context/auth';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
                <Nav.Link href="/scanner">
                  <i className="bi bi-qr-code-scan"></i>
                </Nav.Link>
                <Nav.Link href="/kitchen">Kitchen</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={logoutUser} href="/login">
                  <i className="bi bi-box-arrow-right"></i>
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <div className="justify-content-end">
                <Nav className="me-auto">
                  <i className="bi bi-box-arrow-in-right"></i>
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
