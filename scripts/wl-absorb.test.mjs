// Unit tests for the pure helpers in wl-absorb.mjs.
// Run: npm test

import assert from "node:assert/strict";
import { test } from "node:test";

import { appendNewVideos, processedVideos } from "./wl-absorb.mjs";

const entries = [
  { url: "https://www.youtube.com/watch?v=AAAAAAAAAAA", status: "fetched" },
  { title: "Old", url: "https://youtu.be/BBBBBBBBBBB", status: "skipped", note: "no captions" },
  { title: "Todo", url: "https://youtu.be/CCCCCCCCCCC", status: "todo" },
];
const videos = ["AAAAAAAAAAA", "BBBBBBBBBBB", "CCCCCCCCCCC", "DDDDDDDDDDD"].map((id) => ({ id, title: `T ${id}` }));

test("appendNewVideos adds only videos the list does not hold, under any status", () => {
  const { entries: updated, added } = appendNewVideos(entries, videos);
  assert.deepEqual(added, [videos[3]]);
  assert.deepEqual(updated, [
    ...entries,
    { title: "T DDDDDDDDDDD", url: "https://www.youtube.com/watch?v=DDDDDDDDDDD", status: "todo" },
  ]);
});

test("appendNewVideos leaves the list alone when nothing is new", () => {
  assert.deepEqual(appendNewVideos(entries, videos.slice(0, 3)), { entries, added: [] });
  assert.deepEqual(appendNewVideos([], [videos[0]]).entries, [
    { title: "T AAAAAAAAAAA", url: "https://www.youtube.com/watch?v=AAAAAAAAAAA", status: "todo" },
  ]);
});

test("processedVideos picks the videos whose entry is fetched or skipped", () => {
  assert.deepEqual(
    processedVideos(entries, videos).map((v) => v.id),
    ["AAAAAAAAAAA", "BBBBBBBBBBB"],
  );
});
