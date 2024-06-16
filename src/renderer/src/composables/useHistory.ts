export function useHistory() {
  const history = ref<string[]>([])

  const historyIsEmpty = computed(() => {
    return history.value.length === 0
  })

  function loadSavedHistory(): void {
    history.value = JSON.parse(localStorage.getItem("history")!) || []
  }

  function addToHistory(link: string): void {
    if (history.value.includes(link)) {
      history.value.splice(history.value.indexOf(link), 1)
    }
    history.value = [link, ...history.value.slice(0, 4)]
  }

  watch(history, (newValue) => {
    localStorage.setItem("history", JSON.stringify(newValue))
  })

  return { history, historyIsEmpty, loadSavedHistory, addToHistory }
}
