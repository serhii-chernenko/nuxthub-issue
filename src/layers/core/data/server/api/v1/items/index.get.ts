import type { Item } from '@demo/data/types/items.d'

export default defineEventHandler(async () => {
  return await hubKV().get<Item[]>('items') ?? []
})
