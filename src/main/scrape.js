import { JSDOM } from "jsdom"

export const createScraper = () => {
  let lastItem = null
  return async page => {
    let items = await getSellingItems(page)
    const urls = items.map(item => item.url)

    if (lastItem && urls.includes(lastItem.url)) {
      items = items.slice(0, urls.indexOf(lastItem.url))
    }
    if (items.length) {
      lastItem = items[0]
    }
    return items
  }
}

const getSellingItems = async page => {
  const dom = await JSDOM.fromURL(page)
  return Array.from(dom.window.document.querySelectorAll(".media"))
    .map(item => {
      const url = item.querySelector("h1 > a").href
      const title = item.querySelector("h1 > a").textContent
      const price = item.querySelector(".uad-price").textContent
      const location = item.querySelector(".uad-light").textContent
      const updated = item.querySelector(".uad-ultralight").textContent
      return { url, title, price, location, updated }
    })
    .filter(item => item.updated !== "Előresorolt hirdetés")
    .filter(item => item.price !== "Csere")
}
