import { createHash } from "crypto";

export type RequestCallback = (response: any) => AsyncGenerator<any, void, unknown>;

export class Request {
  public url: string;
  public sid: string;
  public callback?: RequestCallback;
  public priority: number;
  public dontFilter: boolean;
  public meta: Record<string, any>;
  public retryCount: number;
  public sessionKwargs: Record<string, any>;
  private _fp?: string;

  constructor(options: {
    url: string;
    sid?: string;
    callback?: RequestCallback;
    priority?: number;
    dontFilter?: boolean;
    meta?: Record<string, any>;
    retryCount?: number;
    sessionKwargs?: Record<string, any>;
  }) {
    this.url = options.url;
    this.sid = options.sid || "";
    this.callback = options.callback;
    this.priority = options.priority || 0;
    this.dontFilter = options.dontFilter || false;
    this.meta = options.meta || {};
    this.retryCount = options.retryCount || 0;
    this.sessionKwargs = options.sessionKwargs || {};
  }

  get domain(): string {
    return new URL(this.url).hostname;
  }

  updateFingerprint(): string {
    if (this._fp) return this._fp;

    const method = this.sessionKwargs.method || "GET";
    const bodyStr = this.sessionKwargs.body ? String(this.sessionKwargs.body) : "";

    const dataObj = {
      sid: this.sid,
      method: method,
      url: this.url,
      body: Buffer.from(bodyStr).toString("hex"),
    };

    const hash = createHash("sha1");
    hash.update(JSON.stringify(dataObj));
    this._fp = hash.digest("hex");

    return this._fp;
  }

  public toString(): string {
    return `<Request(${this.url}) priority=${this.priority}>`;
  }
}
