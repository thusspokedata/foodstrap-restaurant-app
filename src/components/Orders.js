import React, { useState, useEffect, useContext } from 'react';
import { getProducts } from '../api/api';
import UserContext from '../context/UserContext';
import Table from 'react-bootstrap/Table';
import MenuItem from './MenuItem';
import useStore from '../context/store';

function Orders() {
  const [menus, setMenus] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [orderToKitchen, setOrderToKitchen] = useState([]);
  const [totalToBill, setTotaltoBill] = useState(0);
  const [client, setClient] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { setTables, tables } = useStore(); // importa también 'tables' desde tu store
  // el resto de tu código...

  useEffect(() => {
    setClient(sessionStorage.getItem('client'));

    getProducts()
      .then((data) => {
        console.log(data);
        setMenus(data);
      })
      .catch((errorMessage) => {
        setErrorMessage(errorMessage);
      });
  }, []);

  function calcFinalPrice(subtotal) {
    setFinalPrice(finalPrice + subtotal);
  }

  ///////////////////////////////////////////////////
  ///////////////// KITCHEN ////////////////////////
  //////////////////////////////////////////////////
  function toKitchen(subtotal) {
    setOrderToKitchen(orderToKitchen + subtotal);
    sessionStorage.setItem('kitchen', orderToKitchen + subtotal);
  }

  const optionsDrinks = menus.map((item, i) => {
    if (item.category === 'drink') {
      return <MenuItem calcFinalPrice={calcFinalPrice} toKitchen={toKitchen} item={item} />;
    }
  });

  const optionsDessert = menus.map((item, i) => {
    if (item.category === 'dessert') {
      return <MenuItem calcFinalPrice={calcFinalPrice} toKitchen={toKitchen} item={item} />;
    }
  });

  const optionsMeat = menus.map((item, i) => {
    if (item.category === 'dish') {
      return <MenuItem calcFinalPrice={calcFinalPrice} toKitchen={toKitchen} item={item} />;
    }
  });

  let pedido = [];
  if (orderToKitchen.length > 0) {
    const Arr = orderToKitchen.split('&&');
    pedido = Arr.map((e) => {
      return <h3>{e}</h3>;
    });
  }

  // sessionStorage.setItem("kitchen", pedido);
  ///// not working ////////////
  const user = useContext(UserContext);
  console.log(useContext(UserContext));

  console.log(totalToBill);

  const handleTotaltoBillChange = (e) => setTotaltoBill(e.target.value);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        {/* <UserContext.Provider value={user}>
          <QrScanner />
        </UserContext.Provider> */}
        {/* <h2>{client}</h2> */}
      </div>
      <div className="container col-12 col-sm-7 col-lg-8">
        <form name="tblform">
          <Table striped responsive size="sm">
            <thead>
              <tr>
                <th className="">Menu </th>
                <th className="text-end">Quantity</th>
                <th className="">Price</th>
              </tr>
            </thead>
          </Table>
          <Table striped responsive size="sm">
            <tbody>
              <tr>{optionsMeat}</tr>
            </tbody>
          </Table>
          <Table striped responsive variant="dark" size="sm">
            <tbody>
              <tr>{optionsDrinks}</tr>
            </tbody>
          </Table>
          <Table striped responsive size="sm">
            <tbody>
              <tr>{optionsDessert}</tr>
            </tbody>
          </Table>
          <Table striped responsive size="sm">
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Send Bill"
                    // onclick={createBill}
                  />
                </td>
                <td className="text-end">
                  <input
                    type="text"
                    className="btn fw-bold"
                    onChange={handleTotaltoBillChange}
                    value={`Total: $${finalPrice.toFixed(2)}`}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      </div>
    </>
  );
}

export default Orders;
