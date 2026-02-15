import { desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../../db/client.js";
import { savedContacts } from "../../db/schema.js";
import type { CreateContactInput, ListContactsQuery } from "./contact.schema.js";

export class ContactRepository {
  async list({ search, page, pageSize }: ListContactsQuery) {
    const whereClause = search
      ? or(
          ilike(savedContacts.name, `%${search}%`),
          ilike(savedContacts.company, `%${search}%`),
        )
      : undefined;

    const [countRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(savedContacts)
      .where(whereClause);

    const items = await db
      .select()
      .from(savedContacts)
      .where(whereClause)
      .orderBy(desc(savedContacts.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const total = Number(countRow?.count ?? 0);

    return {
      items,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    };
  }

  async create(input: CreateContactInput) {
    const [contact] = await db.insert(savedContacts).values(input).returning();
    return contact;
  }

  async deleteById(id: number) {
    const [deleted] = await db
      .delete(savedContacts)
      .where(eq(savedContacts.id, id))
      .returning({ id: savedContacts.id });

    return deleted ?? null;
  }
}
