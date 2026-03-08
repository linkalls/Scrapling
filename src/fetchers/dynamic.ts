import { chromium, Browser, BrowserContext, Page, Route, Request as PWRequest } from "playwright";
import { ResponseModel } from "../core/types";
import { EXTRA_RESOURCES, DEFAULT_ARGS, STEALTH_ARGS } from "../core/constants";

export type PlaywrightSessionOptions = {
  headless?: boolean;
  disable_resources?: boolean;
  blocked_domains?: string[];
  useragent?: string;
  cookies?: any[];
  network_idle?: boolean;
  load_dom?: boolean;
  timeout?: number;
  wait?: number;
  wait_selector?: string;
  wait_selector_state?: "attached" | "detached" | "visible" | "hidden";
  real_chrome?: boolean;
  cdp_url?: string;
  google_search?: boolean;
  extra_headers?: Record<string, string>;
  proxy?: string;
  extra_flags?: string[];
};

export class DynamicFetcher {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private options: PlaywrightSessionOptions;

  constructor(options: PlaywrightSessionOptions = {}) {
    this.options = {
      headless: true,
      disable_resources: false,
      blocked_domains: [],
      network_idle: false,
      load_dom: true,
      timeout: 30000,
      wait: 0,
      google_search: true,
      wait_selector_state: "attached",
      ...options,
    };
  }

  private async setup() {
    if (this.browser || this.context) return;

    let args = [...DEFAULT_ARGS, ...STEALTH_ARGS];
    if (this.options.extra_flags) {
      args = args.concat(this.options.extra_flags);
    }

    if (this.options.cdp_url) {
      this.browser = await chromium.connectOverCDP(this.options.cdp_url);
    } else {
      this.browser = await chromium.launch({
        headless: this.options.headless,
        args: args,
      });
    }

    this.context = await this.browser.newContext({
      userAgent: this.options.useragent,
      extraHTTPHeaders: this.options.extra_headers,
    });

    if (this.options.cookies) {
      await this.context.addCookies(this.options.cookies);
    }
  }

  public async fetch(url: string): Promise<ResponseModel> {
    await this.setup();
    if (!this.context) throw new Error("Context not initialized");

    const page: Page = await this.context.newPage();

    if (this.options.disable_resources || (this.options.blocked_domains && this.options.blocked_domains.length > 0)) {
      await page.route("**/*", (route: Route, request: PWRequest) => {
        if (this.options.disable_resources && EXTRA_RESOURCES.has(request.resourceType())) {
          return route.abort();
        }

        if (this.options.blocked_domains) {
          const reqUrl = new URL(request.url());
          for (const domain of this.options.blocked_domains) {
            if (reqUrl.hostname === domain || reqUrl.hostname.endsWith(`.${domain}`)) {
              return route.abort();
            }
          }
        }

        return route.continue();
      });
    }

    let referer = undefined;
    if (this.options.google_search) {
      const parsedUrl = new URL(url);
      referer = `https://www.google.com/search?q=${parsedUrl.hostname}`;
    }

    const waitUntil = this.options.network_idle ? "networkidle" : this.options.load_dom ? "domcontentloaded" : "load";

    const response = await page.goto(url, {
      waitUntil: waitUntil,
      timeout: this.options.timeout,
      referer: referer,
    });

    if (this.options.wait_selector) {
      await page.waitForSelector(this.options.wait_selector, {
        state: this.options.wait_selector_state,
        timeout: this.options.timeout,
      });
    }

    if (this.options.wait && this.options.wait > 0) {
      await page.waitForTimeout(this.options.wait);
    }

    const content = await page.content();
    const status = response ? response.status() : 200;
    const headers = response ? response.headers() : {};

    await page.close();

    return {
      url: url,
      status: status,
      body: content,
      headers: headers,
    };
  }

  public async close() {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    this.context = null;
    this.browser = null;
  }
}
