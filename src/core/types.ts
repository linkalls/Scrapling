export type ResponseModel = {
  url: string;
  status: number;
  body: string | Buffer;
  headers: Record<string, string>;
};

export type RequestOptions = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string | Buffer | URLSearchParams;
  timeout?: number;
  proxy?: string;
};

export class TextHandler extends String {
  clean(): string {
    return this.replace(/\s+/g, " ").trim();
  }

  re(regex: string | RegExp, flags: string = "gi"): string[] {
    const r = typeof regex === "string" ? new RegExp(regex, flags) : regex;
    const matches = Array.from(this.matchAll(r)).map((m) => m[0] || "");
    return matches;
  }

  reFirst(regex: string | RegExp, flags: string = "gi"): string | null {
    const matches = this.re(regex, flags);
    return matches.length > 0 ? matches[0] : null;
  }
}

export class TextHandlers extends Array<TextHandler> {
  get(defaultVal: any = null): TextHandler | any {
    return this.length > 0 ? this[0] : defaultVal;
  }

  extract(): TextHandlers {
    return this;
  }

  re(regex: string | RegExp, flags: string = "gi"): TextHandlers {
    const results = new TextHandlers();
    for (const handler of this) {
      const matches = handler.re(regex, flags);
      for (const m of matches) {
        results.push(new TextHandler(m));
      }
    }
    return results;
  }
}

export class AttributesHandler {
  private data: ReadonlyMap<string, string | TextHandler>;

  constructor(mapping: Record<string, string | TextHandler> = {}) {
    this.data = new Map(Object.entries(mapping));
  }

  get(key: string, defaultVal: any = null): string | TextHandler | any {
    return this.data.has(key) ? this.data.get(key) : defaultVal;
  }

  has(key: string): boolean {
    return this.data.has(key);
  }

  get jsonString(): string {
    return JSON.stringify(Object.fromEntries(this.data));
  }
}
