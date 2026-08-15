#!/usr/bin/env node
// Minimal, dependency-free JSON-lines adapter. Suitable for local agent tooling;
// a production MCP transport can wrap these same functions without changing data.
import { records } from "../scripts/lib.mjs";
const all = await records();
const tools = {
  search_ai_monetization: ({ query = "" } = {}) => all.filter((record) => JSON.stringify(record).toLowerCase().includes(query.toLowerCase())),
  get_company_monetization: ({ id } = {}) => all.find((record) => record.id === id) ?? null,
  compare_monetization: ({ ids = [] } = {}) => all.filter((record) => ids.includes(record.id)),
  recent_pricing_changes: () => all.flatMap((record) => record.pricing_events ?? [])
};
process.stdin.setEncoding("utf8");
let buffer = "";
process.stdin.on("data", (chunk) => { buffer += chunk; let line; while ((line = buffer.indexOf("\n")) !== -1) { const raw = buffer.slice(0, line); buffer = buffer.slice(line + 1); if (!raw.trim()) continue; try { const request = JSON.parse(raw); const fn = tools[request.tool]; process.stdout.write(`${JSON.stringify(fn ? { ok: true, result: fn(request.arguments) } : { ok: false, error: "Unknown tool" })}\n`); } catch { process.stdout.write('{"ok":false,"error":"Invalid JSON"}\n'); } } });
