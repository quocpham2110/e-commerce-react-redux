import { createSlice } from "@reduxjs/toolkit";

const storageItemSlice = createSlice({
  name: "storageItem",
  initialState: {
    value: JSON.parse(localStorage.getItem("cart")),
  },
  reducers: {
    deleteItem: (state, action) => {
      if (state.value.length === 1) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify(
            [...state.value].filter((el) => el.id !== action.payload)
          )
        );
      }
      state.value = JSON.parse(localStorage.getItem("cart"));
    },
    checkOut: (state) => {
      localStorage.removeItem("cart");
      state.value = null;
    },
    addItem: (state, action) => {
      if (state.value === null) {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ id: action.payload, quantity: 1 }])
        );
      } else {
        // Cart has item(s)
        const cartItems = [...state.value];
        const indexItem = cartItems.findIndex((el) => el.id === action.payload); // Check item available or not
        // Can find => increase 1 more
        if (indexItem !== -1) {
          cartItems[indexItem].quantity = cartItems[indexItem].quantity + 1;
          localStorage.setItem("cart", JSON.stringify(cartItems));
        } // Cannot find => add new
        else
          localStorage.setItem(
            "cart",
            JSON.stringify([...cartItems, { id: action.payload, quantity: 1 }])
          );
      }
      state.value = JSON.parse(localStorage.getItem("cart"));
    },
  },
});
export const { deleteItem, checkOut, addItem } = storageItemSlice.actions;
export const selectstorageItem = (state) => state.storageItem.value;

export default storageItemSlice.reducer;
