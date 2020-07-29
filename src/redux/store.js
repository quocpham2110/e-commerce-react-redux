import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartSlice";
import productsListReducer from "./reducer/productsList";
import productsCartReducer from "./reducer/productsCart";

export default configureStore({
  reducer: {
    cart: cartReducer,
    productsList: productsListReducer,
    productsCart: productsCartReducer,
  },
});
