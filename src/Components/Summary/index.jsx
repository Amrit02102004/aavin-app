// ProceedSection.jsx
import React from 'react';
import './style.css';

const SummaryComponent = () => {
  return (
    <div className="proceed-form p-3">
      <div className="row m-0 justify-content-between">
        <div className="col-sm-8 p-0 text-start">
          <h6>Subtotal</h6>
        </div>
        <div className="col-sm-4 p-0 text-end">
          <p id="subtotal">$132.00</p>
        </div>
      </div>
      <div className="row m-0 justify-content-between">
        <div className="col-sm-8 p-0 text-start">
          <h6>Tax</h6>
        </div>
        <div className="col-sm-4 p-0 text-end">
          <p id="tax">$6.40</p>
        </div>
      </div>
      <hr />
      <div className="row m-0 justify-content-between">
        <div className="col-sm-8 p-0 text-start">
          <h5>Total</h5>
        </div>
        <div className="col-sm-4 p-0 text-end">
          <p id="total">$138.40</p>
        </div>
      </div>
      <div className="text-end">
        <a href="#">
          <button id="btn-checkout" className="shopnow">
            <span>Checkout</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default SummaryComponent;