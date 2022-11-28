<template>
  <BButton variant="primary" @click="$emit('stop')">
    <BSpinner class="mr-1" small />
    Stop
  </BButton>
</template>

<script lang="ts">
import { BButton, BSpinner } from "bootstrap-vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: { BButton, BSpinner },
  emits: {
    stop: () => true,
  },
})
</script>
