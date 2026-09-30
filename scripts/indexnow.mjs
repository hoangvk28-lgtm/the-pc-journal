/** Submit The PC Journal's public URLs through IndexNow. */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const HOST = "www.thepcjournal.com";
const KEY_FILE = "f734233bb0bf4a4eb7a09e0dfa6a9ec9.txt";
const KEY = readFileSync(new URL(`../public/${KEY_FILE}`, import.meta.url), "utf8").trim();
const KEY_LOCATION = `https://${HOST}/${KEY_FILE}`;
const DATA_FILES = ["data/first-fifty.json", "data/next-hundred.json"];

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" });
}

function changedGuides(since) {
  const changedFiles = new Set(git("diff", "--name-only", since, "HEAD").trim().split(/\r?\n/));
  const slugs = new Set();
  for (const file of DATA_FILES) {
    if (!changedFiles.has(file)) continue;
    const current = JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"));
    let previous = [];
    try { previous = JSON.parse(git("show", `${since}:${file}`)); } catch { /* New file. */ }
    const oldBySlug = new Map(previous.map((article) => [article.slug, JSON.stringify(article)]));
    for (const article of current) {
      if (oldBySlug.get(article.slug) !== JSON.stringify(article)) slugs.add(article.slug);
    }
  }
  return [...slugs].map((slug) => `https://${HOST}/guides/${slug}`);
}

async function allPublicUrls() {
  const response = await fetch(`https://${HOST}/sitemap.xml`);
  if (!response.ok) throw new Error(`Sitemap returned HTTP ${response.status}`);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll("&amp;", "&"));
  if (urls.length === 0) throw new Error("Sitemap has no URLs; refusing empty submission");
  return urls;
}

if (!/^[a-f0-9]{32}$/i.test(KEY) || KEY_FILE !== `${KEY}.txt`) {
  throw new Error("IndexNow key file is invalid");
}

const args = process.argv.slice(2);
let urls;
if (args.includes("--all")) {
  urls = await allPublicUrls();
} else if (args.includes("--auto")) {
  const since = args.find((arg) => arg.startsWith("--since="))?.slice(8) || "HEAD~1";
  if (!/^[a-f0-9^~]+$/i.test(since)) throw new Error("Invalid git ref");
  urls = changedGuides(since);
} else {
  urls = args.filter((arg) => !arg.startsWith("--")).map((slug) => `https://${HOST}/guides/${slug}`);
}

urls = [...new Set(urls)];
if (urls.length === 0) {
  console.log("No changed guide URLs to submit.");
  process.exit(0);
}
if (urls.some((url) => new URL(url).host !== HOST)) throw new Error("URL outside the site host");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
});
if (!response.ok) throw new Error(`IndexNow rejected ${urls.length} URLs: HTTP ${response.status}`);
console.log(`IndexNow accepted ${urls.length} URLs: HTTP ${response.status}`);
