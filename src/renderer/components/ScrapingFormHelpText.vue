<template>
  <small class="form-text text-muted text-truncate"
    >Ex.
    <span class="example-url" @click="$emit('urlClicked')">{{
      exampleUrl
    }}</span>
    for mobile phones</small
  >
</template>

<script>
export default {
  name: "ScrapingFormHelpText",
  props: {
    exampleUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.example-url {
  text-decoration: underline;
  cursor: pointer;
}
</style>
