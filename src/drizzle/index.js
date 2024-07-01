import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"

const sql = neon("postgresql://neondb_owner:OnA7xCLIrzQ4@ep-black-mode-a5ojo0y9.us-east-2.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql, {schema});
