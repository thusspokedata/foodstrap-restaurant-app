import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api';
import { AuthContext } from '../../context/auth';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Login = () => {
  // bootstrap
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  // adding login states
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, verifyStoredToken } = useContext(AuthContext);

  /////////////////////////////////////
  //// Dont delete yet ///////////////
  ///////////////////////////////////
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5005/api/company")
  //     .then((response) => {
  //       console.log(response.data);
  //       setRestaurants(response.data);
  //     })
  //     .catch((err) => {
  //       const errorDescription = err.response.data.message;
  //       setErrorMessage(errorDescription);
  //     });
  // }, []);

  // const options = [
  //   ...new Set(restaurants.map((resto) => resto.companyname)),
  // ].map((name) => {
  //   return (
  //     <option value={name} key={name}>
  //       {name}
  //     </option>
  //   );
  // });

  const handleSubmit = (event) => {
    event.preventDefault();

    login(email, password)
      .then((data) => {
        console.log(data);
        const token = data.authToken;
        storeToken(token);
        verifyStoredToken().then(() => {
          navigate('/');
        });
      })
      .catch((errorMessage) => {
        setErrorMessage(errorMessage);
      });

    setPassword('');
    setEmail('');
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <label htmlFor="recipient-name" className="col-form-label mt-2">
                *Email:
              </label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                className="mt-0"
                onChange={handleEmailChange}
                autoFocus
              />
              <label htmlFor="recipient-name" className="col-form-label mt-2">
                *Password:
              </label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                className="mt-0"
                onChange={handlePasswordChange}
                autoFocus
              />
              {/* ///////////////////////////////////////////
              //////// NO BORRAR /////////////////////
              /////////////////////////////////////// */}
              {/* <label className="mt-3" htmlFor="pet-select">
                Please choose the restaurant you work in:
              </label>
              <select
                className="m-2 btn btn-info btn-sm text-white"
                name="role"
                id="role-select"
                onChange={handleRestoChange}
              >
                {options}
              </select> */}
            </Form.Group>
            <Modal.Footer>
              <Button variant="info text-white col-6 mx-auto" type="submit" onClick={handleClose}>
                Login
              </Button>
            </Modal.Footer>
            <label htmlFor="recipient-name" className="col-form-label text-end mt-0 fs-6 fst-italic">
              *Required
            </label>
          </Form>
        </Modal.Body>
      </Modal>
      {errorMessage && <h5>{errorMessage}</h5>}
    </>
  );
};

export default Login;
