<template>
  <BButton
    type="button"
    variant="light"
    class="btn-history"
    :class="{ 'is-invalid': hasError }"
    @click="$emit('input', !value)"
  >
    <BIcon
      class="icon"
      :class="{ rotate: value }"
      icon="arrow-counterclockwise"
      title="History"
    />
  </BButton>
</template>

<script lang="ts">
import { BButton, BIcon, BIconArrowCounterclockwise } from "bootstrap-vue"

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { BIcon, BButton, BIconArrowCounterclockwise },
  props: {
    hasError: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    input: (_payload: boolean) => true,
  },
})
</script>

<style scoped>
.btn-history {
  background: #f7f7f7 !important;
  border: 1px solid #ced4da !important;
  border-left: 0 !important;
}

.btn-history.is-invalid {
  border-color: #dc3545 !important;
}

.icon {
  transition: transform 200ms ease-in-out;
}

.rotate {
  transform: rotate(-125deg);
}
</style>
