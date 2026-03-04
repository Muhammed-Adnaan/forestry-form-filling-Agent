import 'dotenv/config';
import { Pool } from 'pg';
import { defineConfig } from 'prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';

export default defineConfig({
  schema: 'prisma/postgres.prisma',
  migrations: {
    path: 'prisma/postgres-migrations',
  },
  datasource: {
    url: process.env.POSTGRES_URL,
  },
});
