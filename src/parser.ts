import * as cheerio from 'cheerio';

export class TextHandler {
    private _text: string;

    constructor(text: string) {
        this._text = text;
    }

    get(): string {
        return this._text;
    }

    clean(): string {
        return this._text.replace(/\s+/g, ' ').trim();
    }
}

export class TextHandlers extends Array<string> {
    get(): string | null {
        if (this.length > 0) {
            return this[0];
        }
        return null;
    }

    getall(): string[] {
        return Array.from(this);
    }
}

export class Selector {
    private $: cheerio.CheerioAPI;
    private root: cheerio.Cheerio<cheerio.AnyNode>;
    public url: string;

    constructor(content?: string, root?: cheerio.Cheerio<cheerio.AnyNode>, $?: cheerio.CheerioAPI, url: string = "") {
        if (content !== undefined) {
            this.$ = cheerio.load(content);
            this.root = this.$(':root');
        } else if (root !== undefined && $ !== undefined) {
            this.$ = $;
            this.root = root;
        } else {
            throw new Error("Selector requires content or root and $");
        }
        this.url = url;
    }

    private _cssToCheerioSelector(selector: string): { base: string, attr?: string, text?: boolean } {
        // Simple heuristic for Scrapy-like pseudo-elements
        if (selector.endsWith('::text')) {
            return { base: selector.slice(0, -6), text: true };
        }
        const attrMatch = selector.match(/::attr\(([^)]+)\)$/);
        if (attrMatch) {
            return { base: selector.slice(0, -attrMatch[0].length), attr: attrMatch[1] };
        }
        return { base: selector };
    }

    css(selector: string): Selectors {
        const { base, attr, text } = this._cssToCheerioSelector(selector);
        const elements = this.root.find(base);
        const selectors = new Selectors();

        elements.each((_, el) => {
            const sel = new Selector(undefined, this.$(el), this.$, this.url);
            // We pass the pseudo-element intent by storing it, or just returning a string selector representation.
            // But since Selectors is an array of Selector, we can just wrap it. The get() method handles the rest if we modify it or just handle it here.
            // Actually, in Scrapling/Scrapy, `.css('::text')` returns an object that acts like a text node.
            // Since we can't easily proxy that in TS without complications, let's keep Selector representing elements.
            // We'll store the text/attr extraction logic on the Selector itself for a pseudo-node.
            sel._textExtraction = text;
            sel._attrExtraction = attr;
            selectors.push(sel);
        });

        // For direct text pseudo elements without a tag, e.g., 'body::text'
        if (base === '' && text) {
            const sel = new Selector(undefined, this.root, this.$, this.url);
            sel._textExtraction = true;
            selectors.push(sel);
        }

        return selectors;
    }

    public _textExtraction?: boolean;
    public _attrExtraction?: string;

    get text(): string {
        return this.root.text();
    }

    get html(): string | null {
        return this.$.html(this.root);
    }

    get(): string | null {
        if (this._textExtraction) {
            return this.text;
        }
        if (this._attrExtraction) {
            return this.attrib(this._attrExtraction) ?? null;
        }
        return this.html;
    }

    attrib(name: string): string | undefined {
        return this.root.attr(name);
    }
}

export class Selectors extends Array<Selector> {
    css(selector: string): Selectors {
        const results = new Selectors();
        for (const item of this) {
            const subResults = item.css(selector);
            for (const subItem of subResults) {
                results.push(subItem);
            }
        }
        return results;
    }

    get(): string | null {
        if (this.length > 0) {
            return this[0].get();
        }
        return null;
    }

    getall(): string[] {
        return this.map(s => s.get() || '');
    }
}
