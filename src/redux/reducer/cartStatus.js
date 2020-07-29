import { createSlice } from "@reduxjs/toolkit";

export const cartStatusSlice = createSlice({
  name: "cartStatus",
  initialState: {
    value: false,
  },
  reducers: {
    checkCartStatus: (state) => {
      state.value = localStorage.getItem("cart") === null ? false : true;
    },
  },
});

export const { checkCartStatus } = cartStatusSlice.actions;
export const selectCartStatus = (state) => state.cartStatus.value;

export default cartStatusSlice.reducer;
