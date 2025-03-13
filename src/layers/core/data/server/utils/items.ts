import type { H3Event } from 'h3'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'

import * as schema from '@demo/data/server/db/schema/items'

export { sql, eq, and, or } from 'drizzle-orm'

export const tableItems = schema.items

export type Item = typeof schema.items.$inferSelect

export function useItemsDatabase() {
  return drizzle(hubDatabase(), { schema })
}

export function useItemsRepository<T extends Item>(
  _event?: H3Event,
) {
  async function select() {
    try {
      return await useItemsDatabase()
        .select()
        .from(tableItems)
        .all()
    } catch (exception: any) {
      throw createError(exception)
    }
  }

  async function insert(item: Omit<T, 'id'>) {
    return await useItemsDatabase()
      .insert(tableItems)
      .values(item)
      .returning()
      .get() as T
  }

  async function deleteAll() {
    return await useItemsDatabase()
      .delete(tableItems)
      .returning({
        id: tableItems.id,
      })
  }

  async function deleteById(id: string | number) {
    return await useItemsDatabase()
      .delete(tableItems)
      .where(eq(tableItems.id, Number(id))).returning({
        id: tableItems.id,
      })
  }

  return {
    select,
    insert,
    deleteAll,
    deleteById,
  }
}
