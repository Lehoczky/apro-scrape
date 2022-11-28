<template>
  <BCollapse id="history" :visible="show">
    <BListGroup>
      <BListGroupItem
        v-for="link in history"
        :key="link"
        button
        @click="$emit('select', link)"
      >
        {{ link }}
      </BListGroupItem>
    </BListGroup>
  </BCollapse>
</template>

<script lang="ts">
import { BCollapse, BListGroup, BListGroupItem } from "bootstrap-vue"
import type { PropType } from "vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: { BCollapse, BListGroup, BListGroupItem },
  props: {
    show: {
      type: Boolean,
    },
    history: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: {
    select: (_payload: string) => true,
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
