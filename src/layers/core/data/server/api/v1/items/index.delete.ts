import type { Item } from '@demo/data/types/items.d'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(
    event,
    z.object({
      id: z.string().nonempty().max(255),
    }).safeParse)

  if (body.error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid URL parameters',
      data: body.error,
    })
  }

  const items = await hubKV().get<Item[]>('items') ?? []
  const index = items.findIndex((item) => {
    return item.id === body.data.id
  })

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Item not found',
      data: { id: body.data.id },
    })
  }

  items.splice(index, 1)

  await hubKV().set('items', items)

  setResponseStatus(event, 200, `Item ${body.data.id} deleted`)

  return body.data.id
})
