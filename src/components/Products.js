import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addItem } from "../redux/reducer/cartSlice";
import {
  selectProductsList,
  fetchProductsList,
} from "../redux/reducer/productsList";
import { fetchProductsCart } from "../redux/reducer/productsCart";

const Products = (props) => {
  const productsList = useSelector(selectProductsList);
  const [products, setProducts] = useState([]);
  const [select, setSelect] = useState("fea");
  const dispatch = useDispatch();

  // Redender the first loading
  useEffect(() => {
    dispatch(fetchProductsList(""));
  }, [dispatch]);

  // Sort products
  useEffect(() => {
    if (select === "asc") {
      setProducts(() =>
        [...products].sort(
          (a, b) => Number(a.price.slice(1)) - Number(b.price.slice(1))
        )
      );
    }
    if (select === "desc") {
      setProducts(() =>
        [...products].sort(
          (a, b) => Number(b.price.slice(1)) - Number(a.price.slice(1))
        )
      );
    }
    if (select === "fea") {
      setProducts(productsList);
    }
  }, [select, products, productsList]);

  // Handle selecting sort way
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <main className="products">
      <div className="products__sort">
        <span>Sort by</span>
        <select name="products-sort" value={select} onChange={handleSelect}>
          <option value="fea">Featured</option>
          <option value="asc">Price asc.</option>
          <option value="desc">Price desc.</option>
        </select>
      </div>
      <div className="products__wrapper">
        {products.map((el) => (
          <Product key={el.id} item={el} addCart={props.addCart} />
        ))}
      </div>
    </main>
  );
};

const Product = (props) => {
  const url = "";
  const dispatch = useDispatch();
  const handleProduct = (e) => {
    e.preventDefault();
    dispatch(addItem(props.item.id));
    dispatch(fetchProductsCart());
  };
  return (
    <aside className="products__item">
      <div className="products__item-picture">
        <img src={props.item.img} alt="product" />
      </div>
      <div className="products__item-desc">
        <div className="products__item-name">{props.item.name}</div>
        <div className="products__item-price">{props.item.price}</div>
        <div className="products__item-btn">
          <a href={url} className="btn hover" onClick={handleProduct}>
            ADD TO CART
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Products;
