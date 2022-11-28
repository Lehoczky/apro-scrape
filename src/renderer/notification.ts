import { ipcRenderer } from "electron"

import { SoldItem } from "@/shared"

export function createNewItemNotification(items: SoldItem[]) {
  const title = titleBasedOnItems(items)
  const body = bodyBasedOnItems(items)
  const myNotification = new Notification(title, { body })

  myNotification.onclick = () => ipcRenderer.send("open-window")
}

function titleBasedOnItems(items: SoldItem[]) {
  return items.length === 1
    ? "New item is available"
    : "New items are available"
}

function bodyBasedOnItems(items: SoldItem[]) {
  return items.length === 1
    ? `${items[0].title} - ${items[0].price}`
    : `${items.length} new items found!`
}
