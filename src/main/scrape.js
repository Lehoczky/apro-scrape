import { JSDOM, CookieJar } from "jsdom"

export function createScraper() {
  let lastItem = null
  return async page => {
    const dom = await fetchDomForPage(page)
    let items = await getSellingItems(dom)
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

async function fetchDomForPage(page) {
  const cookieJar = new CookieJar()
  const COOKIE_TO_FETCH_200_ITEMS = "prf_ls_uad=lstup.d.200.normal"
  cookieJar.setCookieSync(COOKIE_TO_FETCH_200_ITEMS, page)
  return await JSDOM.fromURL(page, { cookieJar })
}

async function getSellingItems(dom) {
  return Array.from(dom.window.document.querySelectorAll(".media"))
    .map(item => {
      try {
        const url = item.querySelector("h1 > a").href
        const title = item.querySelector("h1 > a").textContent
        const price = item.querySelector(".uad-price").textContent
        const location = item.querySelector(".uad-light").textContent
        const updated = item.querySelector(".uad-ultralight").textContent
        return { url, title, price, location, updated }
      } catch (error) {
        console.error(error.message)
        return undefined
      }
    })
    .filter(item => item !== undefined)
    .filter(item => item.updated !== "Előresorolt hirdetés")
    .filter(item => item.price !== "Csere")
}
