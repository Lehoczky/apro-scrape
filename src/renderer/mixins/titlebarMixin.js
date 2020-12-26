import { Titlebar, Color } from "custom-electron-titlebar";
import logo from "../assets/logo.png";

export default {
  data() {
    return {
      titlebar: undefined,
    };
  },
  mounted() {
    this.titlebar = new Titlebar({
      backgroundColor: Color.fromHex("#383838"),
      icon: logo,
      menu: null,
      titleHorizontalAlignment: "left",
      shadow: true,
    });
  },
  destroyed() {
    this.titlebar.dispose();
  },
};
