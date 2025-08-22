import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = { items: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload: p }) => {
      const existing = state.items[p.id];
      if (existing) existing.qty += 1;
      else state.items[p.id] = { ...p, qty: 1 };
    },
    removeFromCart: (state, { payload: id }) => {
      delete state.items[id];
    },
    setQty: (state, { payload: { id, qty } }) => {
      if (!state.items[id]) return;
      if (qty <= 0) delete state.items[id];
      else state.items[id].qty = qty;
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, setQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItemsArr = (s) => Object.values(s.cart.items);
export const selectSubtotal = createSelector([selectCartItemsArr], (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
);
export const selectItemCount = createSelector([selectCartItemsArr], (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
);
