import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

export const root = resolve(import.meta.dirname, "..");
export const companiesDir = resolve(root, "data/companies");

export async function records() {
  const files = (await readdir(companiesDir)).filter((name) => name.endsWith(".json")).sort();
  return Promise.all(files.map(async (name) => JSON.parse(await readFile(resolve(companiesDir, name), "utf8"))));
}

export function freshness(lastVerified, today = new Date().toISOString().slice(0, 10)) {
  const days = Math.floor((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${lastVerified}T00:00:00Z`)) / 86400000);
  if (days <= 30) return "Fresh";
  if (days <= 90) return "Recent";
  if (days <= 180) return "Aging";
  return "Stale";
}

export async function ensureGenerated() { await mkdir(resolve(root, "data/generated"), { recursive: true }); }
export async function emit(file, value) { await ensureGenerated(); await writeFile(resolve(root, "data/generated", file), value); }
