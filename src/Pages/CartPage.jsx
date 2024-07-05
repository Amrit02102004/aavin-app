import { useState, useEffect } from 'react'
import SidebarComponent from '../Components/SideBar'
import CartComponent from '../Components/Cart'
import { db } from '../drizzle';
import { mySchemaCart, mySchemaProducts } from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { getUserIdFromToken } from '../Components/tokenutils';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);
   
    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserIdFromToken();
            setUserId(id);
        };
        fetchUserId();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await db.select({
                cartId: mySchemaCart.product_id,
                productName: mySchemaProducts.product_name,
                image_url: mySchemaProducts.image_url,
                price: mySchemaProducts.price,
                quantity: mySchemaCart.quantity,
                amount: mySchemaCart.amount
            })
            .from(mySchemaCart)
            .innerJoin(mySchemaProducts, eq(mySchemaCart.product_id, mySchemaProducts.id))
            .where(eq(mySchemaCart.user_id, userId));
            console.log("Fetchin Cart");
            setCartItems(items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    
    
    useEffect(() => {
        if(userId) {
            fetchCartItems();
        }
    }, [userId]);

    const handleRemoveFromCart = async (cartId) => {
        try {
            await db.delete(mySchemaCart)
                .where(and(
                    eq(mySchemaCart.product_id, cartId),
                    eq(mySchemaCart.user_id, userId)
                ));
            setCartItems(cartItems.filter(item => item.cartId !== cartId));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const handleUpdateQuantity = async (cartId, newQuantity) => {
        try {
            const product = await db.select()
                .from(mySchemaProducts)
                .where(eq(mySchemaProducts.id, cartId))
                .limit(1);

            if (product.length > 0) {
                const newAmount = parseFloat(product[0].price) * newQuantity;
                await db.update(mySchemaCart)
                    .set({ 
                        quantity: newQuantity, 
                        amount: newAmount.toFixed(2) 
                    })
                    .where(and(
                        eq(mySchemaCart.product_id, cartId),
                        eq(mySchemaCart.user_id, userId)
                    ));

                setCartItems(cartItems.map(item => 
                    item.cartId === cartId 
                        ? {...item, quantity: newQuantity, amount: newAmount.toFixed(2)} 
                        : item
                ));
            }
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