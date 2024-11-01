import { logError } from "./errorHandling"

export async function canReach(url: string) {
  if (!url) {
    return false
  }

  try {
    const response = await fetch(url, { method: "OPTIONS" })
    return response.ok
  } catch (error) {
    logError(error as Error)
    return false
  }
}
