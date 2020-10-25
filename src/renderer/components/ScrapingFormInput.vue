<template>
  <div class="input-field">
    <input
      id="url-input"
      v-model="input"
      :disabled="disabled"
      :class="{ invalid: error !== '' }"
      placeholder="Enter HardverApro URL"
    />
    <span :data-error="error" class="helper-text"></span>
  </div>
</template>

<script>
export default {
  name: "ScrapingFormInput",
  props: ["value", "disabled", "error"],
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
