export default defineAppConfig({
  myLayer: {
    name: 'Hello from the @demo/ui layer'
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
