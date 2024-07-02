import React, { useState, useEffect } from 'react'
import ItemCard from '../Components/ItemCard'
import SidebarComponent from '../Components/SideBar'
import { db } from '../drizzle';
import { mySchemaProducts } from '../drizzle/schema';
// import { getAllProducts, addToCart } from '../drizzle/api'

const Productpage = () => {
    const [products, setProducts] = useState([]);
    // const [cartItems, setCartItems] = useState([]);

    const fetchProducts = async () => {
        const res = await db.select().from(mySchemaProducts);
        setProducts(res);
    }

    useEffect(() => {
        fetchProducts();
    }, []);


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
                            // isAddedToCart={cartItems.includes(product.id)}
                            // onAddToCart={(quantity) => handleAddToCart(product.id, quantity)}
                        />
                    ))}
                </div>
            </SidebarComponent>
        </>
    )
}

export default Productpage