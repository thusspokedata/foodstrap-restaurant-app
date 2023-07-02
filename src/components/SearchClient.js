import React, { useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

// react bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function SearchClient(props) {
  console.log(`this is props.result: ${props.result}`);
  const [client, setClient] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`/api/auth/${props.result}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        console.log(`this is data: ${data}`);
        setClient(data);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [props.result]);

  sessionStorage.setItem('client', client);

  ///////////// store order on database ////////////////
  const requestBody = {
    client: client._id,
    username: client.username,
    email: client.email,
  };
  console.log(requestBody);
  const storedToken = localStorage.getItem('authToken');
  axios
    .post('/api/order/bill', requestBody, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      const errorDescription = err.response.data.message;
      setErrorMessage(errorDescription);
    });

  return (
    <>
      {client === null ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <Alert key="info" variant="info">
            <Card className="mt-3" style={{ width: '24rem' }}>
              <Card.Header>
                <strong>Username: </strong>
                {client.username}
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Email: </strong>
                  {client.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>ID: </strong>
                  {client._id}
                </ListGroup.Item>
                {/* <ListGroup.Item>Last time in resto: </ListGroup.Item> */}
              </ListGroup>
              <Card.Link href="/orders">make an order</Card.Link>
            </Card>
          </Alert>
          <UserContext.Provider value={client}></UserContext.Provider>
        </>
      )}
    </>
  );
}

export default SearchClient;
