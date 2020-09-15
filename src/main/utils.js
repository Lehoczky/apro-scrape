import axios from "axios";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

export const canReach = async url => {
  try {
    await axios.head(url);
    return true;
  } catch {
    return false;
  }
};

export const installVueDevtools = async () => {
  try {
    await installExtension(VUEJS_DEVTOOLS);
  } catch (e) {
    console.error("Vue Devtools failed to install:", e.toString());
  }
};
