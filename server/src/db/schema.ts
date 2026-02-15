import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const savedContacts = pgTable("saved_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export type SavedContact = typeof savedContacts.$inferSelect;
export type NewSavedContact = typeof savedContacts.$inferInsert;
