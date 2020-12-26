<template>
  <b-container id="app">
    <b-card class="mb-3 mt-5">
      <scraping-form
        @submit="startScraping($event)"
        @stop="stopScraping()"
      ></scraping-form>
    </b-card>

    <b-card class="mb-3" v-show="messages.length">
      <message-list :messages="messages"></message-list>
    </b-card>
  </b-container>
</template>

<script >
import { remote, ipcRenderer } from "electron";

import titlebarMixin from "./mixins/titlebarMixin.js";
import ScrapingForm from "./components/ScrapingForm.vue";
import MessageList from "./components/MessageList.vue";
import { createNewItemNotification } from "./notification.js";
import { startInterval } from "./utils.js";

const SCRAPING_INTERVAL = 15;
const mainWindow = remote.getCurrentWindow();

export default {
  name: "App",
  mixins: [titlebarMixin],
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
    startScraping(url) {
      this.interval = startInterval(SCRAPING_INTERVAL, () => {
        ipcRenderer.send("start-scraping", url);
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
/** App global */
body {
  background-color: #f9f9f9 !important;
}

body,
input,
textarea,
select,
button {
  font-family: Roboto, Helvetica Neue, Helvetica, sans-serif;
}

#app {
  width: min(750px, 95%);
}

/** Input */
.form-control:focus {
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.125) inset !important;
  border-color: #aaa !important;
}

.form-control {
  font-size: 0.875rem;
  background-image: none !important;
}

.form-control.is-invalid:focus,
.was-validated .form-control:invalid:focus {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.125) inset !important;
}

/** Buttons */

.btn:focus,
.btn:not(:disabled):not(.disabled):active:focus {
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

.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled).active {
  background-color: #8a0f11 !important;
  border-color: #8a0f11 !important;
  color: #fff !important;
}
</style>
