import { chromium, firefox } from "playwright";

class Browser {
  static browser;
  static page;

  static async _init(browser?: "chromium" | "firefox") {
    if (browser) {
      return;
    }
    switch (browser!) {
      case "chromium":
        Browser.browser = await chromium.launch();
        break;
      case "firefox":
        Browser.browser = await firefox.launch();
        break;
      default:
        Browser.browser = await chromium.launch();
    }

    Browser.page = await Browser.browser.newPage();
  }

  static async navigateTo(url: string, id: string) {
    await Browser.page.goto(url);
    await Browser.page.waitForLoadState("networkidle");
    await Browser.page.screenshot({
      path: `screenshot_${id}_${Date.now()}.png`,
    });
  }
}

export default Browser;
