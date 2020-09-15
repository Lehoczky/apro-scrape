<template>
  <div class="container" id="app">
    <scraping-form class="row mt-20" @submit="startScraping($event)" @stop="stopScraping()"></scraping-form>
    <message-list class="row" :messages="messages"></message-list>
  </div>
</template>

<script >
import { remote } from "electron";
import { ipcRenderer } from "electron";

import ScrapingForm from "./components/ScrapingForm.vue";
import MessageList from "./components/MessageList.vue";
import { createNewItemNotification } from "./notification.js";

const mainWindow = remote.getCurrentWindow();

const startInterval = (seconds, callback) => {
  callback();
  return setInterval(callback, seconds * 1000);
};

export default {
  name: "App",
  components: {
    ScrapingForm,
    MessageList,
  },
  data() {
    return {
      messages: [],
      interval: undefined,
    };
  },
  created() {
    ipcRenderer.on("new-items", (event, items) => {
      console.log(items.length);
      if (items.length) {
        this.messages = [items, ...this.messages];
        if (!mainWindow.isVisible()) {
          createNewItemNotification(items, mainWindow);
        }
      }
    });
  },
  methods: {
    startScraping(event) {
      this.interval = startInterval(event.scrapeInterval, () => {
        ipcRenderer.send("start-scraping", event.url);
      });
    },
    stopScraping() {
      clearInterval(this.interval);
      this.interval = undefined;
    },
  },
};
</script>

<style>
.mr-8 {
  margin-right: 8px;
}

.mt-20 {
  margin-top: 20px;
}
</style>
