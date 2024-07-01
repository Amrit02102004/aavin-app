// api.js
import { db, mySchemaProducts, mySchemaCart } from './schema';
import { eq } from 'drizzle-orm';

export async function getAllProducts() {
  try {
    const products = await db.select().from(mySchemaProducts);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function addToCart(userId, productId, quantity) {
  try {
    const product = await db
      .select({ price: mySchemaProducts.price })
      .from(mySchemaProducts)
      .where(eq(mySchemaProducts.id, productId))
      .limit(1);

    if (product.length === 0) {
      throw new Error('Product not found');
    }

    const amount = product[0].price * quantity;

    await db.insert(mySchemaCart).values({
      user_id: userId,
      product_id: productId,
      quantity: quantity,
      amount: amount
    });

    return { message: 'Added to cart successfully' };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Failed to add to cart');
  }
}

export async function getCartItems(userId) {
  try {
    const cartItems = await db
      .select({
        cartId: mySchemaCart.id,
        productId: mySchemaProducts.id,
        productName: mySchemaProducts.product_name,
        quantity: mySchemaCart.quantity,
        price: mySchemaProducts.price,
        amount: mySchemaCart.amount
      })
      .from(mySchemaCart)
      .leftJoin(mySchemaProducts, eq(mySchemaCart.product_id, mySchemaProducts.id))
      .where(eq(mySchemaCart.user_id, userId));

    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw new Error('Failed to fetch cart items');
  }
}

export async function removeFromCart(cartId) {
  try {
    await db.delete(mySchemaCart).where(eq(mySchemaCart.id, cartId));
    return { message: 'Removed from cart successfully' };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw new Error('Failed to remove from cart');
  }
}

export async function updateCartItemQuantity(cartId, quantity) {
  try {
    await db.update(mySchemaCart)
      .set({ quantity: quantity })
      .where(eq(mySchemaCart.id, cartId));
    return { message: 'Updated cart item quantity successfully' };
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw new Error('Failed to update cart item quantity');
  }
}