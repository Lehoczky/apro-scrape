<template>
  <small class="form-text text-muted text-truncate"
    >Ex.
    <span class="example-url" @click="$emit('url-click', exampleUrl)">{{
      exampleUrl
    }}</span>
    for mobile phones</small
  >
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  emits: {
    "url-click": (_payload: string) => true,
  },
  setup() {
    const exampleUrl = ref("https://hardverapro.hu/aprok/mobil/index.html")
    return { exampleUrl }
  },
})
</script>

<style scoped>
.example-url {
  text-decoration: underline;
  cursor: pointer;
}
</style>
