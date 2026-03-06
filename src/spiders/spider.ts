import { Selector } from '../parser';
import { Fetcher } from '../fetchers/fetcher';

export class Response {
    public url: string;
    public text: string;
    public status: number;
    public selector: Selector;

    constructor(url: string, text: string, status: number) {
        this.url = url;
        this.text = text;
        this.status = status;
        this.selector = new Selector(text, undefined, undefined, url);
    }

    css(selector: string) {
        return this.selector.css(selector);
    }

    xpath(selector: string) {
        throw new Error("xpath not implemented. Use css instead.");
    }

    follow(url: string) {
        const absoluteUrl = new URL(url, this.url).toString();
        return new Request(absoluteUrl);
    }
}

export class Request {
    public url: string;
    public callback?: (response: Response) => any;

    constructor(url: string, callback?: (response: Response) => any) {
        this.url = url;
        this.callback = callback;
    }
}

export class SpiderResult {
    public items: any[];

    constructor(items: any[]) {
        this.items = items;
    }
}

export abstract class Spider {
    public name: string = 'spider';
    public start_urls: string[] = [];
    public items: any[] = [];

    abstract parse(response: Response): AsyncGenerator<any, void, unknown> | Generator<any, void, unknown>;

    async start(): Promise<SpiderResult> {
        const queue: Request[] = this.start_urls.map(url => new Request(url, this.parse.bind(this)));

        while (queue.length > 0) {
            const req = queue.shift()!;
            try {
                const res = await fetch(req.url);
                const text = await res.text();
                const response = new Response(req.url, text, res.status);

                const callback = req.callback || this.parse.bind(this);
                const generator = callback(response);

                if (generator) {
                    for await (const item of generator) {
                        if (item instanceof Request) {
                            queue.push(item);
                        } else {
                            this.items.push(item);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch", req.url, err);
            }
        }

        return new SpiderResult(this.items);
    }
}
