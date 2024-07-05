import { useState, useEffect } from 'react'
import Receipt from '../Components/Receipt'
import { db } from '../drizzle';
import { mySchemaCart, mySchemaProducts } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { getUserIdFromToken } from '../Components/tokenutils';

const ReceiptPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchCartItems = async () => {
    if (!userId) return;

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

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserIdFromToken();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  return (
    <div>
      <Receipt items={cartItems} />
    </div>
  )
}

export default ReceiptPage