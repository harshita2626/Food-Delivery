import React, { useContext } from 'react';
import './Cart.css';
import { Context } from '../../../Context/Context';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalcartAmount } = useContext(Context);

  // Check if food_list or cartItems is undefined or empty
  if (!food_list || !cartItems) {
    return <div>Loading...</div>; // Or display a message like "Your cart is empty"
  }

  return (
    <div>
      <div className='cart'>
        <div className='cart-items'>
          <div className='cart-items-title'>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          // Check if the item exists in the cart and has a quantity greater than 0
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}> {/* Add a unique key for each item */}
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Return null for items not in the cart
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <b>${getTotalcartAmount() + 2}</b>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;