import { chromium, devices } from "playwright";

class Browser {
  static browser;

  constructor() {
    if (!Browser.browser) {
      Browser.browser = chromium.launch({ headless: false });
    }
  }
}

export default Browser;
