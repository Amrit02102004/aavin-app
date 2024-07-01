const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/neon-http');
const { integer, pgTable, serial, varchar, numeric } = require('drizzle-orm/pg-core');

// db.js
require('dotenv').config();

// Configure your Neon database connection
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:OnA7xCLIrzQ4@ep-black-mode-a5ojo0y9.us-east-2.aws.neon.tech/neondb?sslmode=require"
});

// Initialize the database
const db = drizzle(pool);

// Define the schema
const mySchemaUsers = pgTable('users', {
  id: serial('id').primaryKey(),
  full_name: varchar('full_name').notNull(),
  dealership_name: varchar('dealership_name'),
  phone_number: varchar('phone_number').notNull(),
  address: varchar('address').notNull(),
  email: varchar('email').notNull().unique(),
  gstin: varchar('gstin'),
  password: varchar('password').notNull(),
});

const mySchemaProducts = pgTable('products', {
  id: serial('id').primaryKey(),
  product_name: varchar('product_name').notNull(),
  price: numeric('price').notNull(),
  available_quantity: integer('available_quantity').notNull(),
});

const mySchemaOrders = pgTable('orders', {
  order_id: integer('order_id').references(() => mySchemaTransactions.order_id),
  product_id: integer('product_id').references(() => mySchemaProducts.id),
  quantity: integer('quantity').notNull(),
  amount: numeric('amount').notNull(),
});

const mySchemaTransactions = pgTable('transactions', {
  user_id: integer('user_id').references(() => mySchemaUsers.id),
  order_id: integer('order_id').references(() => mySchemaOrders.order_id),
});

const mySchemaCart = pgTable('cart', {
  user_id: integer('user_id').references(() => mySchemaUsers.id),
  product_id: integer('product_id').references(() => mySchemaProducts.id),
  quantity: integer('quantity').notNull(),
  amount: numeric('amount').notNull(),
});

// Export the schema
module.exports = {
  db,
  mySchemaUsers,
  mySchemaProducts,
  mySchemaOrders,
  mySchemaTransactions,
  mySchemaCart,
};
