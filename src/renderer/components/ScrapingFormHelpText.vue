<template>
  <small class="form-text text-muted text-truncate"
    >Ex.
    <span class="example-url" @click="$emit('urlClicked', exampleUrl)">{{
      exampleUrl
    }}</span>
    for mobile phones</small
  >
</template>

<script>
export default {
  name: "ScrapingFormHelpText",
  data() {
    return {
      exampleUrl: "https://hardverapro.hu/aprok/mobil/index.html",
    }
  },
}
</script>

<style scoped>
.example-url {
  text-decoration: underline;
  cursor: pointer;
}
</style>
