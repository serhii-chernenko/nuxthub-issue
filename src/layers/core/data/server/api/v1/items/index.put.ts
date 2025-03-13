export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event).public
  const { select, insert } = useItemsRepository(event)
  const items = await select()

  if (items.length >= (config?.itemsLimit as number || 5)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Maximum items reached',
    })
  }

  return await insert({
    name: `Item ${items.length + 1}`,
    createdAt: new Date(),
  })
})
