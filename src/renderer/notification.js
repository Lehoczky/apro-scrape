export const createNewItemNotification = (items, window) => {
  const title = titleBasedOnItems(items);
  const body = bodyBasedOnItems(items);
  const myNotification = new Notification(title, { body });

  myNotification.onclick = window.show;
};

const titleBasedOnItems = items => {
  return items.length == 1
    ? "New item is available"
    : "New items are available";
};

const bodyBasedOnItems = items => {
  return items.length == 1
    ? `${items[0].title} - ${items[0].price}`
    : `${items.length} new items found!`;
};
