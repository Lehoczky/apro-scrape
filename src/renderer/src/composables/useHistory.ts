import { type HistoryEntry, parseHistoryEntries } from "../types/history"

const history = ref<HistoryEntry[]>([])
const HISTORY_MAX_LENGTH = 10

export function useHistory() {
  const historyIsEmpty = computed(() => {
    return history.value.length === 0
  })

  function loadSavedHistory(): void {
    const historyRaw = localStorage.getItem("history")
    history.value = parseHistoryEntries(historyRaw)
  }

  function addToHistory(url: HistoryEntry["url"]): void {
    const indexOfEntryWithSameURL = getIndexOfEntryWithSameURL(url)
    const hasEntryWithSameURL = indexOfEntryWithSameURL !== -1

    if (hasEntryWithSameURL) {
      history.value.splice(indexOfEntryWithSameURL, 1)
    }

    const newEntry: HistoryEntry = { url, lastSearched: new Date() }
    history.value = [newEntry, ...history.value.slice(0, HISTORY_MAX_LENGTH)]
  }

  function removeFromHistory(url: HistoryEntry["url"]) {
    const indexOfEntryWithSameURL = getIndexOfEntryWithSameURL(url)
    const hasEntryWithSameURL = indexOfEntryWithSameURL !== -1

    if (hasEntryWithSameURL) {
      history.value.splice(indexOfEntryWithSameURL, 1)
    }
  }

  function getIndexOfEntryWithSameURL(url: HistoryEntry["url"]) {
    const entryURLs = history.value.map((entry) => entry.url)
    return entryURLs.indexOf(url)
  }

  watch(history, (newValue) => {
    localStorage.setItem("history", JSON.stringify(newValue))
  })

  return {
    history,
    historyIsEmpty,
    loadSavedHistory,
    addToHistory,
    removeFromHistory,
  }
}
