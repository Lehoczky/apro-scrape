# AproScrape <img src="public/icon.png" alt="logo" width="20">

Get instantly notified for new items you are interested in!

Have you ever browsed HardverApro, found a good deal and wrote to the seller just to
find out someone has already bought the item?  
If you feel like you have to be on the site 24/7 to get something with a very good price,
this app is for you!

## What is AproScrape

AproScrape is a free, opensource web scraper which will periodically check HardveApro
for new items you are searching for and display a notification when it finds one,
so you can contact the seller as fast as you can.

## Installation

Dowload the latest version from the [releases](https://github.com/Lehoczky/apro-scrape/releases) page.
Installers are available for Windows and Linux (OSX support will come eventually).

## Usage

Go to hardverapro.hu, navigate to a topic you are interested in, like the Android phone's page.

In this example I will also use the detailed search option to only see items from Budapest.

![Android page on hardverapro](images/hardverapro.png)

Now hit search, and copy the URL from your browser, then open AproScrape
and paste the link to the input field on the top.

![AproScrape main window](images/main-window.png)

Press the `SCRAPE` button, and you should see deals from the website.

Here comes the fun part: If you minimize the window, it will hide to the taskbar,
and display a notification when it finds new items!

![AproScrape main window](images/notification.png)

Open the app by clicking on the notification or the icon in the taksbar, and click
on the item's link. It will navigate you straight to HardverApro and you can contact
the seller immediately!

_Note: highlighted item are excluded, since they are always at the top of the page and it doesn't make sense to scrape them._

## A word on scraping interval

Scraping interval defines how often the program should check HardverApro for new items.

You can leave it as is (60 seconds). By raising the value, you will get fewer notifications
but possibly with more items. In contrast lowering it may result in more notifications which
can be annoying, but you have the chance to find new item sooner.

## Built with

Special thanks to the creators of these libraries:

<a href="https://vuejs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="vue logo" height="80">
</a>

<a href="https://www.electronjs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg" alt="electron logo" height="100">
</a>

<a href="https://github.com/jsdom/jsdom">
    <img src="https://user-images.githubusercontent.com/3665990/39078998-366c375e-451b-11e8-902d-ce42d8fcaa47.png" alt="jsdom logo" height="100">
</a>
