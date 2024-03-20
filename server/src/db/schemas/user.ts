import {
  index,
  pgSchema,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
export const dbSchema = pgSchema('goal-keeper');

export const dbSchemaUsers = dbSchema.table(
  'users',
  {
    id: serial('id').primaryKey(),
    username: varchar('username').unique().notNull(),
    email: varchar('email').unique().notNull(),
    password: varchar('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    createdAtIndex: index('created_at_idx').on(table.createdAt),
    updatedAtIndex: index('updated_at_idx').on(table.updatedAt),
  }),
);

export type User = typeof dbSchemaUsers.$inferSelect;
export type NewUser = typeof dbSchemaUsers.$inferInsert;
