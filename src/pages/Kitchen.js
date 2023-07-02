import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setOrderList(sessionStorage.getItem('kitchen'));
    axios
      .get('/api/order/kitchen', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  let pedido = [];
  if (orderList.length > 0) {
    const Arr = orderList.split('&&');
    pedido = Arr.map((e) => {
      return <h3>{e}</h3>;
    });
  }

  const order = orders.map((ord) => {
    return <h1>{ord.total}</h1>;
  });

  return (
    <>
      <h2>{pedido}</h2>
      {/* <h2>{orderList}</h2> */}
    </>
  );
}

export default Kitchen;
