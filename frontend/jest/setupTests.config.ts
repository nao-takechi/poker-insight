import "@testing-library/jest-dom";
import "whatwg-fetch";

process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost";

// --- Streams API polyfill（最初に！）---
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from "web-streams-polyfill";

if (typeof globalThis.ReadableStream === "undefined") {
  // @ts-expect-error
  globalThis.ReadableStream = ReadableStream;
}
if (typeof globalThis.WritableStream === "undefined") {
  // @ts-expect-error
  globalThis.WritableStream = WritableStream;
}
if (typeof globalThis.TransformStream === "undefined") {
  // @ts-expect-error
  globalThis.TransformStream = TransformStream;
}

// --- fetch / Response polyfill（Streams の後！）---
import "whatwg-fetch";

// --- TextEncoder / TextDecoder polyfill ---
import {
  TextDecoder as NodeTextDecoder,
  TextEncoder as NodeTextEncoder,
} from "util";

globalThis.TextDecoder =
  NodeTextDecoder as unknown as typeof globalThis.TextDecoder;
globalThis.TextEncoder =
  NodeTextEncoder as unknown as typeof globalThis.TextEncoder;

// --- BroadcastChannel polyfill ---
if (typeof globalThis.BroadcastChannel === "undefined") {
  class MockBroadcastChannel {
    name: string;

    onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null =
      null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage(_msg: any) {}
    close() {}
  }

  // @ts-expect-error: Node には BroadcastChannel がないため polyfill
  globalThis.BroadcastChannel = MockBroadcastChannel;
}
