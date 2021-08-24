export const startInterval = (seconds, callback) => {
  callback()
  return setInterval(callback, seconds * 1000)
}
