import { useState, useEffect } from 'react'
import ItemCard from '../Components/ItemCard'
import SidebarComponent from '../Components/SideBar'
import { db } from '../drizzle';
import { mySchemaProducts, mySchemaCart } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const Productpage = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const userId = 1; // Assuming user ID is 1

    const fetchProducts = async () => {
        const res = await db.select().from(mySchemaProducts);
        setProducts(res);
    }

    const fetchCartItems = async () => {
        const res = await db.select().from(mySchemaCart).where(eq(mySchemaCart.user_id, userId));
        setCartItems(res.map(item => item.product_id));
    }

    useEffect(() => {
        fetchProducts();
        fetchCartItems();
    }, []);

    const handleAddToCart = async (productId, quantity) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const amount = parseFloat(product.price) * quantity;

        try {
            if (cartItems.includes(productId)) {
                // Update existing cart item
                await db.update(mySchemaCart)
                    .set({ 
                        quantity: quantity, 
                        amount: amount.toFixed(2) 
                    })
                    .where(
                        eq(mySchemaCart.user_id, userId),
                        eq(mySchemaCart.product_id, productId)
                    );
            } else {
                // Add new cart item
                await db.insert(mySchemaCart).values({
                    user_id: userId,
                    product_id: productId,
                    quantity: quantity,
                    amount: amount.toFixed(2)
                });
            }
            await fetchCartItems(); // Refresh cart items
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

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