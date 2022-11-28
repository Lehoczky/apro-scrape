<template>
  <b-collapse id="history" :visible="show">
    <b-list-group>
      <b-list-group-item
        v-for="link in history"
        :key="link"
        button
        @click="$emit('select', link)"
      >
        {{ link }}
      </b-list-group-item>
    </b-list-group>
  </b-collapse>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    show: {
      type: Boolean,
    },
    history: {
      type: Array,
      required: true,
    },
  },
})
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
