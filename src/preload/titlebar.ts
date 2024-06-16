import { Titlebar, TitlebarColor } from "custom-electron-titlebar"
import type { TitleBarOptions } from "custom-electron-titlebar/titlebar/options"

import icon from "../../resources/icon.png?asset"

const options: TitleBarOptions = {
  backgroundColor: TitlebarColor.fromHex("#383838"),
  icon,
  titleHorizontalAlignment: "center",
  menuPosition: "left",
  shadow: true,
}

export const createTitlebar = () => new Titlebar(options)
