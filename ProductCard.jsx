import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="card-img" />
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        <div className="muted">{product.category}</div>
        <div className="price">₹{product.price}</div>
        <button className="btn" onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
