<template>
  <DialogContent class="flex flex-col">
    <DialogHeader>
      <DialogTitle>Search History</DialogTitle>
      <DialogDescription>
        You can see your past searches in the list below.
      </DialogDescription>
    </DialogHeader>

    <div v-if="history.length" class="grid flex-1 gap-4 overflow-auto">
      <ul class="grid flex-1 gap-4">
        <ScrapingHistoryItem
          v-for="item in history"
          :key="item.url"
          :entry="item"
          @select="$emit('select', item.url)"
          @remove="removeFromHistory(item.url)"
        />
      </ul>
    </div>

    <div v-else class="grid place-items-center py-10 text-center text-2xl">
      <LeafIcon class="mb-2 size-14" />
      <div>No searches have been done so far</div>
    </div>
  </DialogContent>
</template>

<script setup lang="ts">
import { LeafIcon } from "lucide-vue-next"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/renderer/src/components/ui/dialog"

import { useHistory } from "../composables/useHistory"
import type { HistoryEntry } from "../types/history"
import ScrapingHistoryItem from "./ScrapingHistoryItem.vue"

defineProps<{
  history: HistoryEntry[]
}>()

defineEmits<{
  (event: "select", payload: string): void
}>()

const { removeFromHistory } = useHistory()
</script>
