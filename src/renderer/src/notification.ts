import type { SoldItem } from "@shared"

export function createNewItemNotification(items: SoldItem[]) {
  const { title, body } = createNotificationText(items)
  const myNotification = new Notification(title, { body })

  myNotification.onclick = () => window.api.openWindow()
}

function createNotificationText(items: SoldItem[]) {
  return items.length === 1
    ? {
        title: "New item is available",
        body: `${items[0].title} - ${items[0].price}`,
      }
    : {
        title: "New items are available",
        body: `${items.length} new items found!`,
      }
}
