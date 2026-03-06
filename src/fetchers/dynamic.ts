import { chromium, Browser, Page } from 'playwright';
import { Selector } from '../parser';

export class DynamicFetcher {
    static async fetch(url: string, options: { headless?: boolean } = {}): Promise<Selector> {
        const browser = await chromium.launch({ headless: options.headless ?? true });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url);
        const content = await page.content();
        await browser.close();
        return new Selector(content, undefined, undefined, url);
    }
}

export class DynamicSession {
    private browser: Browser | null = null;
    private options: { headless?: boolean };

    constructor(options: { headless?: boolean } = {}) {
        this.options = options;
    }

    async start() {
        this.browser = await chromium.launch({ headless: this.options.headless ?? true });
    }

    async stop() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    async fetch(url: string): Promise<Selector> {
        if (!this.browser) {
            await this.start();
        }
        const context = await this.browser!.newContext();
        const page = await context.newPage();
        await page.goto(url);
        const content = await page.content();
        await page.close();
        return new Selector(content, undefined, undefined, url);
    }
}
