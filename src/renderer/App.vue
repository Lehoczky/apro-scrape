<template>
  <div class="container" id="app">
    <div class="row mt-20">
      <form class="col s12" @submit.prevent="startScraping($event)" novalidate>
        <div class="input-field">
          <input v-model="url" ref="input" placeholder="Enter HardverApro URL" :disabled="scraping" />
          <span ref="urlError" class="helper-text"></span>
        </div>

        <p class="range-field">
          <label for="range">Scarping interval (seconds)</label>
          <input
            v-model="scrapeInterval"
            id="interval"
            type="range"
            min="5"
            max="600"
            step="5"
            :disabled="scraping"
          />
        </p>

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

    <transition name="fade-from-top">
      <div v-show="showHistory" class="row collection">
        <a
          v-for="link in history"
          :key="link"
          class="collection-item small-font waves-effect waves-teal"
          @click="chooseHistoryLink(link)"
        >{{link}}</a>
      </div>
    </transition>

    <section v-for="(message, index) in messages" :key="index" class="row">
      <div class="card">
        <div class="card-content">
          <span class="card-title">{{ dateIntervalForMessage(message) }}</span>
          <table class="highlight">
            <tbody>
              <tr v-for="item in message" :key="item.url">
                <td>
                  <a :href="item.url" @click.prevent="openExternal(item.url)">{{ item.title }}</a>
                </td>
                <td class="price">{{ item.price }}</td>
                <td class="location hide-on-small-only">{{ item.location }}</td>
                <td class="date hide-on-small-only">{{ item.updated }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { remote } from "electron";
import { ipcRenderer, shell } from "electron";
import M from "materialize-css";

import { createNewItemNotification } from "./notification.js";

const mainWindow = remote.getCurrentWindow();

const startInterval = (seconds, callback) => {
  callback();
  return setInterval(callback, seconds * 1000);
};

export default {
  name: "App",
  data() {
    return {
      url: "",
      scraping: false,
      scrapeInterval: 60,
      showHistory: false,
      history: [],
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
  mounted() {
    const sliders = document.querySelectorAll("input[type=range]");
    M.Range.init(sliders);
  },
  methods: {
    async startScraping(event) {
      const errorMessage = await this.validateUrlInput();
      if (errorMessage) {
        this.$refs.input.classList.add("invalid");
        this.$refs.urlError.dataset.error = errorMessage;
      } else {
        this.$refs.input.classList.remove("invalid");
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
    dateIntervalForMessage(message) {
      const lastDate = message[message.length - 1].updated;
      const firstDate = message[0].updated;
      return `${lastDate} - ${firstDate}`;
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
    openExternal(url) {
      shell.openExternal(url);
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

.small-font {
  font-size: 12px;
}

.price,
.location {
  width: 100px;
}

.date {
  width: 90px;
}

@media (min-width: 601px) {
  #toast-container {
    top: auto !important;
    bottom: 7% !important;
    left: auto !important;
    right: 5%;
  }
}

.fade-from-top-enter-active {
  animation: fade-from-top 0.1s;
}
.fade-from-top-leave-active {
  animation: fade-from-top 0.1s reverse;
}
@keyframes fade-from-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
