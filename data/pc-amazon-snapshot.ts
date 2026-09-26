/**
 * Amazon Creators API snapshot (searchItems), fetched 2026-09-26 with scripts/pcj-amazon-search.mjs.
 * Prices are reference only and are never rendered; refresh this file before publishing updates.
 */
export const amazonSnapshot: Record<string, { title: string; imageUrl: string; price: string }> = {
  B0FBY3F1NT: {"title":"be quiet! Pure Power 13 M 850W Power Supply, 80+ Gold, Cybenetics Platinum","imageUrl":"https://m.media-amazon.com/images/I/51NcpqwxV1L._SL500_.jpg","price":"$109.90"},
  B0DPR86ZC8: {"title":"CORSAIR RM850e (2025) ATX 3.1 PCIe 5.1 Ready 850W Power Supply – Black","imageUrl":"https://m.media-amazon.com/images/I/41t9l5RZsGL._SL500_.jpg","price":"$115.99"},
  B0DLFMTX12: {"title":"Seasonic Focus GX-850 850W Power Supply ATX 3.1 & PCIe 5.1 Ready","imageUrl":"https://m.media-amazon.com/images/I/41a1x2C18rL._SL500_.jpg","price":"$159.99"},
  B0FLFGG1CC: {"title":"CORSAIR RM850x ATX 3.1 PCIe 5.1 Ready Fully Modular 850W Power Supply – Low-Noise, Cybenetics Gold Efficiency, Native 12V-2x6 Connector – Black","imageUrl":"https://m.media-amazon.com/images/I/41lWLP0JjGL._SL500_.jpg","price":"$139.99"},
  B0FF7TGMD2: {"title":"MSI MAG A850GLS PCIE5, Fully Modular Compact Gaming 850W Power Supply, 80+ Gold, ATX 3.1 & PCIe 5.1 Ready, Native Dual-Color 12V-2x6 Embossed Jacket Cables, Low-Noise, 10 Year Warranty","imageUrl":"https://m.media-amazon.com/images/I/51ThTcCBQiL._SL500_.jpg","price":"$139.99"},
  B0FX8FD62M: {"title":"ASUS ROG PG27AQWP-W 27 Inch 1440p 540Hz Tandem OLED Gaming Monitor","imageUrl":"https://m.media-amazon.com/images/I/41EnA34DwRL._SL500_.jpg","price":"$1,099.00"},
  B0DF786923: {"title":"LG ‎27GS93QE 27-inch Ultragear OLED Gaming Monitor QHD 1440p 240Hz 0.03ms DisplayHDR True Black 400 AMD FreeSync Premium Pro NVIDIA G-Sync HDMI 2.1 DisplayPort Tilt/Height/Pivot Stand Black","imageUrl":"https://m.media-amazon.com/images/I/51xpRvvZxgL._SL500_.jpg","price":"$499.99"},
  B0FKVWSLS6: {"title":"msi, MAG 272QP QD-OLED X50, 27-Inch, WQHD, 2560x1440, Gaming Monitor, Quantum Dot OLED Panel, 500Hz, 0.03ms, DisplayHDR True Black 500, HDMI 2.1, DP 1.4a, USB C (15WPD), Tilt/Height Adjustable, Black","imageUrl":"https://m.media-amazon.com/images/I/51LX9SP2rRL._SL500_.jpg","price":"$599.99"},
  B0FKVTBBL4: {"title":"msi, MAG 271QP QD-OLED X28, 27-Inch, WQHD, 2560x1440, Gaming Monitor, Quantum Dot OLED Panel, 280Hz, 0.03ms, DisplayHDR True Black 400, HDMI 2.1, DP 1.4a, USB C (15WPD), Tilt/Height Adjustable, Black","imageUrl":"https://m.media-amazon.com/images/I/51u2FKa9IGL._SL500_.jpg","price":"$449.99"},
  B0G631LBJT: {"title":"GIGABYTE MO27Q28G 27\" W-OLED QHD AMD Freesync Premium Pro Gaming Monitor","imageUrl":"https://m.media-amazon.com/images/I/41y2xgWfUaL._SL500_.jpg","price":"$419.95"},
  B0C8ZJKPWC: {"title":"AOC 27 Inch Gaming Monitor QHD 180Hz Mini-LED HDR1000, Q27G3XMN","imageUrl":"https://m.media-amazon.com/images/I/41XgDaElikL._SL500_.jpg","price":"$290.99"},
  B0CR1JCTKF: {"title":"Keychron Q1 Max 75% QMK/VIA Wireless Custom Mechanical Keyboard with Knob","imageUrl":"https://m.media-amazon.com/images/I/41+AxU0wbOL._SL500_.jpg","price":"$229.99"},
  B0CR16KS3F: {"title":"Keychron V1 Max QMK Wireless Mechanical Keyboard, 75% Layout Custom Knob","imageUrl":"https://m.media-amazon.com/images/I/41BCwEZxxUL._SL500_.jpg","price":"$99.99"},
  B0D14N2QZF: {"title":"AULA F75 Pro Wireless Mechanical Keyboard,75% Hot Swappable Custom Keyboard with Knob,RGB Backlit,Pre-lubed Reaper Switches,Side Printed PBT Keycaps,2.4GHz/USB-C/BT5.0 Mechanical Gaming Keyboards","imageUrl":"https://m.media-amazon.com/images/I/41gvYA4qsmL._SL500_.jpg","price":"$68.99"},
  B0F11G7G48: {"title":"SteelSeries Apex Pro TKL Gen 3 Gaming Keyboard - OmniPoint 3.0 Analog Magnetic Switches, Quickset Auto-Presets (Rapid Trigger, Rapid Tap/SOCD, Protection Mode), OLED, RGB, PBT Keycaps, USB-C, White","imageUrl":"https://m.media-amazon.com/images/I/41Hgn9Agh+L._SL500_.jpg","price":"$181.21"},
  B0FRPGVP9G: {"title":"Razer Huntsman V3 Pro TKL 8KHz Esports Gaming Keyboard, Black","imageUrl":"https://m.media-amazon.com/images/I/41Rw2Dap5yL._SL500_.jpg","price":"$219.99"},
};

export const amazonUrl = (asin: string) => `https://www.amazon.com/dp/${asin}`;
export const amazonImage = (asin: string) => amazonSnapshot[asin].imageUrl;
