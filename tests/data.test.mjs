import test from "node:test";
import assert from "node:assert/strict";
import { records, freshness } from "../scripts/lib.mjs";
test("records have unique ids and sources", async () => { const all = await records(); assert.ok(all.length >= 5); assert.equal(new Set(all.map((item) => item.id)).size, all.length); assert.ok(all.every((item) => item.sources.length > 0)); });
test("freshness thresholds are stable", () => { assert.equal(freshness("2026-08-14", "2026-08-14"), "Fresh"); assert.equal(freshness("2026-06-15", "2026-08-14"), "Recent"); assert.equal(freshness("2026-02-01", "2026-08-14"), "Stale"); });
