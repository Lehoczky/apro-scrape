<script setup lang="ts">
import { useToggle } from "@vueuse/core"
import { CheckIcon, GlobeIcon, TrashIcon } from "lucide-vue-next"
import type { PropType } from "vue"
import { computed, ref } from "vue"

import { DialogClose } from "@/renderer/src/components/ui/dialog"

import { type HistoryEntry } from "../types/history"
import { Button } from "./ui/button"

const props = defineProps({
  entry: {
    type: Object as PropType<HistoryEntry>,
    required: true,
  },
})

defineEmits<{
  (event: "select", payload: string): void
  (event: "remove", payload: string): void
}>()

const showSearchParams = ref(false)
const toggleShowSearchParams = useToggle(showSearchParams)
const titlePrefix = "https://hardverapro.hu"
const title = computed(() => {
  return props.entry.url.substring(titlePrefix.length)
})

const dateTimeFormatter = new Intl.DateTimeFormat("en-us", {
  dateStyle: "medium",
  timeStyle: "short",
})
const lastSearched = computed(() =>
  dateTimeFormatter.format(props.entry.lastSearched),
)
</script>

<template>
  <li class="grid overflow-hidden [word-wrap:break-word]">
    <div
      class="relative w-full overflow-hidden rounded-lg border border-border p-4 text-left"
    >
      <button
        class="absolute right-2 top-2 p-1"
        @click="$emit('remove', entry.url)"
      >
        <TrashIcon class="size-4" />
      </button>
      <div>
        <div class="mb-1 leading-tight">
          <span class="font-semibold">URL: </span>
          <span>{{ title }}</span>
        </div>
        <div>
          <span class="font-semibold">Last Searched: </span>
          <span>{{ lastSearched }}</span>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          as-child
          @click="toggleShowSearchParams()"
        >
          <a :href="entry.url" target="_blank">
            <GlobeIcon class="mr-1.5 size-3.5" />
            <span>Open in Web</span>
          </a>
        </Button>
        <DialogClose as-child>
          <Button size="sm" @click="$emit('select', entry.url)">
            <CheckIcon class="mr-1.5 size-3.5" />
            <span>Choose</span>
          </Button>
        </DialogClose>
      </div>
    </div>
  </li>
</template>
