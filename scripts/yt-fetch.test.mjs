// Unit tests for the pure helpers in yt-fetch.mjs.
// Run: npm test

import assert from "node:assert/strict";
import { test } from "node:test";

import { pendingEntries, setStatus, unavailableReason } from "./yt-fetch.mjs";

const ID = "M2exXwKXN7M";
const URL = `https://www.youtube.com/watch?v=${ID}`;

test("pendingEntries returns only todo entries, in list order", () => {
  const entries = [
    { title: "A", url: URL, status: "todo" },
    { url: "https://www.youtube.com/watch?v=AAAAAAAAAAA", status: "fetched" },
    { url: "https://youtu.be/BBBBBBBBBBB", status: "skipped", note: "no captions" },
    { url: "https://example.com/talk", status: "todo" },
  ];
  assert.deepEqual(pendingEntries(entries), [
    { url: URL, id: ID },
    { url: "https://example.com/talk", id: null },
  ]);
});

test("setStatus updates exactly the matching todo entry", () => {
  const entries = [
    { title: "A", url: URL, status: "todo" },
    { url: "https://youtu.be/CCCCCCCCCCC", status: "todo" },
  ];
  assert.deepEqual(setStatus(entries, URL, "fetched"), [{ title: "A", url: URL, status: "fetched" }, entries[1]]);
  assert.equal(entries[0].status, "todo", "the input is not mutated");
});

test("setStatus adds a note for skipped entries", () => {
  assert.deepEqual(setStatus([{ url: URL, status: "todo" }], URL, "skipped", "no captions"), [
    { url: URL, status: "skipped", note: "no captions" },
  ]);
});

test("setStatus returns null when the URL is absent or already processed", () => {
  assert.equal(setStatus([{ url: URL, status: "fetched" }], URL, "fetched"), null);
  assert.equal(setStatus([{ url: URL, status: "todo" }], "https://youtu.be/DDDDDDDDDDD", "fetched"), null);
});

test("unavailableReason reads yt-dlp's Video unavailable error, else null", () => {
  const removed = `yt-dlp exited 1\nERROR: [youtube] ${ID}: Video unavailable. This video has been removed by the uploader`;
  assert.equal(unavailableReason(removed), "Video unavailable. This video has been removed by the uploader");
  assert.equal(unavailableReason(`ERROR: [youtube] ${ID}: Video unavailable`), "Video unavailable");
  assert.equal(unavailableReason(`ERROR: [youtube] ${ID}: This video is unavailable`), "This video is unavailable");
  assert.equal(
    unavailableReason(`ERROR: [youtube] ${ID}: Private video. Sign in if you've been granted access to this video`),
    "Private video. Sign in if you've been granted access to this video",
  );
  assert.equal(unavailableReason("yt-dlp exited 1\nERROR: HTTP Error 429: Too Many Requests"), null);
});
