"""Import the supplied editorial package into the site's static article registry."""
import json
import re
import sys
import zipfile
from pathlib import Path

archive = Path(sys.argv[1])
root = Path(__file__).resolve().parents[1]
prefix = "the-pc-journal-first-50/"

def category(source, title):
    if source in {"Monitor"}:
        return "monitors"
    if source == "Peripheral":
        return "peripherals"
    if source == "Build":
        return "pc-builds"
    if source == "Troubleshooting" or "upgrade" in title.lower():
        return "upgrades"
    return "components"

with zipfile.ZipFile(archive) as bundle:
    manifest = json.loads(bundle.read(prefix + "manifest.json"))
    articles = []
    for entry in manifest:
        raw = bundle.read(prefix + entry["file"]).decode("utf-8-sig")
        front, body = raw.split("---", 2)[1:]
        meta = dict(re.findall(r'^([a-z_]+):\s*"(.*)"\s*$', front, re.M))
        title = meta["title"]
        slug = meta["slug"]
        if slug != entry["slug"]:
            raise ValueError(f"Manifest slug mismatch: {slug}")
        # Figures have a fixed package format. Convert them to Markdown so no
        # untrusted HTML from the archive reaches a public page.
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
        body = re.sub(r'^\s*# [^\n]+\n', '', body)
        body = body.strip()
        if re.search(r'\b(we tested|tested by us|our benchmarks?|hands-on review|in our lab|we measured|we tried)\b', body, re.I):
            raise ValueError(f"Unsupported hands-on testing claim in {slug}")
        for url in re.findall(r'\]\(([^)]+)\)', body):
            if not (url.startswith("https://") or url.startswith("/guides/")):
                raise ValueError(f"Unsupported URL in {slug}: {url}")
        image_urls = re.findall(r'!\[([^\]]+)\]\(([^)]+)\)', body)
        if len(image_urls) != 5:
            raise ValueError(f"Expected five images in {slug}; found {len(image_urls)}")
        related = re.findall(r'\]\(/guides/([a-z0-9-]+)/?\)', body)
        articles.append({
            "slug": slug, "type": "long-form", "status": "published",
            "category": category(entry["category"], title), "seoTitle": title,
            "title": title, "dek": meta["meta_description"],
            "metaDescription": meta["meta_description"],
            "teaser": meta["meta_description"],
            "author": {"name": "The PC Journal", "url": "/about-the-pc-journal"},
            "readTime": f'{round(len(body.split()) / 220)} min read',
            "related": related,
            "body": body,
        })
    slugs = {a["slug"] for a in articles}
    for article in articles:
        article["related"] = [slug for slug in article["related"] if slug in slugs]
    if len(articles) != 50 or len(slugs) != 50:
        raise ValueError("Expected 50 unique articles")
    output = root / "data" / "first-fifty.json"
    output.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Imported {len(articles)} guides with {sum(a['body'].count('![') for a in articles)} images into {output.relative_to(root)}")
