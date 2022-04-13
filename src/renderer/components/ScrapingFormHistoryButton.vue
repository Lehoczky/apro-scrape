<template>
  <b-button
    type="button"
    variant="light"
    class="btn-history"
    :class="{ 'is-invalid': hasError }"
    @click="$emit('click')"
  >
    <b-icon icon="arrow-counterclockwise" title="History" />
  </b-button>
</template>

<script>
export default {
  props: {
    hasError: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.btn-history {
  background: #f7f7f7 !important;
  border: 1px solid #ced4da !important;
  border-left: 0 !important;
  transition: all 1s;
}

.btn-history.is-invalid {
  border-color: #dc3545 !important;
}
</style>
