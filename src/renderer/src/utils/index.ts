export function startInterval(seconds: number, callback: () => unknown) {
  callback()
  return setInterval(callback, seconds * 1000)
}
