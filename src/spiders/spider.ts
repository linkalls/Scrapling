import { Request } from "./request";
import { ResponseModel } from "../core/types";
import { StaticFetcher, DynamicFetcher } from "../fetchers";

export abstract class Spider {
  public name: string;
  public startUrls: string[];
  public concurrentRequests: number;
  private queue: Request[];
  private isPaused: boolean = false;
  private activeTasks: number = 0;

  constructor(options: { name: string; startUrls?: string[]; concurrentRequests?: number }) {
    if (!options.name) throw new Error("Spider must have a name.");
    this.name = options.name;
    this.startUrls = options.startUrls || [];
    this.concurrentRequests = options.concurrentRequests || 4;
    this.queue = [];
  }

  async *startRequests(): AsyncGenerator<Request, void, unknown> {
    if (this.startUrls.length === 0) {
      throw new Error("Spider has no starting point, either set startUrls or override startRequests.");
    }

    for (const url of this.startUrls) {
      yield new Request({ url: url, callback: this.parse.bind(this) });
    }
  }

  abstract parse(response: ResponseModel): AsyncGenerator<any, void, unknown>;

  async onStart(resuming: boolean = false): Promise<void> {
    console.log(`Starting spider ${this.name} ${resuming ? "(resuming)" : ""}`);
  }

  async onClose(): Promise<void> {
    console.log(`Spider ${this.name} closed`);
  }

  async onError(request: Request, error: Error): Promise<void> {
    console.error(`Error processing request ${request.url}: ${error.message}`);
  }

  public pause() {
    this.isPaused = true;
  }

  // Very simplified engine implementation using standard Fetch API as the default engine
  // Advanced features like SessionManager, anyio/uvloop concurrency, and checkpoints are simplified.
  public async start(): Promise<any[]> {
    await this.onStart();
    const fetcher = new StaticFetcher();
    const items: any[] = [];

    // Fill initial queue
    const startGen = this.startRequests();
    for await (const req of startGen) {
      this.queue.push(req);
    }

    while (this.queue.length > 0 || this.activeTasks > 0) {
      if (this.isPaused) break;

      while (this.activeTasks < this.concurrentRequests && this.queue.length > 0) {
        const req = this.queue.shift()!;
        this.activeTasks++;

        // Fire and forget, we manage concurrency via activeTasks
        this.processRequest(req, fetcher, items).finally(() => {
          this.activeTasks--;
        });
      }

      // Small delay to prevent tight loop burning CPU when queue is empty but tasks are running
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    await this.onClose();
    return items;
  }

  private async processRequest(req: Request, fetcher: StaticFetcher, items: any[]): Promise<void> {
    try {
      const response = await fetcher.get(req.url, req.sessionKwargs);
      const callback = req.callback || this.parse.bind(this);

      const gen = callback(response);
      for await (const result of gen) {
        if (result instanceof Request) {
          this.queue.push(result);
        } else if (result) {
          items.push(result);
        }
      }
    } catch (e: any) {
      await this.onError(req, e);
    }
  }
}
