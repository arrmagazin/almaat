// Unit tests for the pure helpers in yt-fetch.mjs.
// Run: node --test scripts/

import assert from "node:assert/strict";
import { test } from "node:test";

import { pickCaptionTrack } from "./wl-absorb.mjs";
import { extractVideoId, markByUrl, scanChecklist } from "./yt-fetch.mjs";

const ID = "M2exXwKXN7M";

test("extractVideoId handles the common YouTube URL shapes", () => {
  assert.equal(extractVideoId(`https://www.youtube.com/watch?v=${ID}`), ID);
  assert.equal(extractVideoId(`https://www.youtube.com/watch?v=${ID}&t=120s`), ID);
  assert.equal(extractVideoId(`https://youtu.be/${ID}?si=abc123`), ID);
  assert.equal(extractVideoId(`https://www.youtube.com/shorts/${ID}`), ID);
  assert.equal(extractVideoId(`https://www.youtube.com/live/${ID}`), ID);
  assert.equal(extractVideoId(`https://www.youtube.com/embed/${ID}`), ID);
});

test("extractVideoId rejects non-YouTube and malformed input", () => {
  assert.equal(extractVideoId(`https://example.com/watch?v=${ID}`), null);
  assert.equal(extractVideoId("https://www.youtube.com/playlist?list=WL"), null);
  assert.equal(extractVideoId("not a url"), null);
  assert.equal(extractVideoId("https://www.youtube.com/watch?v=too-short"), null);
});

test("scanChecklist returns only unchecked items, unwrapping <> autolinks", () => {
  const text = [
    "# Watch list",
    "",
    `- [ ] <https://www.youtube.com/watch?v=${ID}>`,
    "- [x] <https://www.youtube.com/watch?v=AAAAAAAAAAA>",
    "- [-] <https://www.youtube.com/watch?v=BBBBBBBBBBB> — no captions",
    "- [ ] https://example.com/talk",
    "plain prose line",
  ].join("\n");

  const todos = scanChecklist(text);
  assert.equal(todos.length, 2);
  assert.deepEqual(
    todos.map((t) => ({ url: t.url, id: t.id })),
    [
      { url: `https://www.youtube.com/watch?v=${ID}`, id: ID },
      { url: "https://example.com/talk", id: null },
    ],
  );
});

test("markByUrl flips exactly the matching unchecked line", () => {
  const text = [`- [ ] <https://www.youtube.com/watch?v=${ID}>`, "- [ ] <https://youtu.be/CCCCCCCCCCC>"].join("\n");

  const marked = markByUrl(text, `https://www.youtube.com/watch?v=${ID}`, "x");
  assert.equal(
    marked,
    [`- [x] <https://www.youtube.com/watch?v=${ID}>`, "- [ ] <https://youtu.be/CCCCCCCCCCC>"].join("\n"),
  );
});

test("markByUrl appends a note for skipped items", () => {
  const text = `- [ ] <https://www.youtube.com/watch?v=${ID}>`;
  assert.equal(
    markByUrl(text, `https://www.youtube.com/watch?v=${ID}`, "-", "no captions"),
    `- [-] <https://www.youtube.com/watch?v=${ID}> — no captions`,
  );
});

test("markByUrl returns null when the URL is absent or already checked", () => {
  assert.equal(markByUrl("- [x] <https://youtu.be/CCCCCCCCCCC>", "https://youtu.be/CCCCCCCCCCC", "x"), null);
  assert.equal(markByUrl("- [ ] <https://youtu.be/CCCCCCCCCCC>", "https://youtu.be/DDDDDDDDDDD", "x"), null);
});

test("pickCaptionTrack prefers the spoken track over an auto-translation", () => {
  const auto = ["en", "nl", "ru", "ru-orig"];
  assert.deepEqual(pickCaptionTrack({ auto, langPref: "en", videoLanguage: "ru" }), { lang: "ru-orig", kind: "auto" });
  assert.deepEqual(pickCaptionTrack({ auto: ["en-orig", "en", "ru"], langPref: "en" }), { lang: "en-orig", kind: "auto" });
  assert.deepEqual(pickCaptionTrack({ manual: ["en"], auto, langPref: "en" }), { lang: "en", kind: "manual" });
  assert.deepEqual(pickCaptionTrack({ auto: ["en", "de"], langPref: "de" }), { lang: "de", kind: "auto" });
});
