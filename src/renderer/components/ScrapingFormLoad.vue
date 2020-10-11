<template>
  <div class="loading-message ml-10">
    <load-indicator></load-indicator>
    <span class="hide-on-extra-small-only ml-10">Scraping in progress</span>
  </div>
</template>

<script>
import LoadIndicator from "./LoadIndicator.vue";

export default {
  name: "ScrapingFormLoad",
  components: {
    LoadIndicator,
  },
}
</script>

<style>
.loading-message {
  display: flex;
  align-items: center;
}

@media (max-width: 350px) {
  .hide-on-extra-small-only {
    display: none !important;
  }
}
</style>
