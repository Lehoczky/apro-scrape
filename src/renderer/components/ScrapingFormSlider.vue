<template>
  <p class="range-field">
    <label for="r">Scarping interval (seconds)</label>
    <input
      v-model="interval"
      id="r"
      :class="{ disabled }"
      type="range"
      min="5"
      max="600"
      step="5"
      :disabled="disabled"
    />
  </p>
</template>

<script>
import M from "materialize-css";

export default {
  name: "ScrapingFormSlider",
  props: ["value", "disabled"],
  computed: {
    interval: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    const sliders = document.querySelectorAll("input[type=range]");
    M.Range.init(sliders);
  },
};
</script>

<style>
.disabled::-webkit-slider-thumb {
  background-color: #e2e2e2 !important;
}
</style>
