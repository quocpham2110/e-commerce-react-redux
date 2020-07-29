import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, checkOut } from "../redux/reducer/cartSlice";
import {
  selectProductsCart,
  fetchProductsCart,
} from "../redux/reducer/productsCart";

const Cart = (props) => {
  const url = "";
  const cartBox = useRef();
  const dispatch = useDispatch();
  const productsCart = useSelector(selectProductsCart);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsCart());
  }, [dispatch]);
  // Open cart box
  useEffect(() => {
    return props.openCartState
      ? cartBox.current.classList.remove("close")
      : cartBox.current.classList.add("close");
  }, [props.openCartState]);

  // Handle total price
  useEffect(() => {
    let totalArr = [];
    if (productsCart.length === 0) return setTotal("$0");
    else {
      productsCart.forEach((el) => {
        totalArr = [...totalArr, Number(el.price.slice(1)) * el.quantity];
      });
    }
    setTotal("$" + totalArr.reduce((a, b) => a + b, 0).toFixed(2));
  }, [total, productsCart]);

  // Handle close function
  const closeCart = (e) => {
    e.preventDefault();
    cartBox.current.classList.add("close");
    props.closeCart();
  };

  // Handle check out button
  const handleCheckOut = () => {
    document.body.scrollIntoView({ behavior: "smooth" });
    dispatch(checkOut());
    dispatch(fetchProductsCart());
  };

  return (
    <aside className="cart close" ref={cartBox}>
      <div className="cart__inner">
        <div className="cart__top">
          <a href={url} className="cart__close hover" onClick={closeCart}>
            ×
          </a>
          <div className="cart__icon">
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
          </div>
        </div>
        <div className="cart__bot">
          <div className="cart__item">
            <div className="cart__item-header">Item</div>
            <div className="cart__item-header"></div>
            <div className="cart__item-header">Price</div>
            <div className="cart__item-header">Qty</div>
            <div className="cart__item-header">SubTotal</div>
          </div>
          {console.log(productsCart)}
          {productsCart.length === 0 ? (
            <span> There are no items added to Cart!</span>
          ) : (
            productsCart.map((elem) => <CartItem key={elem.id} item={elem} />)
          )}
        </div>
        <div className="cart__total">
          TOTAL:
          <span>{total}</span>
        </div>
        <div className="cart__checkout">
          <button className="btn hover" onClick={handleCheckOut}>
            CHECK OUT
          </button>
        </div>
      </div>
    </aside>
  );
};

const CartItem = (props) => {
  const dispatch = useDispatch();
  const url = "";
  const deleteCartItem = (e) => {
    e.preventDefault();
    dispatch(deleteItem(props.item.id));
    dispatch(fetchProductsCart());
  };

  return (
    <div className="cart__item">
      <img src={props.item.img} className="cart__item-image" alt="cart item" />
      <div className="cart__item-name">{props.item.name}</div>
      <div className="cart__item-price">{props.item.price}</div>
      <div className="cart__item-quantity">×{props.item.quantity}</div>
      <div className="cart__item-price">
        {"$" +
          (Number(props.item.price.slice(1)) * props.item.quantity).toFixed(2)}
      </div>
      <a href={url} className="cart__item-dlt hover" onClick={deleteCartItem}>
        ×
      </a>
    </div>
  );
};

export const CartBtn = (props) => {
  const cartStatusEle = useRef();
  const url = "";
  const openCart = (e) => {
    e.preventDefault();
    document.body.scrollIntoView({ behavior: "smooth" });
    props.openCart();
  };
  useEffect(() => {
    Boolean(props.cartStatus)
      ? cartStatusEle.current.classList.remove("noItem")
      : cartStatusEle.current.classList.add("noItem");
  }, [props.cartStatus]);
  return (
    <a href={url} onClick={openCart} className="cart__icon">
      <i className="fas fa-shopping-cart hover"></i>
      <span ref={cartStatusEle} className="noItem">
        <i className="fas fa-check-circle"></i>
      </span>
    </a>
  );
};

export default Cart;
