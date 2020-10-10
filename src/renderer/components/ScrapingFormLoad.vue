<template>
  <div class="loading-message ml-10">
    <load-indicator></load-indicator>
    <span class="ml-10">Scraping in progress</span>
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
</style>
