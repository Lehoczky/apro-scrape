import { Titlebar, TitlebarColor } from "custom-electron-titlebar"

import icon from "../../resources/icon.png?asset"

export const createTitlebar = () => {
  return new Titlebar({
    backgroundColor: TitlebarColor.fromHex("#383838"),
    icon,
    titleHorizontalAlignment: "center",
    menuPosition: "left",
    shadow: true,
  })
}
