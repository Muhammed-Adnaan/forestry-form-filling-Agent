import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/lib/generated/postgres/client';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const adapter = new PrismaPg(pool);

export const postgres = new PrismaClient({ adapter });
