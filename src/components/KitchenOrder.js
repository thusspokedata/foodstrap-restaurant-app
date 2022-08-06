import React, { useState, useEffect } from "react";

function KitchenOrder() {
  const [orderToKitchen, setOrderToKitchen] = useState([]);
  function toKitchen(subtotal) {
    setOrderToKitchen(orderToKitchen + subtotal);
  }

  let pedido = [];
  if (orderToKitchen.length > 0) {
    const Arr = orderToKitchen.split("&&");
    pedido = Arr.map((e) => {
      return <h3>{e}</h3>;
    });
  }
  return (
    <>
      <div>
        <h2>
          {pedido}
          <hr></hr>
        </h2>
      </div>
    </>
  );
}

export default KitchenOrder;
