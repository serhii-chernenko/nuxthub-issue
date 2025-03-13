import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object({
      id: z.string().nonempty().max(255),
    }).safeParse)

  if (params.error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid URL parameters',
      data: params.error,
    })
  }

  return await useItemsRepository(event).deleteById(params.data.id)
})
