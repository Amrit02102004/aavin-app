import React, { useState, useEffect } from 'react'
import ItemCard from '../Components/ItemCard'
import SidebarComponent from '../Components/SideBar'
import { getAllProducts, addToCart } from '../drizzle/api'

const Productpage = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getAllProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = async (productId, quantity) => {
        try {
            await addToCart(1, productId, quantity); // Assuming user ID is 1
            setCartItems([...cartItems, productId]);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <>
            <SidebarComponent>
                <div className="text-center">
                    <h1 className='mt-2'>Products page</h1>
                </div>
                <div className='d-flex flex-wrap'>
                    {products.map(product => (
                        <ItemCard 
                            key={product.id}
                            itemName={product.product_name}
                            itemPrice={`$${product.price}`}
                            isAddedToCart={cartItems.includes(product.id)}
                            onAddToCart={(quantity) => handleAddToCart(product.id, quantity)}
                        />
                    ))}
                </div>
            </SidebarComponent>
        </>
    )
}

export default Productpage