import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import store from "./Store";
import "./app.scss";
import Footer from "./Component/Footer/Footer";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import ProductDetails from "./Component/productDetails/ProductDetails";
import Products from "./Component/Products/Products";
import Account from "./Component/User/Account";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./Component/UserOptions/UserOptions";

export const accountContext = createContext();
function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  //Login signup control
  const [isAccount, setIsAccount] = useState(true);
  //
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <accountContext.Provider value={setIsAccount}>
      <div className="appContainer">
        <Header setIsAccount={setIsAccount} />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
            </Route>
            <Route>
              <Route
                path="/account"
                element={
                  <Account isAcounnt={isAccount} setIsAccount={setIsAccount} />
                }
              />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
    </accountContext.Provider>
  );
}

export default App;
