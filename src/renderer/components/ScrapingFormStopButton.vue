<template>
  <b-button variant="primary" @click="$emit('stop')">
    <b-spinner class="mr-1" small />
    Stop
  </b-button>
</template>

<script lang="ts">
import { BButton, BSpinner } from "bootstrap-vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: { BButton, BSpinner },
})
</script>
