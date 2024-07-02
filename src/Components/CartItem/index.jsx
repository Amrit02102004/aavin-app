import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { FaRegTrashAlt } from "react-icons/fa";

const CartItem = ({ productName, price, quantity: initialQuantity, onRemove, onUpdateQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onUpdateQuantity(newQuantity);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onUpdateQuantity(newQuantity);
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(newQuantity);
        onUpdateQuantity(newQuantity);
    };

    return (
        <>
            <div className="cartItem row align-items-center">
                <div className="col-3 mb-2">
                    <img className="w-100" src="https://codingyaar.com/wp-content/uploads/bag-scaled.jpg" alt="product image" />
                </div>
                <div className="col-9 d-flex justify-content-between align-items-center">
                    <h6 className="m-0">{productName}</h6>
                    <div className="d-flex align-items-center">
                        <div className='quantity-container d-flex align-items-center'>
                            <button onClick={decrementQuantity} className="btn btn-sm btn-outline-secondary">-</button>
                            <input type="number" value={quantity} className="mx-1 quantity-input" onChange={handleQuantityChange} min="1" />
                            <button onClick={incrementQuantity} className="btn btn-sm btn-outline-secondary">+</button>
                        </div>
                        <p className="m-0 ms-2">${(price * quantity).toFixed(2)}</p>
                        <FaRegTrashAlt className='text-danger m-3' onClick={onRemove} />
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}

CartItem.propTypes = {
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
};

export default CartItem;