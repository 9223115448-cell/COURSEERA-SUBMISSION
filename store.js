import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

const PERSIST_KEY = "paradise_nursery_cart_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    return raw ? { cart: JSON.parse(raw) } : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(store.getState().cart));
  } catch {}
});
