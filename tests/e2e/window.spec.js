/**
 * @group e2e
 */

import spectron from "spectron";
import { testWithSpectron } from "vue-cli-plugin-electron-builder";
jest.setTimeout(50000);

test("a window is created", async () => {
  const { stopServe, app } = await testWithSpectron(spectron);
  expect(await app.client.getWindowCount()).toBe(1);
  await stopServe();
});
