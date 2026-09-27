import { chairSchema } from "@/data/categories/chairs13d";
import { chairs15cFacts } from "@/data/categories/chairs15c";
import type { Entry } from "./batch12-lib";
import { factory } from "./batch13c-lib";

/** Batch 15c: guru sitemap 45 chair keywords. Every pick lists adjustable or built-in lumbar support; no medical claims. */

const ch = factory(chairSchema, chairs15cFacts, "peripherals", {
  B0DPHLWNBG: "ELABEST's X100 has the most adjustable lumbar support here: a spring-loaded 3D lumbar pad that ELABEST says tracks your back and adjusts in height, depth and rotation. It adds 5D flip-up armrests, a mesh back and a footrest, and it is the most expensive chair in this group at the time of writing.",
  B0DXS1BVCB: "Razer builds a lumbar arch into the Iskur V2 X's backrest rather than using a strap-on pillow, so it stays in place but cannot be moved. The widened seat and 152-degree recline suit a gaming setup, and the Light Gray fabric breathes better than PU leather.",
  B0H2XNYVQP: "marrap's office chair lists lumbar support that moves up and down as well as forward and back, two directions of adjustment for less money than the ELABEST. Its 3D armrests flip up, slide and rotate, and the mesh back and seat stay cool.",
  B0CQLJ32TC: "MUXX.STIL pairs an adjustable lumbar cushion with an S-shaped mesh backrest and a U-shaped seat with a waterfall edge. It carries a 15-year warranty, the longest stated here, but its 264 lb capacity is the lowest listed.",
  B0CQD3K8PJ: "TRALT's mesh chair adjusts its lumbar support in depth and offers a Class 3 BIFMA-certified gas lift on a metal-core base rated for 330 lbs. The maker quotes a 19.7 inch wide, 17.3 inch deep seat and a 17.7 to 21.7 inch height range, detail most budget listings leave out.",
  B0H8P4FFSG: "DUMOS's executive chair adds an adjustable headrest to up-and-down mesh lumbar support, flip-up arms and a 120-degree rocking mode. It was the lowest-priced chair here at the time of writing.",
});

export const batch15c: Entry[] = [
  ch({
    slug: "best-office-chair-for-lower-back-pain", kw: "office chair for lower back pain",
    seo: "Best Office Chairs for Lower Back Support", title: "The Best Office Chairs with Adjustable Lower-Back Support",
    crumb: "Best Chairs for Lower Back Support",
    meta: "Six office chairs with adjustable or built-in lumbar support compared on lumbar type, seat adjustment, armrests and weight capacity.",
    dek: "Six chairs whose listings state adjustable or built-in lumbar support, from a $70 mesh chair to ELABEST's 3D lumbar X100.",
    teaser: "Check what kind of lumbar support a chair lists: an adjustable or built-in support stays where you set it, a strap-on pillow does not.",
    intro: [
      "If your lower back aches after a long day at the desk, the chair's lumbar support is the first thing to check, followed by seat height and depth. Many budget chairs use a strap-on pillow that slides out of place; every chair here instead lists lumbar support that is adjustable or built into the backrest.",
      "We researched these six from their Amazon listings. We did not test them and we make no medical claims: a chair can support a better posture, but persistent back pain is a question for a doctor or physiotherapist, who can also advise on desk and screen height.",
    ],
    bottom: [
      "The ELABEST X100 has the most adjustable lumbar support here, with a 3D spring-loaded pad, 5D arms and a footrest, at the highest price. The marrap chair gives two-way lumbar adjustment and 3D arms for much less, and the TRALT mesh chair lists the most complete fit detail with a depth-adjustable lumbar and a BIFMA-certified gas lift.",
      "The Razer Iskur V2 X suits a gaming setup with a lumbar arch built into the backrest, the MUXX.STIL adds a 15-year warranty, and the DUMOS executive chair adds a headrest for the least money.",
    ],
    picks: [
      ["B0DPHLWNBG", "Most Adjustable Lumbar", "a 3D adjustable lumbar pad with 5D flip-up armrests", "Long workdays where fine lumbar adjustment matters."],
      ["B0H2XNYVQP", "Best Two-Way Lumbar Value", "lumbar support that adjusts up/down and forward/back, with 3D flip-up arms", "Mid-budget buyers who want lumbar depth as well as height."],
      ["B0CQD3K8PJ", "Best Fit Detail", "a depth-adjustable lumbar, listed seat dimensions and a Class 3 BIFMA-certified gas lift", "Buyers who want to check fit against their height before ordering."],
      ["B0DXS1BVCB", "Best Gaming-Style Pick", "a lumbar arch built into the backrest with a 152-degree recline", "Gaming setups that want built-in lower-back support."],
      ["B0CQLJ32TC", "Longest Warranty", "an adjustable lumbar cushion and a 15-year warranty", "Buyers who want long support terms in writing."],
      ["B0H8P4FFSG", "Best Budget Pick", "up-and-down mesh lumbar support plus an adjustable headrest at the lowest price here", "The tightest budgets."],
    ],
    prio: ["lumbar", "seat", "arms"], related: ["best-ergonomic-office-chair-with-footrest", "best-ergo-chair-for-gaming", "best-office-chair-for-heavy-person"],
  }),
];
