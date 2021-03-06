import { protocol } from "electron";

export const registerAppScheme = () => {
  protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
  ]);
};

/**
 * Register file protocol to access local files
 *
 * @see {@link https://github.com/electron/electron/issues/23757#issuecomment-640146333}
 */
export const registerFileProtocol = () => {
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = request.url.replace("file:///", "");
    callback(pathname);
  });
};
