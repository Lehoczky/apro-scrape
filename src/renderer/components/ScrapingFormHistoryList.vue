<template>
  <b-collapse v-model="show" id="history">
    <b-list-group>
      <b-list-group-item
        v-for="link in history"
        :key="link"
        button
        @click="$emit('select', link)"
        >{{ link }}</b-list-group-item
      >
    </b-list-group>
  </b-collapse>
</template>

<script>
export default {
  name: "ScrapingFormHistoryList",
  props: {
    show: {
      type: Boolean,
    },
    history: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.list-group-item {
  color: #717171 !important;
  padding: 12px !important;
}

.list-group-item:first-child {
  margin-top: 1rem;
}
</style>
