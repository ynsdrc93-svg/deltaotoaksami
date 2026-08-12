import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactSubmissionsTable = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  ad: text("ad").notNull(),
  firma: text("firma"),
  telefon: text("telefon"),
  email: text("email").notNull(),
  konu: text("konu"),
  mesaj: text("mesaj").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissionsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;
