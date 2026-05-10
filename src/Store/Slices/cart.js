import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
