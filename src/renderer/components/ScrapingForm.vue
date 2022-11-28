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
        <b-input-group-append class="button-group">
          <scraping-form-history-button
            v-show="!historyIsEmpty && !scraping"
            v-model="showHistory"
            :has-error="hasError"
          />

          <scraping-form-submit-button v-if="!scraping" class="action-button" />
          <scraping-form-stop-button
            v-else
            class="action-button"
            @stop="onStop()"
          />
        </b-input-group-append>

        <div class="invalid-feedback">
          <b-collapse :visible="hasError">
            {{ error }}
          </b-collapse>
        </div>
      </b-input-group>

      <scraping-form-help-text
        v-if="historyIsEmpty"
        @urlClicked="setAsCurrentUrl($event)"
      />
    </b-form>
    <scraping-form-history-list
      ref="historyListRef"
      :show="showHistory"
      :history="history"
      @select="setAsCurrentUrl($event)"
    />
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "electron"

import ScrapingFormSubmitButton from "./ScrapingFormSubmitButton.vue"
import ScrapingFormStopButton from "./ScrapingFormStopButton.vue"
import ScrapingFormHistoryButton from "./ScrapingFormHistoryButton.vue"
import ScrapingFormHelpText from "./ScrapingFormHelpText.vue"
import ScrapingFormHistoryList from "./ScrapingFormHistoryList.vue"
import { computed, defineComponent, ref, watch } from "vue"
import { onClickOutside } from "@vueuse/core"
import {
  BForm,
  BInputGroup,
  BInputGroupAppend,
  BCollapse,
  BFormInput,
} from "bootstrap-vue"

export default defineComponent({
  components: {
    BForm,
    BInputGroup,
    BCollapse,
    BInputGroupAppend,
    BFormInput,
    ScrapingFormSubmitButton,
    ScrapingFormStopButton,
    ScrapingFormHistoryButton,
    ScrapingFormHelpText,
    ScrapingFormHistoryList,
  },
  setup(props, { emit }) {
    const url = ref("")
    const scraping = ref(false)
    const showHistory = ref(false)
    const history = ref<string[]>([])
    const error = ref("")
    const historyListRef = ref(null)

    const historyIsEmpty = computed(() => {
      return history.value.length === 0
    })

    const hasError = computed(() => {
      return error.value !== ""
    })

    watch(history, newValue => {
      localStorage.setItem("history", JSON.stringify(newValue))
    })

    async function onFormSubmit(): Promise<void> {
      error.value = await validateUrlInput()
      if (!error.value) {
        scraping.value = true
        showHistory.value = false
        addToHistory(url.value)

        emit("submit", url.value)
      }
    }

    function onStop(): void {
      scraping.value = false
      emit("stop")
    }

    async function validateUrlInput(): Promise<string> {
      if (url.value === "") {
        return "Please fill out this field"
      } else if (!url.value.startsWith("https://hardverapro.hu")) {
        return "Please provide a link to hardverapro.hu"
      } else {
        const validURL = await ipcRenderer.invoke("validate", url.value)
        if (!validURL) {
          return "The page does not exist, please check the URL"
        }
        return ""
      }
    }

    function setAsCurrentUrl(link: string): void {
      if (!scraping.value) {
        error.value = ""
        url.value = link
      }
    }

    function loadSavedHistory(): void {
      history.value = JSON.parse(localStorage.getItem("history")) || []
    }
    loadSavedHistory()

    function hideHistory(): void {
      showHistory.value = false
    }

    function addToHistory(link: string): void {
      if (history.value.includes(link)) {
        history.value.splice(history.value.indexOf(link), 1)
      }
      history.value = [link, ...history.value.slice(0, 4)]
    }

    onClickOutside(historyListRef, hideHistory)

    return {
      url,
      scraping,
      hasError,
      historyIsEmpty,
      showHistory,
      onStop,
      error,
      setAsCurrentUrl,
      history,
      hideHistory,
      onFormSubmit,
      historyListRef,
    }
  },
})
</script>

<style scoped>
.action-button {
  width: 84px;
}
</style>
