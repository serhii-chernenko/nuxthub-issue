export default defineNuxtConfig({
  extends: ['@demo/ui'],
  modules: ['@nuxt/eslint', '@nuxthub/core'],
  $development: {
    hub: {
      remote: true,
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-27',
  hub: {
    kv: true,
  },
})
