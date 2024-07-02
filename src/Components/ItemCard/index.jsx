import { useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'

const ItemCard = ({ itemName, itemPrice, isAddedToCart, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    const handleAddToCart = () => {
        onAddToCart(quantity);
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
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    className="mx-1 quantity-input" 
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                                    min="1"
                                />
                                <button onClick={incrementQuantity} className="btn btn-sm btn-outline-secondary">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex align-items-center text-center g-0 mb-3">
                        <div className="col-4 price-col">
                            <p className="price-text m-0">{itemPrice}</p>
                        </div>
                        <div className="col-8">
                            <button 
                                className={`btn ${isAddedToCart ? 'btn-danger' : 'btn-primary'} add-to-cart-btn`}
                                onClick={handleAddToCart}
                            >
                                {isAddedToCart ? "REMOVE FROM CART" : "ADD TO CART"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ItemCard.propTypes = {
    itemName: PropTypes.string.isRequired,
    itemPrice: PropTypes.string.isRequired,
    isAddedToCart: PropTypes.bool.isRequired,
    onAddToCart: PropTypes.func.isRequired
};

export default ItemCard;