import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "./src/drizzle/schema.js",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:OnA7xCLIrzQ4@ep-black-mode-a5ojo0y9.us-east-2.aws.neon.tech/neondb?sslmode=require"
    }
})