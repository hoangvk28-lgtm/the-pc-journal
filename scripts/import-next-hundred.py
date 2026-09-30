"""Import editorial packages 051-100 and 101-150 into the static registry."""
import json
import re
import sys
import zipfile
from collections import Counter
from pathlib import Path

root = Path(__file__).resolve().parents[1]
existing = {article["slug"] for article in json.loads((root / "data" / "first-fifty.json").read_text(encoding="utf-8"))}

def category(number, source):
    if source in {"Monitors & Displays"}:
        return "monitors"
    if source in {"PC Peripherals", "Networking & Connectivity"}:
        return "peripherals"
    if source == "PC Builds & Upgrades":
        return "pc-builds"
    if source == "Desktops & Mini PCs":
        return "pc-builds" if number <= 110 else "upgrades"
    if source == "PC Setup & Troubleshooting":
        return "upgrades"
    if source == "CPUs & Graphics Cards":
        return "components" if number == 84 else "upgrades"
    if source == "Storage & Backup":
        return "upgrades" if number >= 141 else "components"
    if source == "Motherboards & Memory":
        return "components"
    raise ValueError(f"No site category for {number}: {source}")

articles = []
for archive_name, prefix, first in [
    (sys.argv[1], "the-pc-journal-articles-051-100/", 51),
    (sys.argv[2], "the-pc-journal-articles-101-150/", 101),
]:
    with zipfile.ZipFile(archive_name) as bundle:
        manifest = json.loads(bundle.read(prefix + "manifest.json"))
        if [item["priority"] for item in manifest] != list(range(first, first + 50)):
            raise ValueError(f"Expected priorities {first}-{first + 49}")
        for entry in manifest:
            raw = bundle.read(prefix + entry["file"]).decode("utf-8-sig")
            front, body = raw.split("---", 2)[1:]
            meta = dict(re.findall(r'^([a-z_]+):\s*"(.*)"\s*$', front, re.M))
            slug = meta["slug"]
            if slug != entry["slug"] or meta["title"] != entry["title"]:
                raise ValueError(f"Manifest/front matter mismatch: {slug}")
            if slug in existing:
                raise ValueError(f"Duplicate slug: {slug}")

            def figure(match):
                html = match.group(0)
                image = re.search(r'<img src="([^"]+)" alt="([^"]+)"', html)
                caption = re.search(r'<figcaption>(.*?)</figcaption>', html, re.S)
                if not image or not caption:
                    raise ValueError(f"Unexpected figure in {slug}")
                credit = re.sub(r'<a href="([^"]+)">(.*?)</a>', r'[\2](\1)', caption.group(1))
                return f'\n\n![{image.group(2)}]({image.group(1)})\n\n*{credit}*\n\n'

            body = re.sub(r'<figure\b.*?</figure>', figure, body, flags=re.S)
            if re.search(r'<[a-zA-Z]', body):
                raise ValueError(f"Unexpected HTML in {slug}")
            body = re.sub(r'\n## Editorial sources to verify before publication\n.*$', '', body, flags=re.S)
            body = re.sub(r'\n\*Editorial note:.*$', '', body, flags=re.S)
            body = re.sub(r'^\s*# [^\n]+\n', '', body).strip()
            if re.search(r'\b(we tested|tested by us|our benchmarks?|hands-on review|in our lab|we measured|we tried)\b', body, re.I):
                raise ValueError(f"Unsupported hands-on testing claim in {slug}")
            for url in re.findall(r'\]\(([^)]+)\)', body):
                if not (url.startswith("https://") or url.startswith("/guides/")):
                    raise ValueError(f"Unsupported URL in {slug}: {url}")
            if body.count("![") != 5:
                raise ValueError(f"Expected five images in {slug}")
            articles.append({
                "slug": slug, "type": "long-form", "status": "published",
                "category": category(entry["priority"], entry["category"]),
                "seoTitle": meta["title"], "title": meta["title"],
                "dek": meta["meta_description"], "metaDescription": meta["meta_description"],
                "teaser": meta["meta_description"],
                "author": {"name": "The PC Journal", "url": "/about-the-pc-journal"},
                "readTime": f'{round(len(body.split()) / 220)} min read',
                "related": re.findall(r'\]\(/guides/([a-z0-9-]+)/?\)', body),
                "body": body,
            })
            existing.add(slug)

if len(articles) != 100:
    raise ValueError(f"Expected 100 articles, got {len(articles)}")
for article in articles:
    article["related"] = [slug for slug in article["related"] if slug in existing]
output = root / "data" / "next-hundred.json"
output.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Imported {len(articles)} guides with {sum(a['body'].count('![') for a in articles)} images")
print("Site categories:", dict(Counter(a["category"] for a in articles)))
