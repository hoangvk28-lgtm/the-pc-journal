import type { GuideModule } from "@/lib/pc-content/types";

/** Final top-up modules inserted before each guide's "next-steps" module. */
export const componentsExtraF: Record<string, GuideModule[]> = {
  "motherboard-m-2-sata-and-pcie-lane-sharing-explained": [
    {
      kind: "callout",
      tone: "note",
      heading: "Keep a record of the layout",
      body: "Once the build works, note which drive sits in which slot and port, and keep a photo of the manual's sharing table. If you add a drive a year later, that note saves you from rediscovering which port a new M.2 drive will switch off, and from guessing which cable belongs to which disk.",
    },
  ],
  "front-panel-usb-c-and-motherboard-headers-explained": [
    {
      kind: "callout",
      tone: "caution",
      heading: "Do not bend pins to make a plug fit",
      body: "If a front-panel plug will not seat, stop and compare its shape, key and pin count with the header in the manual. A bent pin on a USB header can be hard to repair, and a plug forced into the wrong header, such as a USB 2.0 plug on a USB 3.0 header, can damage the board or the connected device. Match the connector first, then connect.",
    },
  ],
  "how-to-check-cpu-cooler-compatibility": [
    {
      kind: "callout",
      tone: "note",
      heading: "Keep the old mounting parts",
      body: "Keep the cooler's box, brackets and screws after the first install. If you upgrade the board or the socket later, the original mounting kit may need a different bracket, and having every part to hand makes it easy to ask the maker for the right replacement.",
    },
  ],
};
