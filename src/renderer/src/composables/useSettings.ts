import { useDark, useStorage } from "@vueuse/core"

const isDark = useDark({
  initialValue: "light",
  storageKey: "settings:darkMode",
})
const isAlwaysOnTop = useStorage(
  "settings:alwaysOnTop",
  window.api.getAlwaysOnTop(),
)

export function useSettings() {
  function actOnInitialSettings() {
    if (isAlwaysOnTop.value) {
      window.api.enableAlwaysOnTop()
    }
  }

  return {
    isDark,
    isAlwaysOnTop,
    actOnInitialSettings,
  }
}
