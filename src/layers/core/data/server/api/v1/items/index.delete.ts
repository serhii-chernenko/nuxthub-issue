import type { Item } from '@demo/data/types/items.d'

export default defineEventHandler(async (event) => {
  const items = await hubKV().get<Item[]>('items') ?? []

  if (!items?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The items list is already empty',
    })
  }

  await hubKV().set('items', [])

  setResponseStatus(event, 200, 'All items deleted')
})
