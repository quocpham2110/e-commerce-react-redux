import { createSlice } from "@reduxjs/toolkit";

export const productsCartSlice = createSlice({
  name: "productsCart",
  initialState: {
    value: [],
  },
  reducers: {
    getProductsCart: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { getProductsCart } = productsCartSlice.actions;

// Async fetch data - redux-thunk
export const fetchProductsCart = () => async (dispatch) => {
  let url = "http://localhost:3000/products?";
  const storage = JSON.parse(localStorage.getItem("cart"));
  console.log(storage);
  if (storage === null) return dispatch(getProductsCart([]));
  else storage.forEach((el) => (url += `id=${el.id}&`));
  console.log("url: ", url);
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
        (el) =>
          (el["quantity"] = storage.filter(
            (elem) => elem.id === el.id
          )[0].quantity)
      );
      dispatch(getProductsCart(data));
    });
};

export const selectProductsCart = (state) => state.productsCart.value;

export default productsCartSlice.reducer;
