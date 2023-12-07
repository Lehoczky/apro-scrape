<template>
  <BButton variant="primary" @click="$emit('stop')">
    <BSpinner class="mr-1" small />
    Stop
  </BButton>
</template>

<script setup lang="ts">
import { BButton, BSpinner } from "bootstrap-vue"

defineEmits<{
  (event: "stop"): void
}>()
</script>
