<template>
  <div class="grid place-items-center h-svh">
    <div class="grid gap-8">
      <h1 class="text-4xl font-bold text-center">
        Items list
      </h1>
      <div
        v-if="status === 'pending'"
        class="flex justify-center"
      >
        <span class="loading loading-infinity loading-lg" />
      </div>
      <div
        v-else-if="error"
        role="alert"
        class="alert alert-error"
      >
        <span>{{ error?.statusMessage ?? 'Something went wrong...' }}</span>
      </div>
      <template v-else>
        <div
          v-if="!items?.length"
          role="alert"
          class="alert"
        >
          <span>The list is empty</span>
        </div>
        <ul
          v-else
          class="grid gap-2"
        >
          <li
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between gap-4"
          >
            <span>{{ item.name }}</span>
            <button
              type="button"
              title="Delete item"
              class="btn btn-xs btn-error btn-outline"
              @click="deleteItem({ id: item.id })"
            >
              Delete
            </button>
          </li>
        </ul>
        <button
          type="button"
          title="Add new item"
          class="btn btn-primary btn-wide"
          @click="addItem"
        >
          Add new item
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@demo/data/types/items.d'

const { data: items, status, error, refresh } = await useFetch<Item[]>('/api/v1/items')

const addItem = async () => {
  await $fetch('/api/v1/items', {
    method: 'put',
  })

  await refresh()
}

const deleteItem = async (item: Pick<Item, 'id'>) => {
  await $fetch('/api/v1/items', {
    method: 'delete',
    body: {
      id: item.id,
    },
  })

  await refresh()
}
</script>
