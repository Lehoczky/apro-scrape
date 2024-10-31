<script setup lang="ts">
import { ref } from "vue"

import { FormDescription } from "./ui/form"

defineEmits<{
  (event: "url-click", payload: string): void
}>()

const exampleUrl = ref("https://hardverapro.hu/aprok/mobil/index.html")
</script>

<template>
  <FormDescription @click="$emit('url-click', exampleUrl)">
    Ex.
    <button class="underline" type="button">
      {{ exampleUrl }}
    </button>
  </FormDescription>
</template>
