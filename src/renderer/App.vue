<template>
  <div class="container" id="app">
    <div class="row mt-20">
      <form class="col s12" @submit.prevent="startScraping($event)" novalidate>
        <scraping-form-input v-model="url" :disabled="scraping" :error="error"></scraping-form-input>
        <scraping-form-slider v-model="scrapeInterval" :disabled="scraping"></scraping-form-slider>

        <div class="right-align">
          <button
            v-show="history.length"
            class="btn waves-effect waves-light mr-8"
            @click.prevent="toggleHistory()"
          >History</button>

          <button v-if="!scraping" class="btn waves-effect waves-light" type="submit">Scrape</button>
          <button
            v-else
            class="btn waves-effect waves-light red"
            @click.prevent="stopScraping()"
          >Stop</button>
        </div>
      </form>
    </div>
    <history-list v-show="showHistory" :history="history" @select="chooseHistoryLink($event)"></history-list>
    <message-list class="row" :messages="messages"></message-list>
  </div>
</template>

<script >
import { remote } from "electron";
import { ipcRenderer } from "electron";

import ScrapingFormInput from "./components/ScrapingFormInput.vue";
import ScrapingFormSlider from "./components/ScrapingFormSlider.vue";
import HistoryList from "./components/HistoryList.vue";
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
    ScrapingFormInput,
    ScrapingFormSlider,
    HistoryList,
    MessageList,
  },
  data() {
    return {
      url: "",
      scraping: false,
      scrapeInterval: 60,
      showHistory: false,
      history: [],
      error: "",
      messages: [],
      interval: undefined,
    };
  },
  created() {
    this.history = JSON.parse(localStorage.getItem("history")) || [];

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
    async startScraping(event) {
      this.error = await this.validateUrlInput();
      if (!this.error) {
        this.scraping = true;
        this.showHistory = false;
        this.addToHistory(this.url);

        this.interval = startInterval(this.scrapeInterval, async () => {
          ipcRenderer.send("start-scraping", this.url);
        });
      }
    },
    stopScraping() {
      this.scraping = false;
      clearInterval(this.interval);
      this.interval = undefined;
    },
    async validateUrlInput() {
      if (this.url == "") {
        return "Please fill out this field";
      } else if (!this.url.startsWith("https://hardverapro.hu")) {
        return "Please provide a link to hardverapro.hu";
      } else {
        const valid = ipcRenderer.sendSync("validate", this.url);
        if (!valid) {
          return "The page does not exist, please check the URL";
        }
        return "";
      }
    },
    toggleHistory() {
      this.showHistory = !this.showHistory;
    },
    chooseHistoryLink(link) {
      if (!this.scraping) {
        this.url = link;
      }
    },
    addToHistory(link) {
      if (this.history.includes(link)) {
        this.history.splice(this.history.indexOf(link), 1);
      }
      this.history = [link, ...this.history.slice(0, 4)];
    },
  },
  watch: {
    history(newValue, oldValue) {
      localStorage.setItem("history", JSON.stringify(newValue));
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
