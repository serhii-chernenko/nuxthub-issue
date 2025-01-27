<template>
  <NuxtErrorBoundary>
    <template #error="{ error, clearError }">
      <div class="fixed bottom-4 inset-x-0 grid place-content-center pointer-events-none">
        <div
          role="alert"
          class="alert alert-error w-full px-4 sm:px-8 shadow-lg pointer-events-auto"
        >
          <span>
            {{ getErrorMessage(error.value) }}
          </span>
          <button
            type="button"
            class="btn btn-sm btn-ghost"
            title="close"
            @click="clearError"
          >
            <span>Close</span>
          </button>
        </div>
      </div>
      <NuxtLayout />
    </template>
    <NuxtLayout />
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} — NuxtHub Issues` : 'NuxtHub Issues',
})

const getErrorMessage = (error: any) => {
  if (error?.statusMessage) {
    return error.statusMessage
  }

  return error?.message ?? 'Something went wrong'
}
</script>
