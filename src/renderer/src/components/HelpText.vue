<template>
  <small class="form-text text-muted text-truncate"
    >Ex.
    <span class="example-url" @click="$emit('url-click', exampleUrl)">{{
      exampleUrl
    }}</span>
    for mobile phones</small
  >
</template>

<script setup lang="ts">
defineEmits<{
  (event: "url-click", payload: string): void
}>()

const exampleUrl = ref("https://hardverapro.hu/aprok/mobil/index.html")
</script>

<style scoped>
.example-url {
  text-decoration: underline;
  cursor: pointer;
}
</style>
