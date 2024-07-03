import { useState, useEffect } from 'react'
import React from 'react'
import Receipt from '../Components/Receipt'
import { db } from '../drizzle';
import { mySchemaCart, mySchemaProducts } from '../drizzle/schema';
import { eq } from 'drizzle-orm';


const ReceiptPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Assuming user ID is 1

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
      try {
        const items = await db.select({
            cartId: mySchemaCart.product_id,
            productName: mySchemaProducts.product_name,
            price: mySchemaProducts.price,
            quantity: mySchemaCart.quantity,
            amount: mySchemaCart.amount
        })
        .from(mySchemaCart)
        .innerJoin(mySchemaProducts, eq(mySchemaCart.product_id, mySchemaProducts.id))
        .where(eq(mySchemaCart.user_id, userId));

        setCartItems(items);
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
  };

  return (
    <div>
      <Receipt items={cartItems} />
    </div>
  )
}

export default ReceiptPage
