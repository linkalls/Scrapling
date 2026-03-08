<!-- mcp-name: io.github.D4Vinci/Scrapling -->

<h1 align="center">
    <a href="https://scrapling.readthedocs.io">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/docs/assets/cover_dark.svg?sanitize=true">
          <img alt="Scrapling Poster" src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/docs/assets/cover_light.svg?sanitize=true">
        </picture>
    </a>
    <br>
    <small>Effortless Web Scraping for the Modern Web</small>
</h1>

<p align="center">
    <a href="https://trendshift.io/repositories/14244" target="_blank"><img src="https://trendshift.io/api/badge/repositories/14244" alt="D4Vinci%2FScrapling | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
    <br/>
    <a href="https://github.com/D4Vinci/Scrapling/blob/main/docs/README_AR.md">العربيه</a> | <a href="https://github.com/D4Vinci/Scrapling/blob/main/docs/README_ES.md">Español</a> | <a href="https://github.com/D4Vinci/Scrapling/blob/main/docs/README_FR.md">Français</a> | <a href="https://github.com/D4Vinci/Scrapling/blob/main/docs/README_DE.md">Deutsch</a> | <a href="https://github.com/D4Vinci/Scrapling/blob/main/docs/README_CN.md">简体中文</a> | <a href="https://github.com/D4Vinci/Scrapling/blob/main/docs/README_JP.md">日本語</a> |  <a href="https://github.com/D4Vinci/Scrapling/blob/main/docs/README_RU.md">Русский</a>
    <br/>
    <a href="https://github.com/D4Vinci/Scrapling/actions/workflows/tests.yml" alt="Tests">
        <img alt="Tests" src="https://github.com/D4Vinci/Scrapling/actions/workflows/tests.yml/badge.svg"></a>
    <br/>
    <a href="https://discord.gg/EMgGbDceNQ" alt="Discord" target="_blank">
      <img alt="Discord" src="https://img.shields.io/discord/1360786381042880532?style=social&logo=discord&link=https%3A%2F%2Fdiscord.gg%2FEMgGbDceNQ">
    </a>
    <a href="https://x.com/Scrapling_dev" alt="X (formerly Twitter)">
      <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/Scrapling_dev?style=social&logo=x&link=https%3A%2F%2Fx.com%2FScrapling_dev">
    </a>
    <br/>
    </p>

<p align="center">
    <a href="https://scrapling.readthedocs.io/en/latest/parsing/selection/"><strong>Selection methods</strong></a>
    &middot;
    <a href="https://scrapling.readthedocs.io/en/latest/fetching/choosing/"><strong>Fetchers</strong></a>
    &middot;
    <a href="https://scrapling.readthedocs.io/en/latest/spiders/architecture.html"><strong>Spiders</strong></a>
    &middot;
    <a href="https://scrapling.readthedocs.io/en/latest/spiders/proxy-blocking.html"><strong>Proxy Rotation</strong></a>
    &middot;
    <a href="https://scrapling.readthedocs.io/en/latest/cli/overview/"><strong>CLI</strong></a>
    &middot;
    <a href="https://scrapling.readthedocs.io/en/latest/ai/mcp-server/"><strong>MCP</strong></a>
</p>

Scrapling is an adaptive Web Scraping framework that handles everything from a single request to a full-scale crawl.

Its parser learns from website changes and automatically relocates your elements when pages update. Its fetchers bypass anti-bot systems like Cloudflare Turnstile out of the box. And its spider framework lets you scale up to concurrent, multi-session crawls with pause/resume and automatic proxy rotation — all in a few lines of TypeScript. One library, zero compromises.

Blazing fast crawls with real-time stats and streaming. Built by Web Scrapers for Web Scrapers and regular users, there's something for everyone.

```typescript
import { StealthyFetcher } from 'scrapling/fetchers';
StealthyFetcher.adaptive = true;
const p = await StealthyFetcher.fetch('https://example.com', { headless: true, networkIdle: true }); // Fetch website under the radar!
let products = p.css('.product', { autoSave: true });                                  // Scrape data that survives website design changes!
products = p.css('.product', { adaptive: true });                                      // Later, if the website structure changes, pass `adaptive=true` to find them!
```
Or scale up to full crawls
```typescript
import { Spider, Response } from 'scrapling/spiders';

class MySpider extends Spider {
  name = "demo";
  startUrls = ["https://example.com/"];

  async *parse(response: Response) {
      for (const item of response.css('.product')) {
          yield { title: item.css('h2::text').get() };
      }
  }
}

const spider = new MySpider();
spider.start();
```

<p align="center">
    <a href="https://dataimpulse.com/?utm_source=scrapling&utm_medium=banner&utm_campaign=scrapling" target="_blank" style="display:flex; justify-content:center; padding:4px 0;">
        <img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/DataImpulse.png" alt="At DataImpulse, we specialize in developing custom proxy services for your business. Make requests from anywhere, collect data, and enjoy fast connections with our premium proxies." style="max-height:60px;">
    </a>
</p>

# Platinum Sponsors
<table>
  <tr>
    <td width="240">
      <a href="https://hypersolutions.co/?utm_source=github&utm_medium=readme&utm_campaign=scrapling" target="_blank" title="Bot Protection Bypass API for Akamai, DataDome, Incapsula & Kasada">
        <img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/HyperSolutions.png">
        <br />
      </a> 🚀 <a href="https://hypersolutions.co?utm_source=github&utm_medium=readme&utm_campaign=scrapling">
        <b>Subscribe</b>
      </a> | 💬 <a href="https://discord.gg/akamai">
        <b>Discord</b>
      </a>
    </td>
    <td> Scrapling's fetchers handle Cloudflare Turnstile, but for enterprise-grade protection, <a href="https://hypersolutions.co?utm_source=github&utm_medium=readme&utm_campaign=scrapling" title="Bot Protection Bypass API for Akamai, DataDome, Incapsula & Kasada">Hyper Solutions</a> provides API endpoints that generate valid antibot tokens for: <b>Akamai</b> • <b>DataDome</b> • <b>Kasada</b> • <b>Incapsula</b>
      <br /> No browser automation. Simple API calls returning the exact cookies and headers these systems require.
    </td>
  </tr>
  <tr>
    <td width="240">
      <a href="https://birdproxies.com/t/scrapling" target="_blank" title="At Bird Proxies, we eliminate your pains such as banned IPs, geo restriction, and high costs so you can focus on your work.">
        <img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/BirdProxies.jpg">
        <br />
      </a>
    </td>
    <td>Hey, we built BirdProxies because proxies shouldn't be complicated or overpriced. Fast residential and ISP proxies in 195+ locations, fair pricing, and real support. <br />
      <b>Try our FlappyBird game on the landing page for free data!</b>
      <br /> 🚀 <a href="https://birdproxies.com/t/scrapling">
        <b>Try Now</b>
      </a> | 💬 <a href="https://discord.com/invite/birdproxies">
        <b>Discord</b>
      </a>
    </td>
  </tr>
</table>

<i><sub>Do you want to show your ad here? Click [here](https://github.com/sponsors/D4Vinci/sponsorships?tier_id=586646)</sub></i>
# Sponsors 

<!-- sponsors -->

<a href="https://www.thordata.com/?ls=github&lk=github" target="_blank" title="Unblockable proxies and scraping infrastructure, delivering real-time, reliable web data to power AI models and workflows."><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/thordata.jpg"></a>
<a href="https://evomi.com?utm_source=github&utm_medium=banner&utm_campaign=d4vinci-scrapling" target="_blank" title="Evomi is your Swiss Quality Proxy Provider, starting at $0.49/GB"><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/evomi.png"></a>
<a href="https://serpapi.com/?utm_source=scrapling" target="_blank" title="Scrape Google and other search engines with SerpApi"><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/SerpApi.png"></a>
<a href="https://visit.decodo.com/Dy6W0b" target="_blank" title="Try the Most Efficient Residential Proxies for Free"><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/decodo.png"></a>
<a href="https://petrosky.io/d4vinci" target="_blank" title="PetroSky delivers cutting-edge VPS hosting."><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/petrosky.png"></a>
<a href="https://hasdata.com/?utm_source=github&utm_medium=banner&utm_campaign=D4Vinci" target="_blank" title="The web scraping service that actually beats anti-bot systems!"><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/hasdata.png"></a>
<a href="https://proxyempire.io/?ref=scrapling&utm_source=scrapling" target="_blank" title="Collect The Data Your Project Needs with the Best Residential Proxies"><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/ProxyEmpire.png"></a>


<a href="https://www.swiftproxy.net/" target="_blank" title="Unlock Reliable Proxy Services with Swiftproxy!"><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/swiftproxy.png"></a>
<a href="https://www.rapidproxy.io/?ref=d4v" target="_blank" title="Affordable Access to the Proxy World – bypass CAPTCHAs blocks, and avoid additional costs."><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/rapidproxy.jpg"></a>
<a href="https://browser.cash/?utm_source=D4Vinci&utm_medium=referral" target="_blank" title="Browser Automation & AI Browser Agent Platform"><img src="https://raw.githubusercontent.com/D4Vinci/Scrapling/main/images/browserCash.png"></a>

<!-- /sponsors -->

<i><sub>Do you want to show your ad here? Click [here](https://github.com/sponsors/D4Vinci) and choose the tier that suites you!</sub></i>

---

## Key Features

### Spiders — A Full Crawling Framework
- 🕷️ **Robust Spider API**: Define spiders with `start_urls`, async `parse` callbacks, and `Request`/`Response` objects.
- ⚡ **Concurrent Crawling**: Configurable concurrency limits, per-domain throttling, and download delays.
- 🔄 **Multi-Session Support**: Unified interface for HTTP requests, and stealthy headless browsers in a single spider — route requests to different sessions by ID.
- 💾 **Pause & Resume**: Checkpoint-based crawl persistence. Press Ctrl+C for a graceful shutdown; restart to resume from where you left off.
- 📡 **Streaming Mode**: Stream scraped items as they arrive via `async for item in spider.stream()` with real-time stats — ideal for UI, pipelines, and long-running crawls.
- 🛡️ **Blocked Request Detection**: Automatic detection and retry of blocked requests with customizable logic.
- 📦 **Built-in Export**: Export results through hooks and your own pipeline or the built-in JSON/JSONL with `result.items.toJson()` / `result.items.toJsonl()` respectively.

### Advanced Websites Fetching with Session Support
- **HTTP Requests**: Fast and stealthy HTTP requests with the `Fetcher` class. Can impersonate browsers' TLS fingerprint, headers, and use HTTP/3.
- **Dynamic Loading**: Fetch dynamic websites with full browser automation through the `DynamicFetcher` class supporting Playwright's Chromium and Google's Chrome.
- **Anti-bot Bypass**: Advanced stealth capabilities with `StealthyFetcher` and fingerprint spoofing. Can easily bypass all types of Cloudflare's Turnstile/Interstitial with automation.
- **Session Management**: Persistent session support with `FetcherSession`, `StealthySession`, and `DynamicSession` classes for cookie and state management across requests.
- **Proxy Rotation**: Built-in `ProxyRotator` with cyclic or custom rotation strategies across all session types, plus per-request proxy overrides.
- **Domain Blocking**: Block requests to specific domains (and their subdomains) in browser-based fetchers.
- **Async Support**: Complete async support across all fetchers and dedicated async session classes.

### Adaptive Scraping & AI Integration
- 🔄 **Smart Element Tracking**: Relocate elements after website changes using intelligent similarity algorithms.
- 🎯 **Smart Flexible Selection**: CSS selectors, XPath selectors, filter-based search, text search, regex search, and more.
- 🔍 **Find Similar Elements**: Automatically locate elements similar to found elements.
- 🤖 **MCP Server to be used with AI**: Built-in MCP server for AI-assisted Web Scraping and data extraction. The MCP server features powerful, custom capabilities that leverage Scrapling to extract targeted content before passing it to the AI (Claude/Cursor/etc), thereby speeding up operations and reducing costs by minimizing token usage. ([demo video](https://www.youtube.com/watch?v=qyFk3ZNwOxE))

### High-Performance & battle-tested Architecture
- 🚀 **Lightning Fast**: Optimized performance outperforming most TypeScript scraping libraries.
- 🔋 **Memory Efficient**: Optimized data structures and lazy loading for a minimal memory footprint.
- ⚡ **Fast JSON Serialization**: 10x faster than the standard library.
- 🏗️ **Battle tested**: Not only does Scrapling have 92% test coverage and full type hints coverage, but it has been used daily by hundreds of Web Scrapers over the past year.

### Developer/Web Scraper Friendly Experience
- 🎯 **Interactive Web Scraping Shell**: Optional built-in REPL with Scrapling integration, shortcuts, and new tools to speed up Web Scraping scripts development, like converting curl requests to Scrapling requests and viewing requests results in your browser.
- 🚀 **Use it directly from the Terminal**: Optionally, you can use Scrapling to scrape a URL without writing a single line of code!
- 🛠️ **Rich Navigation API**: Advanced DOM traversal with parent, sibling, and child navigation methods.
- 🧬 **Enhanced Text Processing**: Built-in regex, cleaning methods, and optimized string operations.
- 📝 **Auto Selector Generation**: Generate robust CSS/XPath selectors for any element.
- 🔌 **Familiar API**: Similar to BeautifulSoup with the same pseudo-elements used in Parsel.
- 📘 **Complete Type Coverage**: Full type hints for excellent IDE support and code completion. The entire codebase is automatically written in **TypeScript**.
- 🔋 **Ready Docker image**: With each release, a Docker image containing all browsers is automatically built and pushed.

## Getting Started

Let's give you a quick glimpse of what Scrapling can do without deep diving.

### Basic Usage
HTTP requests with session support
```typescript
import { Fetcher, FetcherSession } from 'scrapling/fetchers';

const session = new FetcherSession({ impersonate: 'chrome' }); // Use latest version of Chrome's TLS fingerprint
const page = await session.get('https://quotes.toscrape.com/', { stealthyHeaders: true });
const quotes = page.css('.quote .text::text').getAll();
await session.close();

// Or use one-off requests
const page2 = await Fetcher.get('https://quotes.toscrape.com/');
const quotes2 = page2.css('.quote .text::text').getAll();
```
Advanced stealth mode
```typescript
import { StealthyFetcher, StealthySession } from 'scrapling/fetchers';

const session = new StealthySession({ headless: true, solveCloudflare: true }); // Keep the browser open until you finish
const page = await session.fetch('https://nopecha.com/demo/cloudflare', { googleSearch: false });
const data = page.css('#padded_content a').getAll();
await session.close();

// Or use one-off request style, it opens the browser for this request, then closes it after finishing
const page2 = await StealthyFetcher.fetch('https://nopecha.com/demo/cloudflare');
const data2 = page2.css('#padded_content a').getAll();
```
Full browser automation
```typescript
import { DynamicFetcher, DynamicSession } from 'scrapling/fetchers';

const session = new DynamicSession({ headless: true, disableResources: false, networkIdle: true }); // Keep the browser open until you finish
const page = await session.fetch('https://quotes.toscrape.com/', { loadDom: false });
const data = page.xpath('//span[@class="text"]/text()').getAll(); // XPath selector if you prefer it
await session.close();

// Or use one-off request style, it opens the browser for this request, then closes it after finishing
const page2 = await DynamicFetcher.fetch('https://quotes.toscrape.com/');
const data2 = page2.css('.quote .text::text').getAll();
```

### Spiders
Build full crawlers with concurrent requests, multiple session types, and pause/resume:
```typescript
import { Spider, Response } from 'scrapling/spiders';

class QuotesSpider extends Spider {
    name = "quotes";
    startUrls = ["https://quotes.toscrape.com/"];
    concurrentRequests = 10;
    
    async *parse(response: Response) {
        for (const quote of response.css('.quote')) {
            yield {
                text: quote.css('.text::text').get(),
                author: quote.css('.author::text').get(),
            };
        }
            
        const nextPage = response.css('.next a');
        if (nextPage) {
            yield response.follow(nextPage[0].attrib['href']);
        }
    }
}

const spider = new QuotesSpider();
const result = await spider.start();
console.log(`Scraped ${result.items.length} quotes`);
result.items.toJson("quotes.json");
```
Use multiple session types in a single spider:
```typescript
import { Spider, Request, Response } from 'scrapling/spiders';
import { FetcherSession, AsyncStealthySession } from 'scrapling/fetchers';

class MultiSessionSpider extends Spider {
    name = "multi";
    startUrls = ["https://example.com/"];
    
    configureSessions(manager: any) {
        manager.add("fast", new FetcherSession({ impersonate: "chrome" }));
        manager.add("stealth", new AsyncStealthySession({ headless: true }), { lazy: true });
    }
    
    async *parse(response: Response) {
        for (const link of response.css('a::attr(href)').getAll()) {
            // Route protected pages through the stealth session
            if (link.includes("protected")) {
                yield new Request(link, { sid: "stealth" });
            } else {
                yield new Request(link, { sid: "fast", callback: this.parse }); // explicit callback
            }
        }
    }
}
```
Pause and resume long crawls with checkpoints by running the spider like this:
```typescript
const spider = new QuotesSpider({ crawlDir: "./crawl_data" });
spider.start();
```
Press Ctrl+C to pause gracefully — progress is saved automatically. Later, when you start the spider again, pass the same `crawldir`, and it will resume from where it stopped.

### Advanced Parsing & Navigation
```typescript
import { Fetcher } from 'scrapling/fetchers';

// Rich element selection and navigation
const page = await Fetcher.get('https://quotes.toscrape.com/');

// Get quotes with multiple selection methods
let quotes = page.css('.quote'); // CSS selector
quotes = page.xpath('//div[@class="quote"]'); // XPath
quotes = page.findAll('div', { 'class': 'quote' }); // BeautifulSoup-style
// Find element by text content
quotes = page.findByText('quote', { tag: 'div' });

// Advanced navigation
let quoteText = page.css('.quote')[0].css('.text::text').get();
quoteText = page.css('.quote').css('.text::text').getAll(); // Chained selectors
const firstQuote = page.css('.quote')[0];
const author = firstQuote.nextSibling.css('.author::text');
const parentContainer = firstQuote.parent;

// Element relationships and similarity
const similarElements = firstQuote.findSimilar();
const belowElements = firstQuote.belowElements();
```
You can use the parser right away if you don't want to fetch websites like below:
```typescript
import { Selector } from 'scrapling/parser';

const page = new Selector("<html>...</html>");
```
And it works precisely the same way!

### Async Session Management Examples
```typescript
import { FetcherSession, AsyncStealthySession } from 'scrapling/fetchers';

const session = new FetcherSession({ http3: true }); // `FetcherSession` is context-aware and can work in both sync/async patterns
const page1 = await session.get('https://quotes.toscrape.com/');
const page2 = await session.get('https://quotes.toscrape.com/', { impersonate: 'firefox135' });
await session.close();

// Async session usage
const asyncSession = new AsyncStealthySession({ maxPages: 2 });
const tasks = [];
const urls = ['https://example.com/page1', 'https://example.com/page2'];

for (const url of urls) {
    tasks.push(asyncSession.fetch(url));
}

console.log(asyncSession.getPoolStats()); // Optional - The status of the browser tabs pool (busy/free/error)
const results = await Promise.all(tasks);
console.log(asyncSession.getPoolStats());
await asyncSession.close();
```

## CLI & Interactive Shell

Scrapling includes a powerful command-line interface:

[![asciicast](https://asciinema.org/a/736339.svg)](https://asciinema.org/a/736339)

Launch the interactive Web Scraping shell
```bash
scrapling shell
```
Extract pages to a file directly without programming (Extracts the content inside the `body` tag by default). If the output file ends with `.txt`, then the text content of the target will be extracted. If it ends in `.md`, it will be a Markdown representation of the HTML content; if it ends in `.html`, it will be the HTML content itself.
```bash
scrapling extract get 'https://example.com' content.md
scrapling extract get 'https://example.com' content.txt --css-selector '#fromSkipToProducts' --impersonate 'chrome'  # All elements matching the CSS selector '#fromSkipToProducts'
scrapling extract fetch 'https://example.com' content.md --css-selector '#fromSkipToProducts' --no-headless
scrapling extract stealthy-fetch 'https://nopecha.com/demo/cloudflare' captchas.html --css-selector '#padded_content a' --solve-cloudflare
```

> [!NOTE]
> There are many additional features, but we want to keep this page concise, including the MCP server and the interactive Web Scraping Shell. Check out the full documentation [here](https://scrapling.readthedocs.io/en/latest/)

## Performance Benchmarks

Scrapling isn't just powerful—it's also blazing fast. The following benchmarks compare Scrapling's parser with the latest versions of other popular libraries.

### Text Extraction Speed Test (5000 nested elements)

| # |      Library      | Time (ms) | vs Scrapling | 
|---|:-----------------:|:---------:|:------------:|
| 1 |     Scrapling     |   2.02    |     1.0x     |
| 3 |     Raw Lxml      |   2.54    |    1.257     |
| 5 |    Selectolax     |   82.63   |     ~41x     |
| 6 |  MechanicalSoup   |  1549.71  |   ~767.1x    |
| 7 |   BS4 with Lxml   |  1584.31  |   ~784.3x    |
| 8 | BS4 with html5lib |  3391.91  |   ~1679.1x   |


### Element Similarity & Text Search Performance

Scrapling's adaptive element finding capabilities significantly outperform alternatives:

| Library     | Time (ms) | vs Scrapling |
|-------------|:---------:|:------------:|
| Scrapling   |   2.39    |     1.0x     |
| AutoScraper |   12.45   |    5.209x    |


> All benchmarks represent averages of 100+ runs. See [benchmarks.ts](https://github.com/D4Vinci/Scrapling/blob/main/benchmarks.ts) for methodology.

## Installation

Scrapling requires TypeScript 3.10 or higher:

```bash
bun install scrapling
```

This installation only includes the parser engine and its dependencies, without any fetchers or commandline dependencies.

### Optional Dependencies

1. If you are going to use any of the extra features below, the fetchers, or their classes, you will need to install fetchers' dependencies and their browser dependencies as follows:
    ```bash
    bun install scrapling
    
    scrapling install           # normal install
    scrapling install  --force  # force reinstall
    ```

    This downloads all browsers, along with their system dependencies and fingerprint manipulation dependencies.

    Or you can install them from the code instead of running a command like this:
    ```typescript
    import { install } from "scrapling/cli";
    
    install([], false);          // normal install
    install(["--force"], false); // force reinstall
    ```

2. Extra features:
   - Install the MCP server feature:
       ```bash
       bun install scrapling
       ```
   - Install shell features (Web Scraping shell and the `extract` command): 
       ```bash
       bun install scrapling
       ```
   - Install everything: 
       ```bash
       bun install scrapling
       ```
   Remember that you need to install the browser dependencies with `scrapling install` after any of these extras (if you didn't already)

### Docker
You can also install a Docker image with all extras and browsers with the following command from DockerHub:
```bash
docker pull pyd4vinci/scrapling
```
Or download it from the GitHub registry:
```bash
docker pull ghcr.io/d4vinci/scrapling:latest
```
This image is automatically built and pushed using GitHub Actions and the repository's main branch.

## Contributing

We welcome contributions! Please read our [contributing guidelines](https://github.com/D4Vinci/Scrapling/blob/main/CONTRIBUTING.md) before getting started.

## Disclaimer

> [!CAUTION]
> This library is provided for educational and research purposes only. By using this library, you agree to comply with local and international data scraping and privacy laws. The authors and contributors are not responsible for any misuse of this software. Always respect the terms of service of websites and robots.txt files.

## 🎓 Citations
If you have used our library for research purposes please quote us with the following reference:
```text
  @misc{scrapling,
    author = {Karim Shoair},
    title = {Scrapling},
    year = {2024},
    url = {https://github.com/D4Vinci/Scrapling},
    note = {An adaptive Web Scraping framework that handles everything from a single request to a full-scale crawl!}
  }
```

## License

This work is licensed under the BSD-3-Clause License.

## Acknowledgments

This project includes code adapted from:
- Parsel (BSD License)—Used for [translator](https://github.com/D4Vinci/Scrapling/blob/main/scrapling/core/translator.ts) submodule

---
<div align="center"><small>Designed & crafted with ❤️ by Karim Shoair.</small></div><br>
