import React from "react";
import { useState, useEffect } from "react";
import "./css/reset.css";
import "./css/style.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import Cart from "./components/Cart";

const App = () => {
  const [type, setType] = useState([]);
  const [cartStatus, setCartStatus] = useState(0);
  const [openCartState, setOpenCartState] = useState(false);

  // Define category of Sidebar
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        const typeSetObj = new Set();
        data.map((el) => typeSetObj.add(el.type));
        setType([...typeSetObj]);
      });
  }, []);

  // Set status of cart => close cart
  const openCart = () => {
    setOpenCartState(true);
  };
  // Set status of cart => close cart
  const closeCart = () => {
    setOpenCartState(false);
  };

  return (
    <div className="app">
      <Header cartStatus={cartStatus} openCart={openCart} />
      <Sidebar type={type} />
      <Products />
      <Cart
        openCartState={openCartState}
        closeCart={closeCart}
        cartStatus={cartStatus}
      />
    </div>
  );
};

export default App;
