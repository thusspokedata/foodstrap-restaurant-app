import React, { useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getClient, postOrder } from '../api/api';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function SearchClient(props) {
  console.log(`this is props.result: ${props.result}`);
  const [client, setClient] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { data, error } = useQuery(['client', props.result], () => getClient(props.result), {
    retry: false,
  });
  useEffect(() => {
    if (data) setClient(data);
    if (error) setErrorMessage(error);
  }, [data, error]);

  sessionStorage.setItem('client', client);

  postOrder(client)
    .then((response) => {
      console.log(response.data);
    })
    .catch((errorMessage) => {
      setErrorMessage(errorMessage);
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
