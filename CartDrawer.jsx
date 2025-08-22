import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsArr, selectSubtotal, removeFromCart, setQty, clearCart } from "./cartSlice";

export default function CartDrawer({ open, onClose }) {
  const items = useSelector(selectCartItemsArr);
  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();

  return (
    <div className={`drawer ${open ? "open" : ""}`}>
      <div className="drawer-header">
        <h3>My Cart</h3>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </div>

      <div className="drawer-body">
        {items.length === 0 ? (
          <div className="empty">Your cart is empty.</div>
        ) : (
          items.map((i) => (
            <div className="cart-row" key={i.id}>
              <img className="thumb" src={i.image} alt={i.name} />
              <div className="grow">
                <div className="row-title">{i.name}</div>
                <div className="muted">₹{i.price} each</div>
                <div className="qty">
                  <button onClick={() => dispatch(setQty({ id: i.id, qty: i.qty - 1 }))}>-</button>
                  <input
                    value={i.qty}
                    onChange={(e) =>
                      dispatch(setQty({ id: i.id, qty: Number(e.target.value) || 0 }))
                    }
                  />
                  <button onClick={() => dispatch(setQty({ id: i.id, qty: i.qty + 1 }))}>+</button>
                </div>
              </div>
              <div className="row-total">₹{i.price * i.qty}</div>
              <button className="link danger" onClick={() => dispatch(removeFromCart(i.id))}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="drawer-footer">
        <div className="subtotal">
          <span>Subtotal</span>
          <strong>₹{subtotal}</strong>
        </div>
        <button className="btn ghost" onClick={() => dispatch(clearCart())} disabled={!items.length}>
          Clear Cart
        </button>
        <button className="btn primary" disabled={!items.length} onClick={() => alert("Checkout complete! 🌿")}>
          Checkout
        </button>
      </div>
    </div>
  );
}
