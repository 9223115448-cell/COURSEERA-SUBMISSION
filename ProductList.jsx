import ProductCard from "./ProductCard";
export default function ProductList({ products }) {
  if (!products.length) return <div className="empty">No plants match your search.</div>;
  return (
    <div className="grid">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
