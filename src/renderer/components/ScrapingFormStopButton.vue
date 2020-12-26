<template>
  <b-button variant="primary" @click="$emit('stop')">
    <b-spinner class="mr-1" small></b-spinner>
    Stop
  </b-button>
</template>

<script>
export default {
  name: "ScrapingFormStopButton",
};
</script>

<style>
</style>
