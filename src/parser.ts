import * as cheerio from "cheerio";
import { TextHandler, TextHandlers, AttributesHandler } from "./core/types";

export class Selectors extends Array<Selector> {
  get length(): number {
    return super.length;
  }

  get first(): Selector | null {
    return this.length > 0 ? this[0] : null;
  }

  get last(): Selector | null {
    return this.length > 0 ? this[this.length - 1] : null;
  }

  getall(): TextHandlers {
    const handlers = new TextHandlers();
    for (const sel of this) {
      handlers.push(new TextHandler(sel.get));
    }
    return handlers;
  }

  extract(): TextHandlers {
    return this.getall();
  }

  css(query: string): Selectors {
    const results = new Selectors();
    for (const sel of this) {
      const match = sel.css(query);
      results.push(...match);
    }
    return results;
  }

  xpath(query: string): Selectors {
    // Cheerio doesn't natively support full XPath, so we treat it similarly to CSS or warn user.
    // For pure TS, users might need to run xpath on raw strings or use another library.
    // Here we wrap for interface compatibility.
    console.warn("XPath is not natively supported by cheerio, fallback to CSS selector if possible");
    return this.css(query);
  }
}

export class Selector {
  public root: cheerio.CheerioAPI;
  public element: cheerio.Cheerio<cheerio.Element>;

  constructor(body: string | cheerio.Cheerio<cheerio.Element>, root?: cheerio.CheerioAPI) {
    if (typeof body === "string") {
      this.root = cheerio.load(body);
      this.element = this.root.root();
    } else {
      this.root = root || cheerio.load("");
      this.element = body;
    }
  }

  get text(): TextHandler {
    return new TextHandler(this.element.text());
  }

  get get(): string {
    return this.element.html() || "";
  }

  get attribs(): AttributesHandler {
    const attrs = this.element.attr() || {};
    return new AttributesHandler(attrs);
  }

  public toString(): string {
    return this.get;
  }

  css(query: string): Selectors {
    const matches = this.element.find(query);
    const results = new Selectors();
    matches.each((_, el) => {
      results.push(new Selector(this.root(el), this.root));
    });
    return results;
  }

  xpath(query: string): Selectors {
    console.warn("XPath is not natively supported by cheerio, fallback to CSS selector if possible");
    return this.css(query);
  }

  find_all(tag: string, attrs: Record<string, string> = {}): Selectors {
    let query = tag;
    for (const [k, v] of Object.entries(attrs)) {
      query += `[${k}="${v}"]`;
    }
    return this.css(query);
  }

  find_by_text(text: string, tag: string = "*", exact: boolean = false): Selectors {
    const matches = this.css(tag);
    const results = new Selectors();
    for (const match of matches) {
      const elText = match.text.toString();
      if (exact && elText === text) {
        results.push(match);
      } else if (!exact && elText.includes(text)) {
        results.push(match);
      }
    }
    return results;
  }
}
