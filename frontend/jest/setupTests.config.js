import "@testing-library/jest-dom";
import "whatwg-fetch";

process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost";

// Streams API polyfill
import {
  ReadableStream as PolyReadableStream,
  TransformStream as PolyTransformStream,
  WritableStream as PolyWritableStream,
} from "web-streams-polyfill";

if (typeof globalThis.ReadableStream === "undefined") {
  globalThis.ReadableStream = PolyReadableStream;
}
if (typeof globalThis.WritableStream === "undefined") {
  globalThis.WritableStream = PolyWritableStream;
}
if (typeof globalThis.TransformStream === "undefined") {
  globalThis.TransformStream = PolyTransformStream;
}

// fetch polyfill
import "whatwg-fetch";

// TextEncoder / TextDecoder polyfill
import {
  TextDecoder as NodeTextDecoder,
  TextEncoder as NodeTextEncoder,
} from "util";

globalThis.TextDecoder = NodeTextDecoder;
globalThis.TextEncoder = NodeTextEncoder;

// BroadcastChannel polyfill
if (typeof globalThis.BroadcastChannel === "undefined") {
  class MockBroadcastChannel {
    constructor(name) {
      this.name = name;
      this.onmessage = null;
    }

    postMessage(_msg) {}
    close() {}
  }

  globalThis.BroadcastChannel = MockBroadcastChannel;
}
