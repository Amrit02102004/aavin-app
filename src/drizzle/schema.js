import { integer, pgTable, serial, varchar, numeric , boolean} from 'drizzle-orm/pg-core';
export const mySchemaUsers = pgTable('users', {
  id: serial('id').primaryKey(),
  full_name: varchar('full_name').notNull(),
  dealership_name: varchar('dealership_name'),
  phone_number: varchar('phone_number').notNull(),
  address: varchar('address').notNull(),
  email: varchar('email').notNull().unique(),
  gstin: varchar('gstin'),
  password: varchar('password').notNull(),
  isAdmin : boolean('isAdmin').default(false)
});

export const mySchemaProducts = pgTable('products', {
  id: serial('id').primaryKey(),
  product_name: varchar('product_name').notNull(),
  image_url: varchar('image_url'),
  price: numeric('price').notNull(),
  available_quantity: integer('available_quantity').notNull(),
});

export const mySchemaOrders = pgTable('orders', {
  order_id: integer('order_id').references(() => mySchemaTransactions.order_id),
  product_id: integer('product_id').references(() => mySchemaProducts.id),
  quantity: integer('quantity').notNull(),
  amount: numeric('amount').notNull(),
});

export const mySchemaTransactions = pgTable('transactions', {
  user_id: integer('user_id').references(() => mySchemaUsers.id),
  order_id: integer('order_id').references(() => mySchemaOrders.order_id),
});

export const mySchemaCart = pgTable('cart', {
  user_id: integer('user_id').references(() => mySchemaUsers.id),
  product_id: integer('product_id').references(() => mySchemaProducts.id),
  quantity: integer('quantity').notNull(),
  amount: numeric('amount').notNull(),
});


