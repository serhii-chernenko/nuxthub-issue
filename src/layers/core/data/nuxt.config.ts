export default defineNuxtConfig({
  extends: ['@demo/ui'],
  modules: ['@nuxt/eslint', '@nuxthub/core'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-27',
  hub: {
    kv: true,
  },
})
