import type { Item } from '@demo/data/types/items.d'
import { setResponseStatus } from 'nuxt/app'

export default defineEventHandler(async () => {
  const items = await hubKV().get<Item[]>('items') ?? []

  if (items.length === 5) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Maximum items reached',
    })
  }

  items.push({
    id: crypto.randomUUID(),
    name: `Item ${items.length + 1}`,
  })

  await hubKV().set('items', items)

  setResponseStatus(event, 201)
})
