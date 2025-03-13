export default defineEventHandler(async (event) => {
  return await useItemsRepository(event).deleteAll()
})
