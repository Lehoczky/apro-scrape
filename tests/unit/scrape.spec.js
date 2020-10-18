import { JSDOM } from "jsdom";

import { createScraper } from "@/main/scrape.js";

test("return empty list when no .media element is present", async () => {
  const scrape = createScraper();

  const dom = new JSDOM("<body></body>");
  jest.spyOn(JSDOM, "fromURL").mockImplementation(() => dom);

  const items = await scrape("");
  expect(items).toEqual([]);
});

test("return every item on first call", async () => {
  const scrape = createScraper();

  const dom = new JSDOM(`
    <li class="media">
      <h1><a href="http://example.com/1">Item1</a></h1>
      <div class="uad-price">5000 Ft</div>
      <div class="uad-light">Budapest</div>
      <div class="uad-ultralight">2020-09-07</div>
    </li>

    <li class="media">
      <h1><a href="http://example.com/2">Item2</a></h1>
      <div class="uad-price">6000 Ft</div>
      <div class="uad-light">Budafok</div>
      <div class="uad-ultralight">2020-09-06</div>
    </li>
  `);
  jest.spyOn(JSDOM, "fromURL").mockImplementation(() => dom);

  const items = await scrape("");
  expect(items).toEqual([
    {
      url: "http://example.com/1",
      title: "Item1",
      price: "5000 Ft",
      location: "Budapest",
      updated: "2020-09-07",
    },
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "6000 Ft",
      location: "Budafok",
      updated: "2020-09-06",
    },
  ]);
});

test("skip featured item", async () => {
  const scrape = createScraper();
  const dom = new JSDOM(`
    <li class="media">
      <h1><a href="http://example.com/1">Item1</a></h1>
      <div class="uad-price">5000 Ft</div>
      <div class="uad-light">Budapest</div>
      <div class="uad-ultralight">Előresorolt hirdetés</div>
    </li>

    <li class="media">
      <h1><a href="http://example.com/2">Item2</a></h1>
      <div class="uad-price">6000 Ft</div>
      <div class="uad-light">Budafok</div>
      <div class="uad-ultralight">2020-09-06</div>
    </li>
  `);
  jest.spyOn(JSDOM, "fromURL").mockImplementation(() => dom);

  const items = await scrape("");
  expect(items).toEqual([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "6000 Ft",
      location: "Budafok",
      updated: "2020-09-06",
    },
  ]);
});

test("return only new item | older is present", async () => {
  const scrape = createScraper();
  jest
    .spyOn(JSDOM, "fromURL")
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/1">Item1</a></h1>
          <div class="uad-price">5000 Ft</div>
          <div class="uad-light">Budapest</div>
          <div class="uad-ultralight">ma 19:41</div>
        </li>
      `);
    })
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/2">Item2</a></h1>
          <div class="uad-price">15000 Ft</div>
          <div class="uad-light">Budafok</div>
          <div class="uad-ultralight">ma 19:48</div>
        </li>

        <li class="media">
          <h1><a href="http://example.com/1">Item1</a></h1>
          <div class="uad-price">5000 Ft</div>
          <div class="uad-light">Budapest</div>
          <div class="uad-ultralight">ma 19:41</div>
        </li>
      `);
    });

  let items = await scrape("");
  items = await scrape("");
  expect(items).toEqual([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "15000 Ft",
      location: "Budafok",
      updated: "ma 19:48",
    },
  ]);
});

test("return only new item | old has been removed", async () => {
  const scrape = createScraper();
  jest
    .spyOn(JSDOM, "fromURL")
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/1">Item1</a></h1>
          <div class="uad-price">5000 Ft</div>
          <div class="uad-light">Budapest</div>
          <div class="uad-ultralight">ma 19:41</div>
        </li>
      `);
    })
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/2">Item2</a></h1>
          <div class="uad-price">15000 Ft</div>
          <div class="uad-light">Budafok</div>
          <div class="uad-ultralight">ma 19:48</div>
        </li>
      `);
    });

  let items = await scrape("");
  items = await scrape("");
  expect(items).toEqual([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "15000 Ft",
      location: "Budafok",
      updated: "ma 19:48",
    },
  ]);
});

test("return empty list while there is no new item", async () => {
  const scrape = createScraper();
  jest
    .spyOn(JSDOM, "fromURL")
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/1">Item1</a></h1>
          <div class="uad-price">5000 Ft</div>
          <div class="uad-light">Budapest</div>
          <div class="uad-ultralight">ma 19:41</div>
        </li>
      `);
    })
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/1">Item1</a></h1>
          <div class="uad-price">5000 Ft</div>
          <div class="uad-light">Budapest</div>
          <div class="uad-ultralight">ma 19:41</div>
        </li>
      `);
    })
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/1">Item1</a></h1>
          <div class="uad-price">5000 Ft</div>
          <div class="uad-light">Budapest</div>
          <div class="uad-ultralight">ma 19:41</div>
        </li>
      `);
    })
    .mockImplementationOnce(() => {
      return new JSDOM(`
        <li class="media">
          <h1><a href="http://example.com/2">Item2</a></h1>
          <div class="uad-price">15000 Ft</div>
          <div class="uad-light">Budafok</div>
          <div class="uad-ultralight">ma 19:48</div>
        </li>
      `);
    });

  let items = await scrape("");
  expect(items).toEqual([
    {
      url: "http://example.com/1",
      title: "Item1",
      price: "5000 Ft",
      location: "Budapest",
      updated: "ma 19:41",
    },
  ]);

  items = await scrape("");
  expect(items).toEqual([]);

  items = await scrape("");
  expect(items).toEqual([]);

  items = await scrape("");
  expect(items).toEqual([
    {
      url: "http://example.com/2",
      title: "Item2",
      price: "15000 Ft",
      location: "Budafok",
      updated: "ma 19:48",
    },
  ]);
});
