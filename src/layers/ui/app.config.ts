export default defineAppConfig({
  myLayer: {
    name: 'Hello from the UI layer'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
