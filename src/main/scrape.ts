import dedent from "dedent"
import { CookieJar, JSDOM } from "jsdom"
import { z } from "zod"

import { type SoldItem, soldItemSchema } from "@/shared"

export function createScraper() {
  let lastItem: SoldItem | undefined = undefined

  return async (page: string) => {
    const dom = await fetchDomForPage(page)
    let items = getSellingItems(dom)

    const urls = items.map((item) => item!.url)

    if (lastItem && urls.includes(lastItem.url)) {
      items = items.slice(0, urls.indexOf(lastItem.url))
    }
    if (items.length) {
      lastItem = items[0]
    }
    return items
  }
}

async function fetchDomForPage(page: string) {
  const cookieJar = new CookieJar()
  const COOKIE_TO_FETCH_200_ITEMS = "prf_ls_uad=lstup.d.200.normal"
  if (process.env.NODE_ENV !== "test") {
    cookieJar.setCookieSync(COOKIE_TO_FETCH_200_ITEMS, page)
  }
  return await JSDOM.fromURL(page, { cookieJar, pretendToBeVisual: true })
}

function getSellingItems(dom: JSDOM) {
  return [...dom.window.document.querySelectorAll(".uad-list .media")]
    .filter((domElement) => !isAd(domElement))
    .map(createItemObject)
    .filter((item) => item !== undefined)
    .filter((item) => !item.updated.includes("Előresorolva"))
    .filter((item) => !item.price.includes("Csere"))
}

function isAd(domElement: Element) {
  const ribbon = domElement.querySelector(".uad-corner-ribbon")
  if (ribbon) {
    const ribbonText = ribbon.querySelector("span")!.textContent!
    return removeZeroWidthNoBreakSpace(ribbonText) === "PR"
  }
  return false
}

function createItemObject(domElement: Element): SoldItem | undefined {
  try {
    const itemAnchor = domElement.querySelector<HTMLAnchorElement>("h1 > a")

    const url = itemAnchor?.href
    const title = itemAnchor?.textContent
    const imageSrc =
      domElement.querySelector<HTMLImageElement>(".uad-image > img")?.src
    const price = domElement.querySelector(".uad-price")?.textContent
    const location = domElement.querySelector(".uad-cities")?.textContent
    const updated = domElement.querySelector(".uad-time")?.textContent

    return soldItemSchema.parse({
      url,
      title,
      price,
      location,
      updated,
      imageSrc,
    })
  } catch (error) {
    const html = dedent(domElement.outerHTML)

    if (error instanceof z.ZodError) {
      console.error(error.issues)
    } else if (error instanceof Error) {
      const message = `An error occurred while processing the following element: \n\n${html}\n${error.message}\n`
      console.error(message)
    }
    return undefined
  }
}

function removeZeroWidthNoBreakSpace(text: string) {
  return text.replace(/\uFEFF/g, "")
}
