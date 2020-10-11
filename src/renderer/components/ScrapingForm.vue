<template>
  <div>
    <div class="row mt-20">
      <form class="col s12" @submit.prevent="onFormSubmit()" novalidate>
        <scraping-form-input v-model="url" :disabled="scraping" :error="error"></scraping-form-input>
        <scraping-form-slider v-model="scrapeInterval" :disabled="scraping"></scraping-form-slider>

        <scraping-form-load v-if="scraping" class="left"></scraping-form-load>

        <div class="right-align">
          <button
            v-show="history.length && !scraping"
            class="btn waves-effect waves-light blue-grey mr-8"
            @click.prevent="toggleHistory()"
          >History</button>

          <button v-if="!scraping" class="btn scrape-btn waves-effect waves-light" type="submit">Scrape</button>
          <button v-else class="btn scrape-btn waves-effect waves-light red" @click.prevent="onStop()">Stop</button>
        </div>
      </form>
    </div>
    <scraping-form-history
      v-show="showHistory"
      :history="history"
      @select="chooseHistoryLink($event)"
    ></scraping-form-history>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

import ScrapingFormInput from "./ScrapingFormInput.vue";
import ScrapingFormSlider from "./ScrapingFormSlider.vue";
import ScrapingFormLoad from "./ScrapingFormLoad.vue";
import ScrapingFormHistory from "./ScrapingFormHistory.vue";

export default {
  name: "ScrapingForm",
  components: {
    ScrapingFormInput,
    ScrapingFormSlider,
    ScrapingFormHistory,
    ScrapingFormLoad
  },
  data() {
    return {
      url: "",
      scrapeInterval: 60,
      scraping: false,
      showHistory: false,
      history: [],
      error: "",
    };
  },
  created() {
    this.history = JSON.parse(localStorage.getItem("history")) || [];
  },
  methods: {
    async onFormSubmit() {
      this.error = await this.validateUrlInput();
      if (!this.error) {
        this.scraping = true;
        this.showHistory = false;
        this.addToHistory(this.url);

        this.$emit("submit", {
          url: this.url,
          scrapeInterval: this.scrapeInterval,
        });
      }
    },
    onStop() {
      this.scraping = false;
      this.$emit("stop");
    },
    async validateUrlInput() {
      if (this.url == "") {
        return "Please fill out this field";
      } else if (!this.url.startsWith("https://hardverapro.hu")) {
        return "Please provide a link to hardverapro.hu";
      } else {
        const validURL = ipcRenderer.sendSync("validate", this.url);
        if (!validURL) {
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
.scrape-btn {
  width: 84px;
}
</style>
