import { createSlice } from "@reduxjs/toolkit";

export const productsListSlice = createSlice({
  name: "productsList",
  initialState: {
    value: [],
  },
  reducers: {
    getProductsList: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { getProductsList } = productsListSlice.actions;

export const fetchProductsList = (type) => async (dispatch) => {
  const url =
    type === "" ? "?highlight=true" : `?type=${encodeURIComponent(type)}`;
  if (type === "") {
    document.querySelector(".sidebar__clear").classList.add("hide");
    [...document.querySelectorAll(".sidebar__link")].map((el) =>
      el.classList.remove("active")
    );
  } else {
    document.querySelector(".sidebar__clear").classList.remove("hide");
    [...document.querySelectorAll(".sidebar__link")].map((el) => {
      el.classList.remove("active");
      return el.querySelector("span").innerText.replace(/&amp;/g, "&") === type
        ? el.classList.add("active")
        : null;
    });
  }
  await fetch("http://localhost:3000/products" + url)
    .then((res) => res.json())
    .then((data) => dispatch(getProductsList(data)));
};

export const selectProductsList = (state) => state.productsList.value;

export default productsListSlice.reducer;
