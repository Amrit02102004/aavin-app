import React, { useState } from 'react'
import './style.css'

const ItemCard = ({ itemName, itemPrice, isAddedToCart }) => {
    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <>
            <div className="m-4">
                <div className="card border-0 rounded-0 shadow card-width">
                    <img src="https://codingyaar.com/wp-content/uploads/bag-scaled.jpg" className="card-img-top rounded-0" alt="..." />
                    <div className="card-body mt-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="card-title m-0 p-0">{itemName}</h4>
                            <div className='quantity-container d-flex align-items-center'>
                                <button onClick={decrementQuantity} className="btn btn-sm btn-outline-secondary">-</button>
                                <input type="number" value={quantity} className="mx-1 quantity-input" onChange={(e) => setQuantity(e.target.value)} />
                                <button onClick={incrementQuantity} className="btn btn-sm btn-outline-secondary">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex align-items-center text-center g-0 mb-3">
                        <div className="col-4 price-col">
                            <p className="price-text m-0">{itemPrice}</p>
                        </div>
                        <div className="col-8">
                            <a href="#" className="btn btn-primary add-to-cart-btn">
                                {isAddedToCart ? "REMOVE" : "ADD TO CART"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemCard;