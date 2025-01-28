// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@demo/ui', '@demo/data'],
  modules: ['@nuxt/eslint', '@nuxthub/core'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-27',
  typescript: {
    // https://github.com/nuxt/nuxt/issues/20155
    includeWorkspace: true,
  },
})
