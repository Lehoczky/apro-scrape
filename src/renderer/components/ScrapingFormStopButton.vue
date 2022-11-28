<template>
  <b-button variant="primary" @click="$emit('stop')">
    <b-spinner class="mr-1" small />
    Stop
  </b-button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { BButton, BSpinner } from "bootstrap-vue"

export default defineComponent({
  components: { BButton, BSpinner },
})
</script>
