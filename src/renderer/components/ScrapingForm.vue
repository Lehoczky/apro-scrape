<template>
  <div>
    <b-form @submit.prevent="onFormSubmit()">
      <b-input-group>
        <b-form-input
          v-model="url"
          class="text-truncate"
          :class="{ 'is-invalid': hasError }"
          :disabled="scraping"
          placeholder="Enter HardverApro URL"
        />
        <b-input-group-append>
          <scraping-form-history-button
            v-show="!historyIsEmpty && !scraping"
            :has-error="hasError"
            @click="toggleHistory()"
          />

          <scraping-form-submit-button v-if="!scraping" />

          <scraping-form-stop-button v-else @stop="onStop()" />
        </b-input-group-append>
        <div class="invalid-feedback">
          {{ error }}
        </div>
      </b-input-group>

      <scraping-form-help-text
        v-if="historyIsEmpty"
        @urlClicked="setAsCurrentUrl($event)"
      />
    </b-form>
    <scraping-form-history-list
      v-click-outside="hideHistory"
      :show="showHistory"
      :history="history"
      @select="setAsCurrentUrl($event)"
    />
  </div>
</template>

<script>
import { ipcRenderer } from "electron"

import clickOutsideHostMixin from "../mixins/clickOutsideHostMixin.js"
import ScrapingFormSubmitButton from "./ScrapingFormSubmitButton.vue"
import ScrapingFormStopButton from "./ScrapingFormStopButton.vue"
import ScrapingFormHistoryButton from "./ScrapingFormHistoryButton.vue"
import ScrapingFormHelpText from "./ScrapingFormHelpText.vue"
import ScrapingFormHistoryList from "./ScrapingFormHistoryList.vue"

export default {
  name: "ScrapingForm",
  components: {
    ScrapingFormSubmitButton,
    ScrapingFormStopButton,
    ScrapingFormHistoryButton,
    ScrapingFormHelpText,
    ScrapingFormHistoryList,
  },
  mixins: [clickOutsideHostMixin],
  data() {
    return {
      url: "",
      scraping: false,
      loading: false,
      showHistory: false,
      history: [],
      error: "",
    }
  },
  computed: {
    historyIsEmpty() {
      return this.history.length === 0
    },
    hasError() {
      return this.error !== ""
    },
  },
  watch: {
    history(newValue) {
      localStorage.setItem("history", JSON.stringify(newValue))
    },
  },
  created() {
    this.loadSavedHistory()
  },
  methods: {
    async onFormSubmit() {
      this.error = await this.validateUrlInput()
      if (!this.error) {
        this.scraping = true
        this.showHistory = false
        this.addToHistory(this.url)

        this.$emit("submit", this.url)
      }
    },
    onStop() {
      this.scraping = false
      this.$emit("stop")
    },
    async validateUrlInput() {
      if (this.url === "") {
        return "Please fill out this field"
      } else if (!this.url.startsWith("https://hardverapro.hu")) {
        return "Please provide a link to hardverapro.hu"
      } else {
        const validURL = await ipcRenderer.invoke("validate", this.url)
        if (!validURL) {
          return "The page does not exist, please check the URL"
        }
        return ""
      }
    },
    setAsCurrentUrl(link) {
      if (!this.scraping) {
        this.url = link
      }
    },
    loadSavedHistory() {
      this.history = JSON.parse(localStorage.getItem("history")) || []
    },
    hideHistory() {
      this.showHistory = false
    },
    toggleHistory() {
      this.showHistory = !this.showHistory
    },
    addToHistory(link) {
      if (this.history.includes(link)) {
        this.history.splice(this.history.indexOf(link), 1)
      }
      this.history = [link, ...this.history.slice(0, 4)]
    },
  },
}
</script>
