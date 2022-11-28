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
  if (process.env.JEST_WORKER_ID === undefined) {
    cookieJar.setCookieSync(COOKIE_TO_FETCH_200_ITEMS, page)
  }
  return await JSDOM.fromURL(page, { cookieJar })
}

async function getSellingItems(dom) {
  return Array.from(dom.window.document.querySelectorAll(".media"))
    .filter(domElement => !isAd(domElement))
    .map(createItemObject)
    .filter(item => item !== undefined)
    .filter(item => item.updated !== "Előresorolt hirdetés")
    .filter(item => item.price !== "Csere")
}

function isAd(domElement) {
  const ribbon = domElement.querySelector(".uad-corner-ribbon")
  if (ribbon) {
    const ribbonText = ribbon.querySelector("span").textContent
    return removeZeroWidthNoBreakSpace(ribbonText) === "PR"
  }
  return false
}

function createItemObject(domElement) {
  try {
    const url = domElement.querySelector("h1 > a").href
    const title = domElement.querySelector("h1 > a").textContent
    const price = domElement.querySelector(".uad-price").textContent
    const location = domElement.querySelector(".uad-light").textContent
    const updated = domElement.querySelector(".uad-ultralight").textContent
    return { url, title, price, location, updated }
  } catch (error) {
    console.error(error.message)
    return undefined
  }
}

function removeZeroWidthNoBreakSpace(text) {
  return text.replace(/\uFEFF/g, "")
}
