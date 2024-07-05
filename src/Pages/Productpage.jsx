import { useState, useEffect } from 'react'
import ItemCard from '../Components/ItemCard'
import SidebarComponent from '../Components/SideBar'
import { db } from '../drizzle';
import { mySchemaProducts, mySchemaCart } from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { getUserIdFromToken } from '../Components/tokenutils';

const Productpage = () => {
    const fetchUserId = async () => {
        const id = await getUserIdFromToken();
        setUserId(id);
      };
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(fetchUserId());

    const fetchProducts = async () => {
        const res = await db.select().from(mySchemaProducts);
        setProducts(res);
    }
    const fetchCartItems = async () => {
        
        const res = await db.select().from(mySchemaCart).where(eq(mySchemaCart.user_id, userId));
        console.log(res);
        setCartItems(res);
    }
    
    useEffect(() => {
        fetchProducts();
        fetchCartItems();
    }, [userId]);

    const handleAddToCart = async (productId, quantity) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const amount = parseFloat(product.price) * quantity;

        try {
            const existingCartItem = cartItems.find(item => item.product_id === productId);
            if (existingCartItem) {
                // Update existing cart item
                await db.update(mySchemaCart)
                    .set({ 
                        quantity: quantity, 
                        amount: amount.toFixed(2) 
                    })
                    .where(and(
                        eq(mySchemaCart.user_id, userId),
                        eq(mySchemaCart.product_id, productId)
                    ));
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

    const handleRemoveFromCart = async (productId) => {
        try {
            await db.delete(mySchemaCart)
                .where(and(
                    eq(mySchemaCart.user_id, userId),
                    eq(mySchemaCart.product_id, productId)
                ));
            setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return (
        <>
            <SidebarComponent>
                <div className="text-center">
                    <h1 className='mt-2'>Products page</h1>
                </div>
                <div className='d-flex flex-wrap'>
                    {products.map(product => {
                        const cartItem = cartItems.find(item => item.product_id === product.id);
                        return (
                            <ItemCard 
                                key={product.id}
                                itemName={product.product_name}
                                itemImage={product.image_url}
                                itemPrice={parseFloat(product.price)}
                                isAddedToCart={!!cartItem}
                                quantity={cartItem ? cartItem.quantity : 1}
                                onAddToCart={(quantity) => handleAddToCart(product.id, quantity)}
                                onRemoveFromCart={() => handleRemoveFromCart(product.id)}
                            />
                        );
                    })}
                </div>
            </SidebarComponent>
        </>
    )
}

export default Productpage