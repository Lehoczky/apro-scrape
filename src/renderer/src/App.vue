<template>
  <BContainer id="app" fluid>
    <BCard class="mb-3 mt-5">
      <ScrapingForm @submit="startScraping($event)" @stop="stopScraping()" />
    </BCard>

    <BCard v-show="shownItems.length" class="mb-3">
      <MessageList :messages="shownItems" />
    </BCard>
  </BContainer>
</template>

<script setup lang="ts">
import type { SoldItem } from "@shared"
import { BCard, BContainer } from "bootstrap-vue"

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
/** App global */
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
  background-color: #f9f9f9 !important;
}

body,
input,
textarea,
select,
button {
  font-family: Roboto, "Helvetica Neue", Helvetica, sans-serif;
}

#app {
  width: min(850px, 95%);
}

.form-control {
  background-image: none !important;
}

/** Input */
.form-control:focus {
  box-shadow: 0 0 0.25rem 0.0625rem rgb(0 0 0 / 12.5%) inset !important;
  border-color: #aaa !important;
}

.form-control.is-invalid:focus,
.was-validated .form-control:invalid:focus {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 0.2rem rgb(220 53 69 / 12.5%) inset !important;
}

/** Buttons */

.btn:focus,
.btn:not(:disabled, .disabled):active:focus {
  box-shadow: none !important;
}

.btn-primary {
  background-color: #bc1013 !important;
  border-color: #bc1013 !important;
  color: #fff !important;
}

.btn-primary:hover {
  background-color: #a50e11 !important;
  border-color: #a50e11 !important;
  color: #fff !important;
}

.btn-primary:not(:disabled, .disabled):active,
.btn-primary:not(:disabled, .disabled).active {
  background-color: #8a0f11 !important;
  border-color: #8a0f11 !important;
  color: #fff !important;
}

.cet-menubar {
  display: none !important;
}
</style>
