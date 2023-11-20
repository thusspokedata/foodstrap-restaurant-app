import './App.css';
import ProtectedRoute from './components/ProtectedRoutes';
import Header from './components/Header';
// import SearchClient from "./components/SearchClient";
// import QRCustomer from "./components/QRCustomer";
import Login from './components/auth/Login';
import Tables from './components/tables/Tables';
import OrdersPage from './pages/Orders';
import Scanner from './pages/Scanner';
import Kitchen from './pages/Kitchen';
import UserContext from './context/UserContext';

import { Routes, Route } from 'react-router-dom';

function App() {
  const user = {

  };
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute redirectTo="/login">
                <Tables />
              </ProtectedRoute>
            }
          />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders/:tableId" element={<OrdersPage />} />
          <Route path="/kitchen" element={<Kitchen />} />
          {/* <Route path="/qr" element={<QRCustomer />} /> */}
          <Route path="*" element={<h1>404- Not Found </h1>} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
