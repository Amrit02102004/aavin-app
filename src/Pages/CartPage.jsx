import React, { useState, useEffect } from 'react'
import SidebarComponent from '../Components/SideBar'
import CartComponent from '../Components/Cart'
import { getCartItems, removeFromCart, updateCartItemQuantity } from '../drizzle/api'

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await getCartItems(1); // Assuming user ID is 1
            setCartItems(items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleRemoveFromCart = async (cartId) => {
        try {
            await removeFromCart(cartId);
            setCartItems(cartItems.filter(item => item.cartId !== cartId));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const handleUpdateQuantity = async (cartId, newQuantity) => {
        try {
            await updateCartItemQuantity(cartId, newQuantity);
            setCartItems(cartItems.map(item => 
                item.cartId === cartId ? {...item, quantity: newQuantity} : item
            ));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <>
            <SidebarComponent>
                <CartComponent 
                    items={cartItems}
                    onRemoveFromCart={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateQuantity}
                />
            </SidebarComponent>
        </>
    )
}

export default CartPage