import { JSDOM } from "jsdom"
import { expect, test, vi } from "vitest"

import type { SoldItem } from "@/shared"

import { createScraper } from "./scrape"

test("return empty list when no .media element is present", async () => {
  const scrape = createScraper()

  const dom = new JSDOM("<body></body>")
  vi.spyOn(JSDOM, "fromURL").mockResolvedValue(dom)

  const items = await scrape("")
  expect(items).toEqual<SoldItem[]>([])
})

test("return every item on first call", async () => {
  const scrape = createScraper()

  const dom = new JSDOM(/*html*/ `
    <div class="uad-list">
      <li class="media">
        <a class="uad-image" href="http://example.com/1">
          <img src="http://example.com/image-1.jpg">
        </a>
        <h1><a href="http://example.com/1">Item1</a></h1>
        <div class="uad-price">5000 Ft</div>
        <div class="uad-light">Budapest</div>
        <div class="uad-ultralight">2020-09-07</div>
      </li>

      <li class="media">
        <a class="uad-image" href="http://example.com/2">
          <img src="http://example.com/image-2.jpg">
        </a>
        <h1><a href="http://example.com/2">Item2</a></h1>
        <div class="uad-price">6000 Ft</div>
        <div class="uad-light">Budafok</div>
        <div class="uad-ultralight">2020-09-06</div>
      </li>
    </div>
  `)
  vi.spyOn(JSDOM, "fromURL").mockResolvedValue(dom)

  const items = await scrape("")
  expect(items).toEqual<SoldItem[]>([
    {
      url: "http://example.com/1",
      title: "Item1",
      price: "5000 Ft",
      location: "Budapest",
      updated: "2020-09-07",
      imageSrc: "http://example.com/image-1.jpg",
    },
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "6000 Ft",
      location: "Budafok",
      updated: "2020-09-06",
      imageSrc: "http://example.com/image-2.jpg",
    },
  ])
})

test("skip featured item", async () => {
  const scrape = createScraper()
  const dom = new JSDOM(/*html*/ `
    <div class="uad-list">
      <li class="media">
        <a class="uad-image" href="http://example.com/1">
          <img src="http://example.com/image-1.jpg">
        </a>
        <h1><a href="http://example.com/1">Item1</a></h1>
        <div class="uad-price">5000 Ft</div>
        <div class="uad-light">Budapest</div>
        <div class="uad-ultralight">Előresorolt hirdetés</div>
      </li>

      <li class="media">
        <a class="uad-image" href="http://example.com/2">
          <img src="http://example.com/image-2.jpg">
        </a>
        <h1><a href="http://example.com/2">Item2</a></h1>
        <div class="uad-price">6000 Ft</div>
        <div class="uad-light">Budafok</div>
        <div class="uad-ultralight">2020-09-06</div>
      </li>
    </div>
  `)
  vi.spyOn(JSDOM, "fromURL").mockResolvedValue(dom)

  const items = await scrape("")
  expect(items).toEqual<SoldItem[]>([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "6000 Ft",
      location: "Budafok",
      updated: "2020-09-06",
      imageSrc: "http://example.com/image-2.jpg",
    },
  ])
})

test("return only new item | older is present", async () => {
  const scrape = createScraper()
  vi.spyOn(JSDOM, "fromURL")
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/1">
              <img src="http://example.com/image-1.jpg">
            </a>
            <h1><a href="http://example.com/1">Item1</a></h1>
            <div class="uad-price">5000 Ft</div>
            <div class="uad-light">Budapest</div>
            <div class="uad-ultralight">ma 19:41</div>
          </li>
        </div>
      `),
    )
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/2">
              <img src="http://example.com/image-2.jpg">
            </a>
            <h1><a href="http://example.com/2">Item2</a></h1>
            <div class="uad-price">15000 Ft</div>
            <div class="uad-light">Budafok</div>
            <div class="uad-ultralight">ma 19:48</div>
          </li>

          <li class="media">
            <a class="uad-image" href="http://example.com/1">
              <img src="http://example.com/image-1.jpg">
            </a>
            <h1><a href="http://example.com/1">Item1</a></h1>
            <div class="uad-price">5000 Ft</div>
            <div class="uad-light">Budapest</div>
            <div class="uad-ultralight">ma 19:41</div>
          </li>
        </div>
      `),
    )

  let items = await scrape("")
  items = await scrape("")
  expect(items).toEqual<SoldItem[]>([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "15000 Ft",
      location: "Budafok",
      updated: "ma 19:48",
      imageSrc: "http://example.com/image-2.jpg",
    },
  ])
})

test("return only new item | old has been removed", async () => {
  const scrape = createScraper()
  vi.spyOn(JSDOM, "fromURL")
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/1">
              <img src="http://example.com/image-1.jpg">
            </a>
            <h1><a href="http://example.com/1">Item1</a></h1>
            <div class="uad-price">5000 Ft</div>
            <div class="uad-light">Budapest</div>
            <div class="uad-ultralight">ma 19:41</div>
          </li>
        </div>
      `),
    )
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/2">
              <img src="http://example.com/image-2.jpg">
            </a>
            <h1><a href="http://example.com/2">Item2</a></h1>
            <div class="uad-price">15000 Ft</div>
            <div class="uad-light">Budafok</div>
            <div class="uad-ultralight">ma 19:48</div>
          </li>
        </div>
      `),
    )

  let items = await scrape("")
  items = await scrape("")
  expect(items).toEqual<SoldItem[]>([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "15000 Ft",
      location: "Budafok",
      updated: "ma 19:48",
      imageSrc: "http://example.com/image-2.jpg",
    },
  ])
})

test("return empty list while there is no new item", async () => {
  const scrape = createScraper()
  vi.spyOn(JSDOM, "fromURL")
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/1">
              <img src="http://example.com/image-1.jpg">
            </a>
            <h1><a href="http://example.com/1">Item1</a></h1>
            <div class="uad-price">5000 Ft</div>
            <div class="uad-light">Budapest</div>
            <div class="uad-ultralight">ma 19:41</div>
          </li>
        </div>
      `),
    )
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/1">
              <img src="http://example.com/image-1.jpg">
            </a>
            <h1><a href="http://example.com/1">Item1</a></h1>
            <div class="uad-price">5000 Ft</div>
            <div class="uad-light">Budapest</div>
            <div class="uad-ultralight">ma 19:41</div>
          </li>
        </div>
      `),
    )
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/1">
              <img src="http://example.com/image-1.jpg">
            </a>
            <h1><a href="http://example.com/1">Item1</a></h1>
            <div class="uad-price">5000 Ft</div>
            <div class="uad-light">Budapest</div>
            <div class="uad-ultralight">ma 19:41</div>
          </li>
        </div>
      `),
    )
    .mockResolvedValueOnce(
      new JSDOM(/*html*/ `
        <div class="uad-list">
          <li class="media">
            <a class="uad-image" href="http://example.com/2">
              <img src="http://example.com/image-2.jpg">
            </a>
            <h1><a href="http://example.com/2">Item2</a></h1>
            <div class="uad-price">15000 Ft</div>
            <div class="uad-light">Budafok</div>
            <div class="uad-ultralight">ma 19:48</div>
          </li>
        </div>
      `),
    )

  let items = await scrape("")
  expect(items).toEqual<SoldItem[]>([
    {
      url: "http://example.com/1",
      title: "Item1",
      price: "5000 Ft",
      location: "Budapest",
      updated: "ma 19:41",
      imageSrc: "http://example.com/image-1.jpg",
    },
  ])

  items = await scrape("")
  expect(items).toEqual<SoldItem[]>([])

  items = await scrape("")
  expect(items).toEqual<SoldItem[]>([])

  items = await scrape("")
  expect(items).toEqual<SoldItem[]>([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "15000 Ft",
      location: "Budafok",
      updated: "ma 19:48",
      imageSrc: "http://example.com/image-2.jpg",
    },
  ])
})
