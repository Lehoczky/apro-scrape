<template>
  <div class="container flex flex-col gap-10">
    <ScrapingForm
      class="mt-8"
      @submit="startScraping($event)"
      @stop="stopScraping()"
    />

    <Card v-show="shownItems.length" class="mb-3">
      <MessageList :messages="shownItems" />
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { SoldItem } from "@/shared"

import MessageList from "./components/MessageList.vue"
import ScrapingForm from "./components/ScrapingForm.vue"
import { Card } from "./components/ui/card"
import { createNewItemNotification } from "./notification"
import { startInterval } from "./utils"

const SCRAPING_INTERVAL = 60

const shownItems = ref<SoldItem[][]>([])
const interval = ref<ReturnType<typeof startInterval>>()

function startScraping(url: string) {
  interval.value = startInterval(SCRAPING_INTERVAL, async () => {
    const items = await window.api.startScraping(url)
    handleScrapedItems(items)
  })
}

async function handleScrapedItems(items: SoldItem[]) {
  if (items.length) {
    shownItems.value = [items, ...shownItems.value]
    const isWindowHidden = await window.api.isWindowHidden()
    if (isWindowHidden) {
      createNewItemNotification(items)
    }
  }
}

function stopScraping() {
  clearInterval(interval.value)
  interval.value = undefined
}
</script>

<style>
.cet-menubar {
  display: none !important;
}
</style>
