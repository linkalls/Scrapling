import { RequestOptions, ResponseModel } from "../core/types";

export class FetcherClient {
  public async request(url: string, method: string = "GET", options: RequestOptions = {}): Promise<ResponseModel> {
    const fetchOptions: RequestInit = {
      method: method,
      headers: options.headers || {},
      body: options.body as BodyInit,
    };

    if (options.timeout) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), options.timeout);
      fetchOptions.signal = controller.signal;
      // We don't have a reliable proxy implementation in standard fetch,
      // but if the runtime is Bun or Node (via undici) they might support proxy agent.
    }

    try {
      const response = await fetch(url, fetchOptions);
      const bodyText = await response.text();

      const headers: Record<string, string> = {};
      response.headers.forEach((v, k) => {
        headers[k] = v;
      });

      return {
        url: response.url,
        status: response.status,
        body: bodyText,
        headers: headers,
      };
    } catch (e: any) {
      throw new Error(`Fetch error for ${url}: ${e.message}`);
    }
  }
}

export class StaticFetcher {
  private client = new FetcherClient();

  public async get(url: string, options?: Omit<RequestOptions, 'method'>) {
    return this.client.request(url, "GET", options);
  }

  public async post(url: string, options?: Omit<RequestOptions, 'method'>) {
    return this.client.request(url, "POST", options);
  }

  public async put(url: string, options?: Omit<RequestOptions, 'method'>) {
    return this.client.request(url, "PUT", options);
  }

  public async delete(url: string, options?: Omit<RequestOptions, 'method'>) {
    return this.client.request(url, "DELETE", options);
  }
}
