import { Color, Titlebar } from "custom-electron-titlebar/dist"
import type { TitlebarOptions } from "custom-electron-titlebar/dist/interfaces"

import { iconUrl } from "./icon"

const options: TitlebarOptions = {
  backgroundColor: Color.fromHex("#383838"),
  icon: iconUrl,
  menu: null,
  titleHorizontalAlignment: "left",
  shadow: true,
}

export const createTitlebar = () => new Titlebar(options)
