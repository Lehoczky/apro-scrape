import { Titlebar, Color } from "custom-electron-titlebar"
import { iconUrl } from "./icon"

const options = {
  backgroundColor: Color.fromHex("#383838"),
  icon: iconUrl,
  menu: null,
  titleHorizontalAlignment: "left",
  shadow: true,
}

export const createTitlebar = () => new Titlebar(options)
