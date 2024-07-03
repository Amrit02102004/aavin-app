// ProceedSection.jsx
import React from 'react';
import './style.css';

const SummaryComponent = ({total}) => {
  const tax = (total * 5 / 100).toFixed(2);

  return (
    <div className="proceed-form p-3">
      <div className="row m-0 justify-content-between">
        <div className="col-sm-8 p-0 text-start">
          <h6>Subtotal</h6>
        </div>
        <div className="col-sm-4 p-0 text-end">
          <p id="subtotal">$ {total}</p>
        </div>
      </div>
      <div className="row m-0 justify-content-between">
        <div className="col-sm-8 p-0 text-start">
          <h6>Tax (5%)</h6>
        </div>
        <div className="col-sm-4 p-0 text-end">
          <p id="tax">$ {tax}</p>
        </div>
      </div>
      <hr />
      <div className="row m-0 justify-content-between">
        <div className="col-sm-8 p-0 text-start">
          <h5>Total</h5>
        </div>
        <div className="col-sm-4 p-0 text-end">
          <p id="total">$ {(parseFloat(total) + parseFloat(tax)).toFixed(2)}</p>
        </div>
      </div>
      <div className="text-end">
        <a href="/receipt">
          <button id="btn-checkout" className="shopnow">
            <span>Checkout</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default SummaryComponent;