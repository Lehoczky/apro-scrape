# AproScrape <img src="resources/icon.png" alt="logo" width="40">

[![Downloads](https://img.shields.io/github/downloads/Lehoczky/apro-scrape/total.svg)](https://GitHub.com/Lehoczky/apro-scrape/releases/)
[![CI](https://github.com/Lehoczky/apro-scrape/actions/workflows/ci.yml/badge.svg)](https://github.com/Lehoczky/apro-scrape/actions/workflows/ci.yml)
[![Build/release](https://github.com/Lehoczky/apro-scrape/actions/workflows/release.yml/badge.svg)](https://github.com/Lehoczky/apro-scrape/actions/workflows/release.yml)

Get instantly notified about new items you are interested in!

Have you ever browsed [HardverApro](http://hardverapro.hu/index.html),
found a good deal and wrote to the seller just to find out someone has already bought the item?  
If you feel like you have to be on the site 24/7 to get something with a very good price,
this app is for you!

## What is AproScrape

AproScrape is a free, opensource web scraper which will periodically check HardverApro
for new items you are searching for and display a notification when it finds one,
so you can contact the seller as fast as you can.

## Installation

Download the latest version from the [releases](https://github.com/Lehoczky/apro-scrape/releases) page.
Installers are available for all platforms (Windows, Linux, OSX).

## Usage

Go to hardverapro.hu, navigate to a topic you are interested in, like the Android phone's page.

In this example I will also use the detailed search option to only see items from Budapest.

<img src="docs/images/hardverapro.png" alt="Android page on hardverapro" width="650">

Now hit search, and copy the URL from your browser, then open AproScrape
and paste the link to the input field on the top.

<img src="docs/images/main-window.png" alt="AproScrape main window" width="650">

Press the `Scrape` button, and you should see deals from the website.

Here comes the fun part: If you minimize the window, it will hide to the taskbar,
and display a notification when it finds new items!

<img src="docs/images/notification.png" alt="AproScrape main window">

Open the app by clicking on the notification or the icon in the taskbar, and click
on the item's link. It will navigate you straight to HardverApro and you can contact
the seller immediately!

_Note: highlighted item are excluded, since they are always at the top of the page and it doesn't make sense to scrape them._

## Feedback

Feedbacks are always welcome! If you have an idea how to make AproScrape better or found a bug,
[open a new issue](https://github.com/Lehoczky/apro-scrape/issues) and I'll read it for sure.
Pull requests are also appreciated!

## Built with

Special thanks to the creators of these libraries:

<a href="https://vuejs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="vue logo" height="100">
</a>

<a href="https://www.electronjs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg" alt="electron logo" height="100">
</a>

<a href="https://github.com/jsdom/jsdom">
    <img src="https://user-images.githubusercontent.com/3665990/39078998-366c375e-451b-11e8-902d-ce42d8fcaa47.png" alt="jsdom logo" height="100">
</a>
