import { configureStore } from "@reduxjs/toolkit";
import storageItemReducer from "./reducer/storageItem";
import productsListReducer from "./reducer/productsList";
import productsCartReducer from "./reducer/productsCart";
import cartStatusReducer from "./reducer/cartStatus";

export default configureStore({
  reducer: {
    storageItem: storageItemReducer,
    productsList: productsListReducer,
    productsCart: productsCartReducer,
    cartStatus: cartStatusReducer,
  },
});
