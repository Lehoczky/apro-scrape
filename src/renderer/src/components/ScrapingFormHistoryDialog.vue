<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Search History</DialogTitle>
      <DialogDescription>
        You can see your past searches in the list below.
      </DialogDescription>
    </DialogHeader>
    <ul v-if="history.length" class="grid gap-4">
      <li
        v-for="item in history"
        :key="item"
        class="grid overflow-hidden [word-wrap:break-word]"
      >
        <DialogClose as-child>
          <button
            class="w-full overflow-hidden text-left"
            @click="$emit('select', item)"
          >
            {{ item }}
          </button>
        </DialogClose>
      </li>
    </ul>

    <div v-else class="py-10 text-center text-2xl">
      No searches have been done so far :/
    </div>
    <DialogFooter>
      <DialogClose as-child>
        <Button variant="destructive">
          <X class="mr-2 h-4 w-4" />
          <span>Close</span>
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next"

import { Button } from "@/renderer/src/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/renderer/src/components/ui/dialog"

defineProps<{
  history: string[]
}>()

defineEmits<{
  (event: "select", payload: string): void
}>()
</script>
