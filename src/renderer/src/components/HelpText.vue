<template>
  <FormDescription @click="$emit('url-click', exampleUrl)">
    Ex.
    <button class="underline" type="button">
      {{ exampleUrl }}
    </button>
  </FormDescription>
</template>

<script setup lang="ts">
import { FormDescription } from "./ui/form"

defineEmits<{
  (event: "url-click", payload: string): void
}>()

const exampleUrl = ref("https://hardverapro.hu/aprok/mobil/index.html")
</script>
