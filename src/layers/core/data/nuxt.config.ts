export default defineNuxtConfig({
  extends: ['@demo/ui'],
  modules: ['@nuxt/eslint', '@nuxthub/core'],
  $development: {
    hub: {
      remote: true,
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      itemsLimit: 5,
    },
  },
  compatibilityDate: '2025-01-27',
  hub: {
    kv: true,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
