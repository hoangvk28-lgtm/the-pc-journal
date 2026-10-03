# Batch 33 held keywords

Tiers planned for batch 33 that are still not published. The tiers that were held earlier (NVMe under $120, portable SSDs under $100/$120/$150, PC speakers under $50/$60, monitors under $80, wireless mice under $60) were published in the "fill 34" pass after new verified products were added from the Amazon Creators API (fact sheets in `data/categories/fill34-*.ts`).

| Slug | Reason |
|---|---|
| (none of the original held tiers remain) | |

Notes on the fill 34 tiers:
- NVMe under $120: at current prices only 500GB and 512GB drives fit; all picks are internal M.2 NVMe.
- Portable SSDs: the $150 tier is limited to $110 to $150 so it does not repeat the cheaper tiers; hard drives are filtered out.
- Graphics cards under $350: only 4 new-condition cards with 8GB or more of video memory fit ($200 to $350: Arc A750 x2, Arc B570, RX 9060 XT 8GB). RTX 5060 and RTX 4060 cards were $400 or more when searched; RX 6600 XT cards were renewed units and are skipped. The Arc B580 and RX 7600 (both $330 to $350) are held back because other GPU guides already use them.
- Wireless mice under $60: the $40 to $60 band; the Logitech Lift and MX Anywhere listings found were renewed units and are skipped.
- Monitors under $80: desktop 21.5 to 24 inch panels only (portable monitors and TVs filtered out).
- The planner has a new `KEEP=slug,slug` env option that keeps a published guide's previous picks on a re-plan; this pass kept `best-nvme-ssds-under-150`, `best-pc-speakers-under-40` and `best-pc-speakers-under-75` unchanged.

Skipped because the slug already exists under another wording: none of the requested tiers.
Removed from the pool for thin listings (under 100 words of "Why we like it") or wrong audience: see `data/clusters/exclude-thin.json`.
- best-graphics-cards-under-350 keeps the 8GB or more video memory filter (the site already has GPU guides under $300 and $400).
