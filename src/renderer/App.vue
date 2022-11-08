<template>
  <b-container id="app" fluid>
    <b-card class="mb-3 mt-5">
      <scraping-form @submit="startScraping($event)" @stop="stopScraping()" />
    </b-card>

    <b-card v-show="messages.length" class="mb-3">
      <message-list :messages="messages" />
    </b-card>
  </b-container>
</template>

<script>
import { ipcRenderer } from "electron"

import ScrapingForm from "./components/ScrapingForm.vue"
import MessageList from "./components/MessageList.vue"
import { createNewItemNotification } from "./notification.js"
import { startInterval } from "./utils.js"

const SCRAPING_INTERVAL = 15

export default {
  components: {
    ScrapingForm,
    MessageList,
  },
  data() {
    return {
      messages: [],
      interval: undefined,
    }
  },
  methods: {
    startScraping(url) {
      this.interval = startInterval(SCRAPING_INTERVAL, async () => {
        const items = await ipcRenderer.invoke("start-scraping", url)
        this.handleScrapedItems(items)
      })
    },
    stopScraping() {
      clearInterval(this.interval)
      this.interval = undefined
    },
    async handleScrapedItems(items) {
      console.log(items.length)
      if (items.length) {
        this.messages = [items, ...this.messages]
        const isWindowHidden = await ipcRenderer.invoke("is-window-hidden")
        if (isWindowHidden) {
          createNewItemNotification(items)
        }
      }
    },
  },
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
</style>
