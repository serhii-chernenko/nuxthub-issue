import type { Item } from '@demo/data/types/items.d'

export default defineEventHandler(async (event) => {
  const items = await hubKV().get<Item[]>('items') ?? []

  if (items.length === 5) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Maximum items reached',
    })
  }

  const id = crypto.randomUUID()
  const item = {
    id,
    name: `Item ${items.length + 1}`,
  }

  items.push(item)

  await hubKV().set('items', items)

  setResponseStatus(event, 201, item)

  return item
})
