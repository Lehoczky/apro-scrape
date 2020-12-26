<template>
  <div>
    <b-form @submit.prevent="onFormSubmit()">
      <b-input-group>
        <b-form-input
          v-model="url"
          :class="{ 'is-invalid': hasError }"
          :disabled="scraping"
          placeholder="Enter HardverApro URL"
        >
        </b-form-input>
        <b-input-group-append>
          <scraping-form-history-button
            :hasError="hasError"
            v-show="!historyIsEmpty && !scraping"
            @click="toggleHistory()"
          >
          </scraping-form-history-button>

          <scraping-form-submit-button
            v-if="!scraping"
          ></scraping-form-submit-button>

          <scraping-form-stop-button
            v-else
            @stop="onStop()"
          ></scraping-form-stop-button>
        </b-input-group-append>
        <div class="invalid-feedback">{{ error }}</div>
      </b-input-group>

      <scraping-form-help-text
        v-if="historyIsEmpty"
        @urlClicked="setAsCurrentUrl($event)"
      >
      </scraping-form-help-text>
    </b-form>
    <scraping-form-history-list
      :show="showHistory"
      v-click-outside="hideHistory"
      :history="history"
      @select="setAsCurrentUrl($event)"
    ></scraping-form-history-list>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

import clickOutsideHostMixin from "../mixins/clickOutsideHostMixin.js";
import ScrapingFormSubmitButton from "./ScrapingFormSubmitButton.vue";
import ScrapingFormStopButton from "./ScrapingFormStopButton.vue";
import ScrapingFormHistoryButton from "./ScrapingFormHistoryButton.vue";
import ScrapingFormHelpText from "./ScrapingFormHelpText.vue";
import ScrapingFormHistoryList from "./ScrapingFormHistoryList.vue";

export default {
  name: "ScrapingForm",
  mixins: [clickOutsideHostMixin],
  components: {
    ScrapingFormSubmitButton,
    ScrapingFormStopButton,
    ScrapingFormHistoryButton,
    ScrapingFormHelpText,
    ScrapingFormHistoryList,
  },
  data() {
    return {
      url: "",
      scraping: false,
      loading: false,
      showHistory: false,
      history: [],
      error: "",
    };
  },
  created() {
    this.loadSavedHistory();
  },
  computed: {
    historyIsEmpty() {
      return this.history.length === 0;
    },
    hasError() {
      return this.error !== "";
    },
  },
  methods: {
    async onFormSubmit() {
      this.error = await this.validateUrlInput();
      if (!this.error) {
        this.scraping = true;
        this.showHistory = false;
        this.addToHistory(this.url);

        this.$emit("submit", this.url);
      }
    },
    onStop() {
      this.scraping = false;
      this.$emit("stop");
    },
    validateUrlInput() {
      if (this.url === "") {
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
    setAsCurrentUrl(link) {
      if (!this.scraping) {
        this.url = link;
      }
    },
    loadSavedHistory() {
      this.history = JSON.parse(localStorage.getItem("history")) || [];
    },
    hideHistory() {
      this.showHistory = false;
    },
    toggleHistory() {
      this.showHistory = !this.showHistory;
    },
    addToHistory(link) {
      if (this.history.includes(link)) {
        this.history.splice(this.history.indexOf(link), 1);
      }
      this.history = [link, ...this.history.slice(0, 4)];
    },
  },
  watch: {
    history(newValue) {
      localStorage.setItem("history", JSON.stringify(newValue));
    },
  },
};
</script>

<style scoped>
</style>
