<template>
  <div>
    <b-form @submit.prevent="onFormSubmit()">
      <b-input-group>
        <b-form-input
          v-model="url"
          :class="{ 'is-invalid': error !== '' }"
          :disabled="scraping"
          placeholder="Enter HardverApro URL"
        >
        </b-form-input>
        <b-input-group-append>
          <b-button
            type="button"
            variant="light"
            class="btn-history"
            :class="{ 'is-invalid': error !== '' }"
            v-show="history.length && !scraping"
            @click.prevent="toggleHistory()"
          >
            <b-icon icon="arrow-counterclockwise" title="History"></b-icon>
          </b-button>

          <b-button v-if="!scraping" variant="primary" type="submit">
            Scrape
          </b-button>

          <b-button v-else variant="primary" @click.prevent="onStop()">
            <b-spinner class="mr-1" small></b-spinner>
            Stop
          </b-button>
        </b-input-group-append>
        <div class="invalid-feedback">{{ error }}</div>
      </b-input-group>

      <scraping-form-help-text
        v-if="showHelpText"
        :exampleUrl="exampleUrl"
        @urlClicked="copyExampleUrlToInput()"
      >
      </scraping-form-help-text>
    </b-form>
    <scraping-form-history
      :show="showHistory"
      v-click-outside="hideHistory"
      :history="history"
      @select="chooseHistoryLink($event)"
    ></scraping-form-history>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import ClickOutside from "vue-click-outside";

import ScrapingFormHistory from "./ScrapingFormHistory.vue";
import ScrapingFormHelpText from "./ScrapingFormHelpText.vue";

export default {
  name: "ScrapingForm",
  directives: {
    ClickOutside,
  },
  components: {
    ScrapingFormHistory,
    ScrapingFormHelpText,
  },
  data() {
    return {
      url: "",
      exampleUrl: "https://hardverapro.hu/aprok/mobil/index.html",
      scraping: false,
      showHistory: false,
      history: [],
      error: "",
    };
  },
  created() {
    this.loadSavedHistory();
  },
  mounted() {
    this.popupItem = this.$el;
  },
  computed: {
    showHelpText() {
      return !this.history.length;
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
    copyExampleUrlToInput() {
      this.url = this.exampleUrl;
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

<style scoped>
.btn-history {
  background: #f7f7f7 !important;
  border: 1px solid #ced4da !important;
  border-left: 0 !important;
  transition: all 1s;
}

.btn-history.is-invalid {
  border-color: #dc3545 !important;
}
</style>
