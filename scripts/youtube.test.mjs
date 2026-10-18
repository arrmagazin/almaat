// Unit tests for the pure helpers in youtube.mjs.
// Run: npm test

import assert from "node:assert/strict";
import { test } from "node:test";

import { extractVideoId, pickCaptionTrack } from "./youtube.mjs";

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

test("pickCaptionTrack prefers the spoken track over an auto-translation", () => {
  const auto = ["en", "nl", "ru", "ru-orig"];
  assert.deepEqual(pickCaptionTrack({ auto, langPref: "en", videoLanguage: "ru" }), { lang: "ru-orig", kind: "auto" });
  assert.deepEqual(pickCaptionTrack({ auto: ["en-orig", "en", "ru"], langPref: "en" }), { lang: "en-orig", kind: "auto" });
  assert.deepEqual(pickCaptionTrack({ manual: ["en"], auto, langPref: "en" }), { lang: "en", kind: "manual" });
  assert.deepEqual(pickCaptionTrack({ auto: ["en", "de"], langPref: "de" }), { lang: "de", kind: "auto" });
});

test("pickCaptionTrack picks the wanted language among dubbed audio tracks", () => {
  // A video with dubbed audio carries one "-orig" track per audio language.
  const auto = ["ar-orig", "ar", "en", "en-orig", "ru-orig", "nl"];
  assert.deepEqual(pickCaptionTrack({ auto, langPref: "en", videoLanguage: "en-US" }), { lang: "en-orig", kind: "auto" });
  assert.deepEqual(pickCaptionTrack({ auto, langPref: "nl", videoLanguage: "en-US" }), { lang: "en-orig", kind: "auto" });
  assert.deepEqual(pickCaptionTrack({ auto, langPref: "ru" }), { lang: "ru-orig", kind: "auto" });
});
