import React from 'react';
import CartItem from '../CartItem';
import SummaryComponent from '../Summary';
import './style.css';

const CartComponent = ({ items, onRemoveFromCart, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <main id="cart">
      <div className="back">
        <a href="/products">&#11178; shop</a>
      </div>
      <h1 className="text-center">Your Cart</h1>
      <div className="container-fluid">
        <div className="row align-items-start">
          <div className="col-12 col-sm-8 items">
            {items.map(item => (
              <CartItem 
                key={item.cartId}
                {...item}
                onRemove={() => onRemoveFromCart(item.cartId)}
                onUpdateQuantity={(newQuantity) => onUpdateQuantity(item.cartId, newQuantity)}
              />
            ))}
          </div>
          <div className="col-12 col-sm-4">
            <SummaryComponent total={total} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartComponent;