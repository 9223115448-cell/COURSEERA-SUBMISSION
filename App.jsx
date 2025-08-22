import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PRODUCTS } from "./features/products/data";
import ProductList from "./features/products/ProductList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import CartDrawer from "./features/cart/CartDrawer";
import { selectItemCount } from "./features/cart/cartSlice";

export default function App() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState(false);
  const count = useSelector(selectItemCount);

  const categories = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.category))),
    []
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesQ =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      const matchesCat = !cat || p.category === cat;
      return matchesQ && matchesCat;
    });
  }, [q, cat]);

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">🌴 Paradise Nursery</div>
        <div className="actions">
          <SearchBar onQueryChange={setQ} />
          <FilterBar categories={categories} value={cat} onChange={setCat} />
          <button className="cart-btn" onClick={() => setOpen(true)}>
            🛒 Cart {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </header>

      <main className="container">
        <ProductList products={filtered} />
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Paradise Nursery. All rights reserved.</small>
      </footer>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
