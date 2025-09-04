import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits:integer(),
});

export const sessionsTable = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  sessionId: uuid().notNull().defaultRandom(),
  notes: text(),
  conversation: text(),
  report: text(),
  createdBy: integer().references(() => usersTable.id),
  createdOn: timestamp().defaultNow(),
  selectedDoctor: integer(),
  user: integer().references(() => usersTable.id),
});
