import { Selector } from '../parser';

export class Fetcher {
    static async get(url: string, options?: RequestInit): Promise<Selector> {
        const res = await fetch(url, options);
        const text = await res.text();
        return new Selector(text, undefined, undefined, url);
    }
}
