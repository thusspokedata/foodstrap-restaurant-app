import React from 'react';
import Orders from '../components/Orders';
import { useParams } from 'react-router-dom';

function OrdersPage() {
  const { tableId } = useParams();
  return (
    <>
      <Orders />
    </>
  );
}

export default OrdersPage;
