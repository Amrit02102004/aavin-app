import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.css'

const ItemCard = ({ itemName, itemImage, itemPrice, isAddedToCart, quantity: initialQuantity, onAddToCart, onRemoveFromCart }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    const handleAddToCart = () => {
        onAddToCart(quantity);
    };

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    // Calculate total price
    const totalPrice = quantity * itemPrice;

    return (
        <>
            <div className="m-4">
                <div className="card border-0 rounded-0 shadow card-width">
                    <img src={`/images/${itemImage}`} className="card-img-top rounded-0" style={{ height: '200px', width: 'auto', objectFit: 'cover' }}  alt="..." />
                    <div className="card-body mt-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="card-title m-0 p-0">{itemName}</h4>
                            <div className='quantity-container d-flex align-items-center'>
                                {isAddedToCart ? '' : <button onClick={decrementQuantity} className="btn btn-sm btn-outline-secondary">-</button>}
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    className="mx-1 quantity-input" 
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                                    min="1"
                                    defaultValue="1"
                                    readOnly={isAddedToCart ? true : false}
                                />
                                {isAddedToCart ? '' : <button onClick={incrementQuantity} className="btn btn-sm btn-outline-secondary">+</button>}
                                
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex align-items-center text-center g-0 mb-3">
                        <div className="col-4 price-col">
                            <p className="price-text m-0">{formatPrice(totalPrice)}</p>
                        </div>
                        <div className="col-8">
                            <button 
                                className={`btn ${isAddedToCart ? 'btn-danger' : 'btn-primary'} add-to-cart-btn`}
                                onClick={isAddedToCart ? onRemoveFromCart : handleAddToCart}
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
    quantity: PropTypes.number.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired
};

export default ItemCard;