import axios from "axios"

import { logError } from "./errorHandling"

export async function canReach(url: string) {
  try {
    await axios.options(url)
    return true
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      logError(error as Error)
    }
    return false
  }
}
