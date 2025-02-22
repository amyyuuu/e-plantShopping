import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, updateCartCount } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const cartCount = useSelector(state => state.cart.cartCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    dispatch(updateCartCount(totalCount));
  }, [cart, dispatch]);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const unitPrice = parseFloat(item.cost.substring(1));
      return total + (unitPrice * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const calculateTotalCost = (item) => {
    // Extract numeric value from cost string (removing '$' symbol)
    const unitPrice = parseFloat(item.cost.substring(1));
    // Calculate subtotal by multiplying unit price with quantity
    const subtotal = unitPrice * item.quantity;
    return subtotal.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Shopping Cart ({cartCount} items) - Total: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">
                Unit Price: {item.cost}
                <div className="unit-price">(${parseFloat(item.cost.substring(1)).toFixed(2)} each)</div>
              </div>
              <div className="cart-item-quantity">
                Quantity: 
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">
                Item Subtotal: ${calculateTotalCost(item)}
                <div className="subtotal-calculation">
                  (${parseFloat(item.cost.substring(1)).toFixed(2)} × {item.quantity} items)
                </div>
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total-items">Total Items in Cart: {cartCount}</div>
        <div className="total-amount">Cart Total: ${calculateTotalAmount()}</div>
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout ({cartCount} items)
        </button>
      </div>
    </div>
  );
};

export default CartItem;