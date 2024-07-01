// migrate.js
const { db } = require('./schema');

// Function to create tables
async function migrate() {
  await db.createTables();
  console.log('Migration completed!');
}

// Run the migration
migrate().catch((err) => {
  console.error('Migration failed:', err);
});
