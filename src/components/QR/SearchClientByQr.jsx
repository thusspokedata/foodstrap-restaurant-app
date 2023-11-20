import React, { useState, useEffect} from 'react';
import UserContext from '../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getClient} from '../../api/api';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function SearchClientByQr(props) {
  const [client, setClient] = useState([]);
  const { data, error, isLoading } = useQuery(['client', props.result], () => getClient(props.result), {
    retry: false,
  });

  useEffect(() => {
    if (data) setClient(data);
  }, [data, error]);

  return (
    <>
      {isLoading && <Alert variant="info">Loading...</Alert>}
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
            </ListGroup>
            <Card.Link href="/tables">Choose table</Card.Link>
          </Card>
        </Alert>
        <UserContext.Provider value={client}></UserContext.Provider>
      </>
    </>
  );
}

export default SearchClientByQr;
