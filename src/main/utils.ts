export async function canReach(url: string) {
  if (!url) {
    return false
  }

  try {
    const response = await fetch(url, { method: "OPTIONS" })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}
