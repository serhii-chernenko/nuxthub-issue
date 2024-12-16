<script setup lang="ts">
const { myLayer } = useAppConfig()
</script>

<template>
  <div>
    <h1>Hello World from the @demo/ui layers in a monorepo workspace (upd)!</h1>
    <pre>{{ myLayer }}</pre>
  </div>
</template>
