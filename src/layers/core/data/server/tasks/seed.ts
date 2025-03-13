export default defineTask({
  meta: {
    name: 'db:seed:items',
    description: 'Run database seed items task',
  },
  async run() {
    // eslint-disable-next-line no-console
    console.log('Running DB seed items task...')

    try {
      const { insert } = useItemsRepository()

      await insert({
        name: 'Item 1',
        createdAt: new Date(),
      })

      return { result: 'success' }
    } catch (exception: any) {
      throw createError(exception)
    }
  },
})
