import type { GuideModule } from "@/lib/pc-content/types";

/**
 * Extra modules for the monitors / pc-builds wave 1 guides. They are inserted before each
 * guide's closing next-steps module (see monitors-builds-wave1.ts). Figures are published
 * standards or arithmetic; anything that differs per model is written as what to check.
 */
export const wave1Extras: Record<string, GuideModule[]> = {
  /* 1 ─────────────────────────────────────────────── */
  "hdmi-2-1-vs-displayport-for-high-refresh-monitors": [
    {
      kind: "explanation",
      heading: "Worked example: does your mode fit the cable?",
      paragraphs: [
        "You can estimate this yourself. Multiply width by height by refresh rate by bits per pixel. At 2560 x 1440, 240 Hz and 8 bits per colour (24 bits per pixel) that is about 21.2 Gbps of picture data, or roughly 22.5 Gbps once reduced-blanking timing is added, which fits inside DisplayPort 1.4's roughly 25.9 Gbps of usable capacity with a little room to spare. Switch the same mode to 10 bits per colour (30 bits per pixel) and the figure rises to roughly 28 Gbps with timing included, which no longer fits without compression.",
        "At 3840 x 2160 the same arithmetic gives roughly 25 Gbps for 120 Hz at 8 bits once reduced-blanking timing is included, just under the DisplayPort 1.4 ceiling, and roughly 30 Gbps at 144 Hz, which is over it. This is why 4K at 144 Hz monitors on DisplayPort 1.4 depend on DSC, and why a monitor that offers 10-bit colour at its top refresh rate may quietly lean on compression or on chroma subsampling to get there.",
        "HDMI 2.0 is far tighter. Its 18 Gbps link carries about 14.4 Gbps of usable data, so 4K at 60 Hz at 8 bits (about 14.3 Gbps with standard timing) just fits, but 1440p at 144 Hz at 10 bits (roughly 17 to 18 Gbps) does not. That single fact explains many reports of a monitor offering 144 Hz on DisplayPort and only 60 or 100 Hz over an HDMI cable.",
      ],
    },
    {
      kind: "explanation",
      heading: "DSC in practice: what it changes and what it can cost",
      paragraphs: [
        "DSC compresses the stream by up to roughly three to one and is specified to be visually lossless. Most people cannot tell it is active in games or desktop use. The practical costs are elsewhere: some monitors take longer to resync when you change modes, a few show a short black flash when a game switches between full screen and windowed, and some graphics cards limit how many displays can run compressed at the same time.",
        "Some monitors and graphics drivers also disable specific features while DSC is running. Reports vary by model and driver version, so look for a note on the monitor's product page or in independent reviews rather than assuming it applies. If you plan a dual-monitor setup with two compressed displays, check the graphics card maker's documentation for multi-display limits with DSC.",
      ],
    },
    {
      kind: "steps",
      heading: "If the refresh rate you paid for is missing",
      intro: "Work from the easiest cause to the least likely one.",
      steps: [
        { title: "Confirm Windows is using it", body: "Open Settings, System, Display, Advanced display, choose the monitor and open the Choose a refresh rate list. A new monitor often starts at 60 Hz until you change it here." },
        { title: "Check the monitor input and the on-screen menu", body: "Some monitors have a DisplayPort version or HDMI mode setting, for example a choice between DisplayPort 1.2 and 1.4, or between HDMI 2.0 and 2.1 modes. Set the highest version your card supports, then retest." },
        { title: "Swap to the cable the maker recommends", body: "Use the cable from the box or one that carries the certification for your target rate. Long or unbranded cables are the most common reason a top mode is missing." },
        { title: "Look at the driver's resolution list", body: "In the NVIDIA Control Panel, open Change resolution; in AMD Software, open the Display page. If a mode appears here but not in Windows, a driver update or a restart often fixes it." },
        { title: "Test another port on the card", body: "Plug into a different DisplayPort or HDMI output on the card. On some cards, outputs are not all equal, and the manual lists which ones carry the newest standard." },
      ],
    },
    {
      kind: "explanation",
      heading: "Adapters, docks and multi-monitor setups",
      paragraphs: [
        "A DisplayPort to HDMI adapter is limited by its own chip as well as by the two ports. Active adapters differ widely in the highest mode they pass, so read the adapter's specification for the exact resolution, refresh rate, HDR and variable-refresh support before relying on it. Passive adapters rely on the graphics card sending an HDMI signal over a DisplayPort connector, which also limits the top mode.",
        "USB-C docks and hubs add another layer. The dock's video chip and the laptop's USB-C port both set the ceiling, and many docks share one data link between the displays. If a monitor works at full rate when connected directly but not through a dock, the dock is the limit, and its spec sheet lists the figures.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More ways a fast monitor ends up running slowly",
      items: [
        { mistake: "Judging cable quality by length or price alone.", instead: "Look for the certification label for your target rate and keep runs short. A cable that works at 60 Hz can fail at 144 Hz." },
        { mistake: "Leaving the card on an old driver after a monitor upgrade.", instead: "Update the graphics driver before testing a new high-refresh mode, since new monitors and DSC modes are often added in later releases." },
        { mistake: "Assuming a console and a PC need the same port.", instead: "Consoles use HDMI. A PC graphics card usually offers both, so you can run the PC on DisplayPort and keep the HDMI 2.1 input free for a console." },
      ],
    },
  ],

  /* 2 ─────────────────────────────────────────────── */
  "g-sync-vs-freesync-vs-hdmi-vrr": [
    {
      kind: "explanation",
      heading: "Reading the VRR range on a spec sheet",
      paragraphs: [
        "A monitor's VRR range is the span of refresh rates it can follow, for example 48 to 165 Hz. Below the bottom figure the panel cannot slow down any further, so the display depends on low framerate compensation. That feature shows each frame twice or more, and it works reliably when the top of the range is at least about twice the bottom.",
        "A narrow range, such as 48 to 75 Hz, leaves little room for compensation, so a dip to 40 frames per second can produce tearing or stutter that a wider range would hide. If your games often run near 60 frames per second on demanding titles, a monitor with a low minimum refresh matters more than one with a very high maximum.",
        "Read the port column too. Some monitors list one range for DisplayPort and a smaller one for HDMI. A monitor that supports VRR over HDMI 2.0 on older AMD cards, for instance, may behave differently from the same monitor over DisplayPort, so use the port the maker documents for your graphics card.",
      ],
    },
    {
      kind: "steps",
      heading: "Settings that work well together",
      steps: [
        { title: "Turn on VRR in driver and monitor", body: "Follow the steps above first. Both must be on, and the driver will tell you if the monitor does not report support." },
        { title: "Keep driver V-sync on, cap the frame rate in game", body: "Many guides suggest enabling V-sync in the graphics driver while leaving it off in the game, plus a frame cap a few frames below the maximum refresh rate. The driver V-sync then only applies at the edge of the range, which avoids tearing without adding the usual delay while you stay inside it." },
        { title: "Check the display mode of the game", body: "Exclusive full screen is the most predictable choice. In borderless or windowed mode, VRR depends on the driver option that applies it to windowed games and on the Windows graphics settings." },
        { title: "Try the low-latency options", body: "NVIDIA's Reflex and AMD's Anti-Lag reduce render queue delay where a game supports them. They are separate from VRR, and you can test them one at a time." },
      ],
    },
    {
      kind: "explanation",
      heading: "Consoles, TVs and mixed setups",
      paragraphs: [
        "Current consoles use HDMI VRR rather than DisplayPort Adaptive-Sync, so a monitor you share with a console needs an HDMI input that lists VRR support. Check whether the feature works at the console's output resolution and refresh rate, since some inputs limit VRR to a lower mode.",
        "On a PC with two monitors, VRR can behave differently when a second display runs a different refresh rate or sits on another input. If you see stutter on the main screen only while a second display is on, test with the second one disconnected before changing anything else. Driver release notes and the maker's support pages are the best places to look for known issues with a specific monitor.",
      ],
    },
    {
      kind: "explanation",
      heading: "Questions readers ask",
      paragraphs: [
        "Does G-SYNC Compatible work on a FreeSync monitor? Often yes. NVIDIA validates specific monitors and enables the feature automatically on them, and other adaptive-sync monitors can usually be switched on manually in the control panel, with results that vary by model. Does VRR add input lag? It does not add the delay that V-sync does, and the effect on latency is small when frame rates stay within the range.",
        "Is VRR worth paying for on a 60 Hz office monitor? For work, there is little benefit. It helps with games and video where frame rate varies. Why does my screen flicker only in menus or loading screens? Frame rate can swing wildly there, and some panels show brightness changes as the refresh rate changes. Capping menu frame rates or switching the feature off for that program is a reasonable test.",
      ],
    },
    {
      kind: "mistakes",
      heading: "Common setup errors",
      items: [
        { mistake: "Leaving VRR enabled on a monitor and card pairing that flickers, then blaming the game.", instead: "Turn VRR off for one session. If the flicker disappears, the problem sits with the monitor and driver combination, and the maker's firmware and driver notes are the next stop." },
        { mistake: "Applying an in-game limit and a driver limit at once.", instead: "Pick one limiter, so that you know which one is controlling the result when you test." },
      ],
    },
  ],

  /* 3 ─────────────────────────────────────────────── */
  "oled-monitor-burn-in-warranty-and-prevention": [
    {
      kind: "explanation",
      heading: "What the warranty wording usually hinges on",
      paragraphs: [
        "Several makers publish a dedicated OLED statement that covers burn-in for a stated period, often three years, and attaches conditions to it. Reported conditions include keeping the panel's protective features enabled (pixel shifting, an image-retention refresh routine, a screen saver or auto-dim) and leaving the monitor in standby so that maintenance can run. Philips, Acer, Corsair and AOC all publish documents of this kind, and the terms differ by brand and region, so find the statement for your exact model.",
        "Read three details. First, which condition counts as covered: burn-in, image retention or both. Second, whether the cover is region-specific, since some policies apply only in certain countries. Third, what you must do to claim, such as photographs, a run of the refresh routine and proof of purchase. Screenshots of the settings page before a problem appears can save a dispute later.",
      ],
    },
    {
      kind: "steps",
      heading: "A setup routine for a new OLED monitor",
      steps: [
        { title: "Turn on the maker's protection features", body: "Open the on-screen menu and enable pixel shifting or orbit, and any screen saver, logo dimming or auto-dim option the model offers. Some makers state that switching these off can affect warranty cover." },
        { title: "Use a dark theme and hide static elements", body: "In Windows, choose dark mode, set the taskbar to auto-hide and use a wallpaper with no fixed bright shapes. Many browsers and editors have dark themes of their own." },
        { title: "Set sleep timers", body: "In Settings, System, Power & battery, set the screen to turn off after a short period. A few minutes of inactivity at full brightness is the usual pattern that adds wear for no benefit." },
        { title: "Leave it in standby when the maintenance routine runs", body: "Some monitors run a short pixel refresh when you turn them off, and others suggest running one after a set number of cumulative hours. The manual describes which, and powering the screen on partway usually cancels it." },
        { title: "Keep a record", body: "Note the purchase date, serial number and the warranty statement. If a faint shadow appears, photograph it on a neutral grey background before you run any routine." },
      ],
    },
    {
      kind: "explanation",
      heading: "Burn-in or just image retention?",
      paragraphs: [
        "Image retention is a temporary ghost that fades after the panel shows moving content or runs a refresh routine. Burn-in is uneven wear that stays. The two look alike at first, so the sensible test is to run the maker's refresh routine, show varied content for a while and check again on a grey full-screen image. A ghost that fades was retention.",
        "Be cautious about repeating the refresh routine again and again. Makers describe it as maintenance to run at the suggested intervals, and some independent writers argue that frequent runs add their own wear to compensate. Use it at the intervals in the manual rather than as a nightly habit.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Check your own usage before choosing OLED",
      items: [
        { label: "Screen time on fixed layouts", how: "Look at how many hours a day one application with fixed toolbars sits on screen. Spreadsheet and coding work with a static layout is the highest-risk pattern; games and video are varied." },
        { label: "Peak brightness you actually use", how: "Check the brightness value in the on-screen menu. A level that is comfortable in a dim room is usually well below the maximum." },
        { label: "Whether you leave it on overnight", how: "A monitor left showing the same screen for long stretches is more exposed than one that sleeps. Check the sleep setting in Windows power options." },
        { label: "Your replacement plan", how: "Ask whether you would rather rely on warranty or on a panel type with no burn-in concern for your usage, such as an IPS or mini-LED monitor." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Extra pitfalls",
      items: [
        { mistake: "Using an OLED as a permanent second screen for chat and stock tickers.", instead: "Keep always-on fixed items on an LCD monitor and use the OLED for games, video and mixed work." },
        { mistake: "Ignoring firmware updates.", instead: "Check the maker's support page for firmware notes that mention panel care or burn-in handling." },
      ],
    },
  ],

  /* 4 ─────────────────────────────────────────────── */
  "will-my-laptop-drive-a-usb-c-portable-monitor": [
    {
      kind: "explanation",
      heading: "Three kinds of USB-C port that look identical",
      paragraphs: [
        "A data-only USB-C port carries USB signals and perhaps charging, with no video. A port with DisplayPort Alt Mode can send a DisplayPort signal to a display over the same connector. Thunderbolt 3, Thunderbolt 4 and USB4 ports can also carry DisplayPort signals, and they are usually, though not always, the better-labelled ones. Laptop makers often mix these on one machine, so one port may work while its neighbour shows nothing.",
        "The portable monitor has to agree with this. Some monitors take video and power through a single cable and need the laptop port to supply enough power. Others have a second USB-C port that is for power only, where a phone charger can feed the screen so that the laptop port does not need to provide it.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Match your laptop port to the monitor connection",
      columns: ["Laptop port", "Video over USB-C", "What to do"],
      rows: [
        ["USB-C with DisplayPort logo", "Yes, through Alt Mode", "Use a single cable if the monitor accepts the power draw"],
        ["Thunderbolt 3 or 4, or USB4", "Yes, normally", "Use a full-featured cable; check which port on the machine carries it"],
        ["USB-C marked only with a USB symbol", "Often no", "Use the HDMI route or a DisplayLink-style adapter, and read the adapter notes"],
        ["Desktop graphics card, no USB-C", "No", "Use HDMI or DisplayPort and a separate USB power connection"],
      ],
    },
    {
      kind: "explanation",
      heading: "Why power causes more trouble than video",
      paragraphs: [
        "A portable screen asks the laptop for power, and a laptop on battery may limit what a port supplies. If the monitor dims, flickers or disconnects when you unplug the charger, the port is probably budget-limited. Charging the laptop through one USB-C port while the monitor uses another is common practice, and the laptop manual states whether a port is reserved for charging.",
        "If the monitor has its own power-only USB-C port, plug a wall charger there and the video port becomes much less demanding. A powered hub that supports video passthrough can do the same job, as long as its video chip supports your resolution. Check the hub's page for the maximum resolution, because some share a single stream between the HDMI port and the USB-C output.",
      ],
    },
    {
      kind: "explanation",
      heading: "Windows display settings that make a portable screen usable",
      paragraphs: [
        "Open Settings, System, Display and use Rearrange to match the physical layout of your screens. Choose Extend rather than Duplicate if you want a second workspace, and press Windows+P to switch modes quickly. Set scaling for each display separately, since a 15.6-inch 1080p screen and a 4K laptop panel need different values.",
        "If the portable monitor is in portrait, rotate it under Display orientation. Many portable monitors include a rotation sensor or a menu option, and mismatches between the two cause a sideways picture. Make a note of the resolution the monitor reports so that you can check it against the maker's page.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More portable monitor pitfalls",
      items: [
        { mistake: "Using a thin phone cable that supports USB 2.0 data only.", instead: "Use the cable from the box, or one that states video support." },
        { mistake: "Ignoring screen brightness settings on battery power.", instead: "Lower the brightness to see if the problem is power budget before you swap the cable." },
        { mistake: "Plugging into a laptop's docking-only USB-C port.", instead: "Consult the manual for which port supports display output and use that one." },
      ],
    },
  ],

  /* 5 ─────────────────────────────────────────────── */
  "monitor-size-and-pixel-density-for-text": [
    {
      kind: "explanation",
      heading: "Why 27-inch 1440p and 4K feel so different",
      paragraphs: [
        "At 27 inches, 2560 x 1440 works out at about 109 pixels per inch, and 3840 x 2160 at about 163. The first suits 100 percent scaling at normal desk distance, and many users find text clear without any change. The second has enough pixels that Windows scaling at 150 percent gives sharper characters while keeping the same apparent size as the 1440p screen.",
        "That difference is about quality of rendering, not workspace. At 150 percent a 27-inch 4K monitor gives an effective desktop of 2560 x 1440. If you want more usable space, you need a larger monitor or a lower scale, and both reduce the density advantage. State your goal first, then check the arithmetic.",
        "Fonts also matter. Windows draws text with ClearType, which tunes to subpixel layouts, and some panel types (notably certain OLED and non-standard subpixel arrangements) can show mild colour fringing on fine text. Independent reviews often cover text clarity for specific models, so read that section before buying a monitor for document work.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Suggested starting points by distance",
      intro: "These are starting points to test against your own eyes and desk, not rules.",
      columns: ["Seated distance", "Size and resolution to compare", "Why"],
      rows: [
        ["About 50 to 60 cm", "24 to 27 inch at 1440p or 4K", "Close viewing rewards higher density"],
        ["About 70 to 80 cm", "27 to 32 inch at 4K, or 34 inch ultrawide at 3440 x 1440", "Larger screens need more pixels to stay sharp"],
        ["Over 90 cm", "32 inch 4K or larger", "At longer distances pixel structure is less visible"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Test what you have now",
      items: [
        { label: "Find your current PPI", how: "Divide the diagonal pixel count (square root of width squared plus height squared) by the diagonal size in inches. Do this for the monitor you use today so that you can compare it with candidates." },
        { label: "Read your Windows scale", how: "Open Settings, System, Display and note the Scale value. If you already run 125 percent or more, a higher-density monitor will help." },
        { label: "Measure the distance", how: "Use a tape measure from your eyes to the screen surface while sitting normally, not leaning forward." },
        { label: "Look at what you display", how: "Check how many windows you keep side by side. Two documents at once ask for width; one document asks for density." },
      ],
    },
    {
      kind: "explanation",
      heading: "Graphics card load and refresh rate trade-offs",
      paragraphs: [
        "More pixels mean more work for the graphics card in games, not in documents. A 4K screen asks for about 2.25 times as many pixels as 1440p, so a card that holds a high frame rate at 1440p may need upscaling or lower settings at 4K. If gaming is the main use and text is secondary, 1440p at a high refresh rate may be the better fit.",
        "Many monitors let you switch resolution on the fly, but a non-native resolution is blurred by scaling. If you want one screen for both uses, look for a 4K monitor that offers a high-refresh 1080p or 1440p mode, which some models advertise, and check the maker's description of how it works.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More density pitfalls",
      items: [
        { mistake: "Buying a 4K monitor and leaving apps unscaled in older software.", instead: "Check the legacy applications you rely on. Older programs may look small or blurry until you adjust their high DPI settings." },
        { mistake: "Comparing PPI across sizes without checking viewing distance.", instead: "Compare candidate monitors at your own distance, because the same density looks different from 50 cm and from 90 cm." },
      ],
    },
  ],

  /* 6 ─────────────────────────────────────────────── */
  "displayhdr-ratings-explained-for-pc-monitors": [
    {
      kind: "explanation",
      heading: "Why HDR on a monitor often disappoints",
      paragraphs: [
        "HDR video is mastered for displays that can show very bright highlights next to deep shadows. A monitor with a modest peak brightness, no local dimming and a single backlight zone cannot do both at once. It can raise the brightness of the whole image, which makes dark scenes grey, or lower it and lose the highlight. The result is HDR that looks flat or washed out compared with the standard picture.",
        "That is the reason tier numbers matter less than panel technology. A tier with a low brightness figure and no local dimming mostly proves the monitor accepts an HDR signal. A tier backed by many dimming zones or per-pixel lighting produces a different picture. Read independent measurements of contrast, peak brightness and zone behaviour before deciding.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What to look for beyond the tier label",
      columns: ["Feature", "Why it matters", "Where to check"],
      rows: [
        ["Local dimming zones", "More zones let bright and dark areas coexist", "Spec page and independent reviews"],
        ["Peak brightness in a small window", "Shows highlight capability", "Reviews that state test patterns"],
        ["Sustained full-screen brightness", "Affects bright scenes and desktop HDR use", "Reviews, not the box"],
        ["Wide colour gamut coverage", "Needed for richer colour in HDR content", "Spec page, plus measured coverage"],
        ["Port limits for HDR", "HDR needs extra bandwidth at high refresh", "Monitor manual"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Confirm HDR is really working",
      items: [
        { label: "Windows toggle", how: "Open Settings, System, Display, HDR. If the toggle is greyed out, the monitor, cable or port may not support HDR in the current mode." },
        { label: "Monitor menu", how: "Some monitors need an HDR option switched on, or they only accept HDR on one input. Read the manual for the exact name." },
        { label: "Test content", how: "Use a game with an HDR calibration page or a video app that offers HDR playback. Look at whether highlights separate from midtones without the dark areas turning grey." },
        { label: "Compare with HDR off", how: "Switch HDR off and compare. If the standard picture looks better, leave HDR off for that monitor and enable it only for content that benefits." },
      ],
    },
    {
      kind: "explanation",
      heading: "OLED, mini-LED and standard LCD in HDR",
      paragraphs: [
        "OLED panels turn pixels off individually, so contrast is excellent and highlights next to black areas look clean, though full-screen brightness is limited compared with the brightest LCD monitors. Mini-LED backlit monitors raise brightness and use many dimming zones, with the trade-off of blooming around small bright objects.",
        "Standard LCD monitors without local dimming rely on the panel's native contrast, which is limited, so HDR is usually modest. This is not a flaw, but a limit worth knowing before you pay extra for an HDR badge. The monitor guides for each panel type carry the details.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More HDR mistakes",
      items: [
        { mistake: "Expecting HDR to look right in every Windows app.", instead: "Use the SDR content brightness slider and accept that some apps are not HDR-aware." },
        { mistake: "Forgetting that the game also has an HDR option.", instead: "Turn HDR on in both Windows and the game, and run the game's calibration screen." },
      ],
    },
  ],

  /* 7 ─────────────────────────────────────────────── */
  "ultrawide-monitor-resolutions-explained": [
    {
      kind: "explanation",
      heading: "Aspect ratio, size and what you actually gain",
      paragraphs: [
        "A 21:9 ultrawide such as 3440 x 1440 is about 34 inches diagonal and offers roughly 38 percent more horizontal pixels than a 2560 x 1440 monitor, with the same height. A 32:9 super ultrawide at 5120 x 1440 is 49 inches in the common size and has the width of two 1440p monitors. Height is the same, so extra vertical space needs a taller format such as 3840 x 1600 or 5120 x 2160.",
        "Width helps with side-by-side windows, timelines and wide spreadsheets, and with immersive games that support the format. It does not help with a long document that needs scrolling, where height matters more. Consider your work before picking a width.",
        "Curvature changes comfort too. Common values are 1800R, 1500R and 1000R, where a smaller number means a tighter curve. A tighter curve on a very wide screen keeps the edges at a similar distance from your eyes, though it can bend straight lines in design work. Try to see the monitor in person if you can.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Check your PC and desk for an ultrawide",
      items: [
        { label: "Graphics card output", how: "Open the card's specification and confirm the DisplayPort or HDMI version supports your target resolution and refresh rate." },
        { label: "Performance headroom", how: "Compare pixel counts: 3440 x 1440 has about 4.95 million pixels versus 3.69 million at 2560 x 1440, so expect heavier demands than ordinary 1440p." },
        { label: "Desk depth and width", how: "Measure the space and the monitor stand's footprint. Large stands can be 25 cm deep or more, and a wall or arm mount may help." },
        { label: "Window management tools", how: "Test Windows Snap layouts and, if needed, the free PowerToys FancyZones tool to arrange windows in zones." },
      ],
    },
    {
      kind: "explanation",
      heading: "Games, video and ultrawide gotchas",
      paragraphs: [
        "Most video is 16:9, so a full-screen video on a 21:9 monitor shows black bars at the sides. That is normal. Zooming to fill the screen crops the picture, and many players prefer the bars. Check the video app for fit and fill options.",
        "Some competitive shooters limit the field of view on ultrawide displays or lock the aspect ratio to keep the game fair, and some older games stretch or crop. PCGamingWiki and the game's settings page list the facts for each title. Check the specific games you play before buying.",
        "If you stream or share your screen, a wide monitor produces a very wide capture. Most sharing tools let you share one window or one region, which keeps viewers from getting an unreadable thumbnail.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Pixel counts and what they ask of the graphics card",
      columns: ["Resolution", "Pixels", "Compared with 2560 x 1440"],
      rows: [
        ["2560 x 1080", "2.76 million", "About 75 percent"],
        ["3440 x 1440", "4.95 million", "About 134 percent"],
        ["3840 x 1600", "6.14 million", "About 167 percent"],
        ["5120 x 1440", "7.37 million", "About 200 percent"],
        ["5120 x 2160", "11.06 million", "About 300 percent"],
      ],
    },
    {
      kind: "mistakes",
      heading: "More ultrawide mistakes",
      items: [
        { mistake: "Buying 49 inches for a desk that is too shallow.", instead: "Allow enough distance to see the edges without turning your head constantly." },
        { mistake: "Expecting one ultrawide to equal any dual-monitor setup.", instead: "If you move windows between screens often, two monitors give a clear divide that one wide panel does not." },
      ],
    },
  ],

  /* 8 ─────────────────────────────────────────────── */
  "windows-display-scaling-for-4k-monitors": [
    {
      kind: "explanation",
      heading: "Why some apps stay blurry while others look sharp",
      paragraphs: [
        "Windows asks each application whether it handles scaling itself. Modern apps do, so text and icons are drawn at the real resolution and look sharp. Older apps do not, so Windows renders them at a lower size and enlarges them, which produces soft text. The same screen can therefore show crisp and fuzzy windows side by side.",
        "Two compatibility settings help. System (Enhanced) scaling improves rendering for some older apps, and the application override lets you pick who performs the scaling. Try each in the application's Properties, Compatibility, Change high DPI settings page. If an app is still fuzzy, check for an update because the developer may have added support.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Diagnose the exact problem",
      items: [
        { label: "Only one app is blurry", how: "Right-click the app's shortcut, choose Properties, Compatibility, then Change high DPI settings, and try the override options one at a time." },
        { label: "Everything looks soft", how: "Check that Windows runs at the monitor's native resolution under Display resolution. The Recommended value is the native one." },
        { label: "Text has colour edges", how: "Run the ClearType tuner and confirm the cable and colour format. A reduced chroma format from a cable limit shows colour fringes on text." },
        { label: "Layout jumps when moving between screens", how: "Check the scale and orientation of each display separately in Settings, System, Display." },
      ],
    },
    {
      kind: "decision-table",
      heading: "Effective workspace at common scales",
      intro: "Effective resolution is the native resolution divided by the scale. Arithmetic only, not a recommendation.",
      columns: ["Native 3840 x 2160 at", "Effective workspace", "Feels like"],
      rows: [
        ["100 percent", "3840 x 2160", "A very large desktop with small text"],
        ["125 percent", "3072 x 1728", "Large workspace, small to medium text"],
        ["150 percent", "2560 x 1440", "Same workspace as a 1440p monitor, sharper text"],
        ["175 percent", "2194 x 1234", "More comfortable text, less room"],
        ["200 percent", "1920 x 1080", "Same layout as a 1080p screen, very sharp"],
      ],
    },
    {
      kind: "explanation",
      heading: "Gaming, remote desktop and creative software",
      paragraphs: [
        "Games draw at their own resolution, so Windows scaling does not change what you see in a full-screen game. Borderless windowed games sometimes pick up the desktop scale and can end up offset or oversized, which a compatibility override on the game's executable can fix.",
        "Remote desktop sessions and virtual machines have their own scaling options. If a remote window looks tiny or huge, check the client's display settings and the scale of the remote system, and set them to agree. Creative applications often add a separate interface scale setting, which is the better place to adjust their toolbars.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More scaling errors",
      items: [
        { mistake: "Changing scale while many apps are open and then wondering why they look wrong.", instead: "Close the apps or sign out and back in after changing the value." },
        { mistake: "Setting different scales on screens of the same size.", instead: "Match the scale on equivalent monitors so that windows keep their size when you move them." },
      ],
    },
  ],

  /* 9 ─────────────────────────────────────────────── */
  "what-a-prebuilt-pc-listing-leaves-out": [
    {
      kind: "explanation",
      heading: "Where makers save money, and how to spot it",
      paragraphs: [
        "A prebuilt PC has a fixed price, so the parts that buyers rarely compare are where costs get trimmed: the power supply, the motherboard, the memory configuration and the cooling. None of these is wrong by itself. A modest power supply can be perfectly adequate for the installed parts. The problem is that you cannot judge it without a name, so an unnamed part is a gap you must close before paying.",
        "Cooling is another common gap. A listing may name the processor and say nothing about the cooler, which can be a small stock cooler or an air or liquid unit. If the listing names a 240 mm or 360 mm liquid cooler, ask for the model and radiator mounting position, because pump noise and tube length vary.",
        "Case airflow matters too. Photographs of the front panel usually show whether the case has a mesh front or a solid one, and the product page may list the number of included fans. A solid front panel with a single rear fan is a different thermal setup than a mesh front with several fans.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Questions to put to the seller before buying",
      items: [
        { label: "Power supply", how: "Ask for the model, wattage, efficiency rating and the connectors it provides. A 12VHPWR or 12V-2x6 cable matters if the card needs it." },
        { label: "Motherboard", how: "Ask for the model or at least the chipset and form factor, plus whether there are spare M.2 and memory slots." },
        { label: "Memory", how: "Confirm the number of sticks, speed and whether an XMP or EXPO profile is enabled out of the box." },
        { label: "Storage", how: "Ask for the drive model or at least the interface (NVMe or SATA) and whether a second M.2 slot is free." },
        { label: "Warranty and return policy", how: "Confirm the period, who services the system, and whether opening the case voids it." },
      ],
    },
    {
      kind: "decision-table",
      heading: "Common unnamed parts and what each affects",
      columns: ["Unnamed part", "What it affects", "What to ask"],
      rows: [
        ["Power supply", "Stability, noise and upgrade headroom", "Model, wattage, connectors"],
        ["Motherboard", "Ports, upgrades and BIOS support", "Chipset, slots, form factor"],
        ["Memory", "Speed and dual-channel behaviour", "Sticks, speed, profile status"],
        ["CPU cooler", "Temperature and noise under load", "Model, size and fan count"],
        ["Case", "Airflow and space for upgrades", "Model, fan layout, card clearance"],
      ],
    },
    {
      kind: "explanation",
      heading: "Software, warranty and the first week",
      paragraphs: [
        "Prebuilt systems often arrive with trial software and manufacturer utilities. Most can be uninstalled, but check which ones the warranty or support service expects to find. A clean Windows install is possible on most machines, though you should save the recovery media or confirm the maker's restore process before you wipe the drive.",
        "Use the return window to run tests, not to admire the case. Run a game or a render for half an hour, listen for coil whine and fan noise, and check temperatures with a monitoring tool. If the system throttles or crashes, a seller who knows you checked within the window is more likely to resolve it.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More prebuilt pitfalls",
      items: [
        { mistake: "Trusting a headline wattage without the model.", instead: "Ask which power supply it is, because wattage alone says nothing about quality or connectors." },
        { mistake: "Skipping the memory check because the listing says 16 GB.", instead: "Confirm two sticks and the speed in Task Manager after delivery." },
      ],
    },
  ],

  /* 10 ────────────────────────────────────────────── */
  "first-boot-checklist-after-building-a-pc": [
    {
      kind: "explanation",
      heading: "What to expect on the first power-on",
      paragraphs: [
        "The first start of a new build can take longer than later ones. Boards often run memory training the first time, and after you change memory settings in the BIOS they may repeat it, which can leave a black screen for tens of seconds. Wait a full minute or two before assuming failure, and watch the board's debug lights or code display if it has one.",
        "Fans spinning and lights glowing show that the power supply works, not that the system will reach the BIOS. Use the board manual's list of debug indicators to see what the board is stuck on, for example CPU, memory, graphics or boot device.",
      ],
    },
    {
      kind: "steps",
      heading: "If there is no picture on first boot",
      steps: [
        { title: "Check the display cable and input", body: "Plug the monitor into the graphics card, not the motherboard, and select the matching input on the monitor." },
        { title: "Reseat the graphics card and memory", body: "Switch off at the supply, press each memory stick until the clips click and press the card fully into its slot." },
        { title: "Boot with one memory stick", body: "Try one stick in the slot the manual recommends. If it boots, add the second one and compare." },
        { title: "Check the CPU power cable", body: "Make sure the EPS connector is fully seated and that the cable runs to the CPU header, not a graphics card socket." },
        { title: "Clear the CMOS", body: "Use the jumper or button described in the manual, or remove the coin cell for a short time with the power off. This returns settings such as memory profiles to defaults." },
        { title: "Check BIOS support for the CPU", body: "Look up your board on the maker's CPU support list. A new processor may need a BIOS version the board did not ship with, and some boards offer a flashback button for that." },
      ],
    },
    {
      kind: "check-your-pc",
      heading: "After Windows installs",
      items: [
        { label: "Memory speed", how: "In Task Manager, Performance, Memory, confirm the speed matches the rated value and that both sticks are listed." },
        { label: "Graphics driver", how: "Open Device Manager, Display adapters, and confirm the model name rather than Microsoft Basic Display Adapter." },
        { label: "Storage health and drive layout", how: "Open Disk Management and make sure each drive appears, and that you installed Windows to the drive you intended." },
        { label: "Temperatures at idle", how: "Use a monitoring tool to check CPU and GPU idle temperatures, and listen for any fan that ramps up in short bursts." },
        { label: "Windows updates", how: "Run Windows Update until it reports nothing pending, then install the chipset driver from the board maker." },
      ],
    },
    {
      kind: "explanation",
      heading: "BIOS settings worth reviewing once",
      paragraphs: [
        "Beyond the memory profile, check fan curves, boot order and any power-limit presets. Fan curves on a new build are often tuned for quiet at idle and louder under load, and the BIOS fan page lets you smooth the transition. Boot order only matters while an installer is attached, so move the Windows drive back to first when you finish.",
        "If your CPU and board support Resizable BAR or similar graphics features, check that the setting is available and enabled where the graphics card maker documents it. Document the changes you made, so you can undo them if stability problems appear later.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More first-boot slips",
      items: [
        { mistake: "Leaving the plastic cooler film or standoffs misplaced.", instead: "Re-check the cooler contact and motherboard standoffs against the case manual before closing the panels." },
        { mistake: "Forgetting to connect case fans to a fan header.", instead: "Count the fan cables, plug each into a header, and confirm they spin in the BIOS monitor page." },
      ],
    },
  ],

  /* 11 ────────────────────────────────────────────── */
  "mini-pc-vs-small-form-factor-pc-build": [
    {
      kind: "explanation",
      heading: "Cost, effort and what you give up",
      paragraphs: [
        "A mini PC arrives ready to run. You add memory and storage if it comes bare, plug in a display and begin. A Mini-ITX build asks for more decisions: case, motherboard, processor, cooler, power supply, memory and storage must all fit and work together. In return you choose every part and can replace most of them later.",
        "Cost is rarely a simple comparison. A mini PC with an integrated graphics chip costs less than a build with a dedicated graphics card, but it is also a different class of machine. If you need a discrete card, the comparison is between a small tower and a laptop-class or compact system, not between two things that do the same job.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Side by side",
      columns: ["Question", "Mini PC", "Mini-ITX build"],
      rows: [
        ["Dedicated graphics card", "Usually not possible", "Yes, within case clearance"],
        ["Memory upgrades", "Often limited by SO-DIMM slots", "Standard DIMM slots on the board"],
        ["Noise under load", "Varies, small fans spin fast", "Depends on cooler and case"],
        ["Setup time", "Minutes", "Hours, plus compatibility research"],
        ["Replace the motherboard later", "Not practical", "Yes, within socket and case limits"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Questions to settle before buying either",
      items: [
        { label: "Peak workload", how: "Write down the heaviest task you run, such as video export or 3D games, and check whether integrated graphics handle it." },
        { label: "Display and port count", how: "Count monitors and peripherals and compare against the ports on the model or the board." },
        { label: "Upgrade plan", how: "Decide if you expect to change memory, storage or graphics in two years, and pick the route that allows it." },
        { label: "Placement", how: "Check whether the machine will sit on the desk, behind a monitor or in a cabinet, and look at each model's ventilation notes." },
      ],
    },
    {
      kind: "explanation",
      heading: "Small-build problems readers run into",
      paragraphs: [
        "Heat is the main one. Small cases leave little room for air, so a processor that boosts in short bursts may slow after a few minutes of sustained work. Look for reviews that run long loads, and prefer a processor with a lower power limit if the case is cramped. Cable routing is the second problem: SFX power supplies have short cables, and sealed cases make bad routing hard to fix after assembly.",
        "Plan the build order from the manual. Many compact cases need the power supply, cooler and cables installed before the graphics card, and some require removing panels in a specific sequence. Reading reviews of the exact case for build notes saves frustration.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More small-PC mistakes",
      items: [
        { mistake: "Choosing a powerful processor for a case with limited cooling.", instead: "Match the processor's sustained power to what the cooler and case can remove, and set a lower power limit in the BIOS if needed." },
        { mistake: "Assuming a mini PC runs quietly because it is small.", instead: "Read measured noise from independent reviews, since small fans may run at higher speed." },
      ],
    },
  ],

  /* 12 ────────────────────────────────────────────── */
  "windows-activation-and-bitlocker-after-a-pc-upgrade": [
    {
      kind: "explanation",
      heading: "Licence types in plain terms",
      paragraphs: [
        "A retail licence belongs to you and can generally move to a new PC, subject to the licence terms. An OEM licence, for example one that came with a prebuilt PC, is tied to the original machine under its terms. A digital licence linked to your Microsoft account follows the account, and the activation troubleshooter can use it to reactivate Windows after a major hardware change.",
        "You can see what you have at Settings, System, Activation, which tells you whether Windows is activated and whether the licence is linked to your account. If it says activated with a digital licence linked to your account, you are in the strongest position before a motherboard swap.",
      ],
    },
    {
      kind: "explanation",
      heading: "Device Encryption versus BitLocker",
      paragraphs: [
        "Some Windows 11 PCs turn on Device Encryption automatically when you sign in with a Microsoft account, and the key is stored in that account. Professional editions can use full BitLocker, where you choose where the key goes. A PC may therefore be encrypted even if you never opted in, which is why checking before an upgrade is worthwhile.",
        "BitLocker records the state of the boot environment in the TPM. When the motherboard, firmware or secure boot settings change, the recorded state no longer matches and Windows asks for the 48-digit recovery key rather than unlocking the drive. This is designed behaviour, not a fault, which is why having the key beforehand is the only sure fix.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Find out whether your drive is encrypted",
      items: [
        { label: "Settings page", how: "Open Settings, Privacy & security, Device encryption. If the option is present, it shows whether it is on." },
        { label: "BitLocker control panel", how: "Open Control Panel, BitLocker Drive Encryption, which lists each drive and its status." },
        { label: "Command prompt", how: "Open an administrator prompt and run manage-bde -status, which reports the protection status for each volume." },
        { label: "Recovery key location", how: "Sign in to your Microsoft account's recovery keys page on another device and check that a key is listed for this PC." },
      ],
    },
    {
      kind: "steps",
      heading: "If Windows asks for a recovery key you cannot find",
      steps: [
        { title: "Check every account you use", body: "The key is saved to the Microsoft account that was signed in when encryption started, which may be a work or school account instead of a personal one." },
        { title: "Look for a saved file or printout", body: "If you saved the key to a USB drive or printed it, search there. The key ID on screen helps you match the right one." },
        { title: "Ask the administrator", body: "On a work or school device, the organisation may hold the key. Contact its IT team." },
        { title: "Accept a reset only as a last step", body: "Without the key, the data on the drive is not recoverable by normal means, and a reset erases it. Back up first whenever you can." },
      ],
    },
    {
      kind: "explanation",
      heading: "Cloning or moving the boot drive",
      paragraphs: [
        "Moving Windows to a new SSD adds its own wrinkle. If the source drive is encrypted, decrypt it or suspend protection before cloning, and turn it back on afterwards, since cloning tools handle encrypted volumes differently. Most activation links to hardware identity rather than the drive, so a drive move on the same motherboard rarely needs reactivation.",
        "If you do a clean install instead, activation happens online once Windows sees the digital licence. Choose I don't have a product key during setup only if your licence is a linked digital one; otherwise have the key ready.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More upgrade slips",
      items: [
        { mistake: "Clearing the TPM in the BIOS without suspending BitLocker.", instead: "Suspend protection first, or have the recovery key ready, since clearing the TPM removes the stored keys." },
        { mistake: "Assuming a BIOS reset is harmless for an encrypted drive.", instead: "Resetting secure boot or TPM settings can trigger the recovery prompt, so suspend protection before you change them." },
      ],
    },
  ],
};

/* Second expansion pass: competitor-gap additions, appended after the first extras. */
const more: Record<string, GuideModule[]> = {
  "hdmi-2-1-vs-displayport-for-high-refresh-monitors": [
    {
      kind: "explanation",
      heading: "Questions readers ask before buying a cable",
      paragraphs: [
        "Does an HDMI 2.1 cable make an HDMI 2.0 monitor faster? No. The slowest part of the chain sets the limit, and a monitor with an HDMI 2.0 input stays at that input's ceiling whatever cable you plug in. The same applies to a graphics card whose HDMI port is older than the cable.",
        "Is DisplayPort 2.1 something you need to chase? Only if both the card and the monitor list it for the mode you want. Many current monitors still ship with DisplayPort 1.4 and rely on compression for their top refresh rate, so the monitor's own spec sheet is the deciding document, not the newest standard on the box.",
        "Can the picture look different between the two ports at the same settings? It can, for reasons unrelated to bandwidth. Some monitors apply different default colour ranges, overdrive or sharpness presets per input, and a PC on HDMI may be sent a limited colour range by the driver. If the image looks washed out or too contrasty after switching ports, compare the output dynamic range setting in the graphics control panel with the monitor's own black level or RGB range option.",
      ],
    },
  ],
  "g-sync-vs-freesync-vs-hdmi-vrr": [
    {
      kind: "explanation",
      heading: "Troubleshooting flicker, tearing and missing options",
      paragraphs: [
        "If the G-Sync or FreeSync switch is missing from the driver, start with the connection rather than the card. Many monitors expose adaptive sync only on DisplayPort, and some need a menu option such as FreeSync or Adaptive-Sync switched on before the driver can see it. Plug into DisplayPort, enable the monitor option, restart the driver panel and look again.",
        "Brightness flicker that appears only when the frame rate swings is a different problem. Some panels, notably certain VA and OLED models, change brightness slightly as the refresh rate moves, and it is most visible in dark menus and loading screens. Capping the frame rate so it stays steady, or leaving VRR off for that one application, is the usual workaround, and reviews that look at VRR flicker will tell you whether your panel type is prone to it.",
        "Tearing at the top of the screen with VRR enabled usually means the frame rate is leaving the supported range. Check the monitor's stated minimum and maximum, then use an in-game or driver cap just below the maximum. A game running in borderless windowed mode may also bypass VRR until the windowed-game option is enabled in the driver and in Windows graphics settings.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Symptom, likely cause, first check",
      columns: ["Symptom", "Likely cause", "First thing to check"],
      rows: [
        ["No adaptive sync option in the driver", "Monitor feature off, or wrong port", "Monitor menu setting, then DisplayPort input"],
        ["Tearing near the top of the frame", "Frame rate above the VRR range", "Frame cap a few frames under the maximum"],
        ["Stutter when the frame rate dips low", "Range too narrow for compensation", "Stated minimum refresh on the spec sheet"],
        ["Dark scenes pulse in brightness", "Panel behaviour while refresh changes", "Steady frame cap, or VRR off for that title"],
        ["Works in full screen only", "Windowed VRR option disabled", "Driver setting for windowed and borderless games"],
      ],
    },
    {
      kind: "explanation",
      heading: "Do you need VRR at all?",
      paragraphs: [
        "Variable refresh matters most when your frame rate wanders below the monitor's maximum, as it does in demanding single-player games. If a game holds a steady frame rate that matches the refresh rate, VRR has little to do. Esports players who run far above the refresh rate may prefer to turn it off in that title and rely on a frame cap and low-latency settings instead.",
        "For desktop work, video playback and office use, VRR is irrelevant, so it should not decide the purchase of a monitor you will mostly use for documents. Treat it as a useful feature of a gaming monitor, not a reason to pay a premium on its own.",
      ],
    },
  ],
  "oled-monitor-burn-in-warranty-and-prevention": [
    {
      kind: "steps",
      heading: "Making a warranty claim, step by step",
      intro: "Terms differ by maker and country, so treat this as a sequence to prepare rather than a promise of cover.",
      steps: [
        { title: "Keep the paperwork from day one", body: "Save the invoice, serial number and the exact model code in a folder or email. Many claims stall because the buyer cannot show where and when the monitor was bought." },
        { title: "Read the burn-in clause before you need it", body: "Look for the wording about burn-in, image retention and normal use, and for exclusions such as commercial or signage use and damage caused by disabled care features." },
        { title: "Record the fault clearly", body: "Show a plain grey or colour field on screen and photograph the shadow in even light, with the monitor menu visible. A solid test image shows a ghost far more clearly than a busy desktop does." },
        { title: "Run the refresh cycle first", body: "Run the monitor's pixel or panel refresh routine before contacting support, since makers often ask whether you did and some treat it as a condition of cover." },
        { title: "Ask what the remedy is", body: "Find out whether the answer is repair, a replacement panel or a replacement monitor, who pays shipping, and whether the replacement is new or refurbished." },
      ],
    },
    {
      kind: "explanation",
      heading: "Text fringing and panel layout are separate from burn-in",
      paragraphs: [
        "Some OLED monitors use a subpixel arrangement that differs from the red, green, blue stripe Windows text rendering was designed around. On those panels, small text can show faint colour edges even when nothing is wrong. Look for hands-on reviews that photograph text up close and describe the subpixel layout, and use the Windows ClearType tuner to see whether it helps your eyes.",
        "This matters for the warranty decision because a reader who spends most of the day on documents may be unhappy with the panel for reasons unrelated to wear. If your main use is text on a bright, static desktop, weigh both the fringing and the burn-in exposure, and consider a high-density IPS or mini-LED display instead.",
        "Heat and enclosure also play a part. Keep the vents clear, avoid stacking items on the monitor, and do not place it where sun falls on the panel for hours, since sustained high brightness is the main wear factor makers talk about. None of these habits replaces the care features, but they cost nothing.",
      ],
    },
    {
      kind: "explanation",
      heading: "How warranty terms have varied between makers",
      paragraphs: [
        "Press coverage in 2023 and 2024 reported burn-in cover on OLED monitors from several makers, with terms commonly quoted at two or three years and with conditions attached, such as using the care features or excluding commercial use. Those terms were reported from announcements, they differ by model and region, and makers have changed them, so the policy on the maker's own page for your exact model on the day you buy is the only version that counts.",
        "One practical consequence is that a longer warranty on paper can be worth less than a shorter one with clear wording. Read what counts as normal use, whether the cover applies to the original purchaser only, and whether you must register the product within a set number of days.",
      ],
    },
  ],
  "will-my-laptop-drive-a-usb-c-portable-monitor": [
    {
      kind: "steps",
      heading: "Test the laptop port before you buy the monitor",
      intro: "A few minutes with equipment you already own can settle the question.",
      steps: [
        { title: "Look for the symbol", body: "A small D inside a P shape, a lightning bolt or a Thunderbolt logo beside the port is a good sign. A bare USB trident usually means data and charging only." },
        { title: "Search your exact model number", body: "Open the laptop's specification page, find the ports section and read the wording for each USB-C port, since two ports on the same machine can differ. Phrases such as DisplayPort over USB-C or video output are what you want." },
        { title: "Try a known display", body: "Plug a USB-C monitor, a USB-C to HDMI adapter or a dock you already own into the port. If it shows a picture, the port carries video." },
        { title: "Check how the machine charges", body: "If the laptop charges through one USB-C port only, find out which, because that port is often the one with the full feature set." },
        { title: "Read the monitor's own power note", body: "Look at the stated power draw on the monitor's page and compare it with what your laptop port can supply, remembering that the laptop battery drain rises with brightness." },
      ],
    },
    {
      kind: "explanation",
      heading: "Using the monitor for work: brightness, battery and layout",
      paragraphs: [
        "A bus-powered portable monitor takes power from the laptop, so a bright screen shortens battery life. If you work away from a socket, lower the brightness in the monitor's menu, or look for a model that accepts a power input and passes charge through to the laptop. That pass-through port is a separate feature and is not on every model, so it is worth looking for in the specification table.",
        "Arrange the displays in Settings, System, Display by dragging the numbered rectangles to match their real positions, then pick whether the portable is extended, duplicated or the main display. Set the scale for each screen on its own. A 15.6 inch 1080p screen usually sits happily at 100 to 125 percent, while a laptop panel at higher density may need more, and mixed scaling is what makes windows jump when you drag them across.",
        "Portable monitors with built-in stands and folio covers vary in how stable they are on a train table or a hotel desk. Check the angle range, whether the cover doubles as a stand and whether the stand uses a tripod thread. Cables also matter on the move, because a short, flexible full-featured cable puts less strain on the port than a stiff, long one.",
      ],
    },
    {
      kind: "explanation",
      heading: "Common reader questions",
      paragraphs: [
        "Will it work with a phone or a handheld PC? Only if that device outputs video over USB-C and can power the monitor, and in some cases a dock or adapter is needed. Check the manufacturer's page for the device model rather than assuming. Games consoles generally need an HDMI input on the monitor, so look for a mini or micro HDMI port and the matching cable.",
        "Can one laptop run two portable monitors? That depends on how many video streams the laptop's graphics and ports can output, and on whether the ports share a controller. Look for the maximum number of external displays in the laptop's specification and read how it counts the built-in screen.",
        "Does a touchscreen model need a driver? Touch usually appears as a USB input device on the same cable and works without a vendor driver on current Windows, but it depends on the monitor sending touch data over that connection. If touch fails while the picture works, try a different cable or port first.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Blank, flickering or dim: what each symptom suggests",
      columns: ["What you see", "Probable cause", "Try this"],
      rows: [
        ["No signal, power light on", "Port or cable carries no video", "Test another port or a full-featured cable"],
        ["Picture drops out now and then", "Marginal power or a loose cable", "Add a charger, shorten the cable, reseat both ends"],
        ["Screen very dim", "Laptop limiting power", "Plug the laptop into mains and raise brightness gradually"],
        ["Works on one laptop port only", "Ports differ in capability", "Use the port the spec sheet names for video"],
        ["Touch works, picture does not", "Data link up, video lane absent", "The port likely lacks DisplayPort Alt Mode; use HDMI or an adapter"],
      ],
    },
  ],
  "monitor-size-and-pixel-density-for-text": [
    {
      kind: "decision-table",
      heading: "Worked pixel density figures (rounded)",
      intro: "These come from the diagonal calculation above, so you can check them yourself.",
      columns: ["Panel", "Diagonal pixels", "Approximate PPI"],
      rows: [
        ["24 inch, 1920 x 1080", "2,203", "92"],
        ["24 inch, 2560 x 1440", "2,937", "122"],
        ["27 inch, 2560 x 1440", "2,937", "109"],
        ["32 inch, 2560 x 1440", "2,937", "92"],
        ["27 inch, 3840 x 2160", "4,406", "163"],
        ["32 inch, 3840 x 2160", "4,406", "138"],
        ["34 inch, 3440 x 1440", "3,729", "110"],
      ],
    },
    {
      kind: "explanation",
      heading: "Text sharpness is more than the PPI number",
      paragraphs: [
        "Two monitors with the same PPI can render text differently. Windows draws text using the red, green and blue subpixels of the panel, so a layout that is not a plain RGB stripe can show colour fringes on thin strokes. A matte coating softens fine detail slightly compared with a glossy one, and font smoothing settings change how heavy characters look.",
        "Before you blame the monitor, run the ClearType tuner from the Start menu search, confirm the display is at its native resolution and look at the font and scale settings in the application you read in most. Browsers and editors often have their own zoom and font options that matter more than the panel.",
        "Independent reviews that photograph text at close range, or describe the subpixel layout, give a better prediction than PPI alone. Look for that detail when you compare two monitors in the same density band.",
      ],
    },
    {
      kind: "explanation",
      heading: "Frequently asked density questions",
      paragraphs: [
        "Is a 24 inch 1080p monitor too coarse for text? At roughly 92 PPI it is serviceable at a normal desk distance, and many people read on it all day, but individual letters will show their pixels if you look closely. If you read small text or sit close, a 1440p panel of the same size raises density by about a third.",
        "Can I run a 27 inch 4K monitor at 100 percent scale? Text becomes very small at about 163 PPI, so most people choose 150 percent, which gives the workspace of a 2560 x 1440 screen with sharper text. Set the scale in Settings, System, Display and sign out and in again if an application does not pick it up.",
        "Is a larger monitor always better for work? Not if it forces you to turn your head or lean back. A 32 inch screen at an arm's length shows its edges unevenly, so consider an arm or a deeper desk, or choose a smaller, denser panel that fits your field of view.",
      ],
    },
    {
      kind: "choose-if",
      heading: "Match density to the work you do most",
      options: [
        { choice: "Reading and writing most of the day", when: ["Favour higher density, about 120 PPI or more, so letters are formed by more pixels and small sizes stay legible."] },
        { choice: "Coding with several panes", when: ["Favour workspace, such as a 34 inch ultrawide at about 110 PPI or a 4K screen scaled to 125 or 150 percent, and check your editor font size afterwards."] },
        { choice: "Splitting time between spreadsheets and games", when: ["A 27 inch 1440p panel at about 109 PPI is a balanced middle, with frame-rate demands lower than 4K."] },
        { choice: "Sitting far back or sharing a screen", when: ["Pixel density matters less, and size and brightness may be the better differences to compare."] },
      ],
    },
  ],
  "displayhdr-ratings-explained-for-pc-monitors": [
    {
      kind: "decision-table",
      heading: "Published tier requirements, from the VESA DisplayHDR site",
      intro: "Figures below are the minimum peak luminance and maximum black level the programme lists; check displayhdr.org for the full criteria, which also cover colour and test conditions.",
      columns: ["Tier", "Minimum peak luminance (cd/m2)", "Maximum black level (cd/m2)", "DCI-P3 coverage"],
      rows: [
        ["DisplayHDR 400", "400", "0.4", "90%"],
        ["DisplayHDR 600", "600", "0.1", "95%"],
        ["DisplayHDR 1000", "1,000", "0.05", "95%"],
        ["DisplayHDR 1400", "1,400", "0.02", "95%"],
        ["DisplayHDR True Black 400", "400", "0.0005", "95%"],
        ["DisplayHDR True Black 600", "600", "0.0005", "95%"],
      ],
    },
    {
      kind: "explanation",
      heading: "Reading the table without over-reading it",
      paragraphs: [
        "The tier is a floor for a set of lab tests, not a prediction of how a picture will look in your room. A DisplayHDR 400 monitor has to reach 400 cd/m2 peak but is allowed a black level of 0.4, so dark scenes lift to grey in a bright room. A DisplayHDR 600 or 1000 monitor must reach a lower black level, which is why those tiers are associated with local dimming.",
        "True Black tiers use a black level of 0.0005 cd/m2, which only a panel that can switch pixels off can meet, so they apply to OLED and similar emissive designs. Their peak brightness is lower than the top LCD tiers, but black pixels stay black, so the contrast between highlights and shadows can be high even at a modest peak. The two families therefore suit different rooms and different content.",
        "Peak figures are measured on small areas of the screen for a short time. A full white screen is usually much dimmer than the peak, especially on OLED, so a spreadsheet in HDR mode will not look like a sun-lit highlight. Look for sustained brightness figures in independent measurements and check which window size they use.",
      ],
    },
    {
      kind: "steps",
      heading: "A fair way to judge a monitor's HDR in your own room",
      steps: [
        { title: "Start with the room you really use", body: "HDR benefits show most in a dim room. In a bright room, an OLED or a high-peak LCD will look more convincing, and lower tiers may look unchanged." },
        { title: "Use Windows HDR Calibration", body: "Install the Windows HDR Calibration app from the Microsoft Store and run it. It lets you set the darkest and brightest visible levels for your monitor and saves a colour profile." },
        { title: "Compare the same scene both ways", body: "Play an HDR game or video clip, then toggle HDR off in Settings, System, Display and look again. Check highlights, dark detail and whether skin tones look natural." },
        { title: "Watch for brightness limiting", body: "Open a bright scene and see whether the whole picture dims a moment later. That is normal for many panels, but it affects how big a highlight can look." },
        { title: "Decide per use", body: "If desktop colours look dull in HDR, leave HDR off for work and turn it on for the game or film that supports it." },
      ],
    },
    {
      kind: "explanation",
      heading: "Common questions about HDR on a PC",
      paragraphs: [
        "Why does the desktop look washed out when HDR is on? Windows maps standard dynamic range content into the HDR container, and the SDR content brightness slider in the HDR settings controls how bright it appears. Raise or lower it until white documents look natural, and keep in mind that some monitors handle this better than others.",
        "Is HDR10 the same as a DisplayHDR tier? No. HDR10 is a signal format the monitor can accept, while a DisplayHDR tier is a performance certification. A monitor can accept HDR10 and still fall short of the lowest tier. All DisplayHDR tiers require HDR10 support, according to the programme's published table.",
        "Do I need a special cable? The cable must carry the mode you want, and HDR often means 10 bits per colour, which raises bandwidth. If HDR is greyed out at the top refresh rate, try a lower refresh rate or use the cable the monitor maker recommends before concluding that HDR is unsupported.",
        "Should I use HDR for competitive games? It is a personal choice. Some players switch it off to keep a consistent picture and avoid a brightness change between scenes. Test both in the game you play most.",
      ],
    },
  ],
  "ultrawide-monitor-resolutions-explained": [
    {
      kind: "decision-table",
      heading: "Common ultrawide formats, with density and bandwidth",
      intro: "Pixel density is rounded from the diagonal calculation; data rates are picture data before blanking overhead at 8 bits per colour.",
      columns: ["Format", "Typical size", "Approx. PPI", "Data at 144 Hz (8-bit)"],
      rows: [
        ["2560 x 1080", "29 inch", "96", "About 9.6 Gbps"],
        ["3440 x 1440", "34 inch", "110", "About 17.1 Gbps"],
        ["3840 x 1600", "38 inch", "110", "About 21.2 Gbps"],
        ["5120 x 1440", "49 inch", "109", "About 25.5 Gbps"],
        ["5120 x 2160", "40 inch", "139", "About 38.2 Gbps"],
      ],
    },
    {
      kind: "explanation",
      heading: "What those data rates mean for cables",
      paragraphs: [
        "Add blanking and the figures rise by a few percent. Against DisplayPort 1.4's roughly 25.9 Gbps of usable capacity, a 3440 x 1440 monitor at 144 Hz and 8 bits fits comfortably, 3840 x 1600 at 144 Hz still fits with less room to spare once timing is added, and the two larger formats need compression or a newer link at that refresh rate. HDMI 2.0's roughly 14.4 Gbps of usable data covers 3440 x 1440 at about 100 Hz at 8 bits but not 144 Hz.",
        "That is why a 49 inch 5120 x 1440 monitor with a high refresh rate normally depends on DSC or on a DisplayPort 2.1 or HDMI 2.1 connection, and why it may list lower refresh rates on a port that lacks the required version. Read the monitor's input table and your graphics card's output specification together before you decide.",
      ],
    },
    {
      kind: "explanation",
      heading: "Reader questions about ultrawide choices",
      paragraphs: [
        "Is 3440 x 1440 enough, or should I look at 3840 x 1600? The 38 inch format is taller by 160 pixels and has about 24 percent more pixels, which helps with long documents, timelines and code. The cost is a larger, usually pricier monitor and a heavier load on the graphics card.",
        "Does a 49 inch 32:9 screen replace two monitors? It matches two 1440p screens side by side without the bezel gap, but it has no extra height and needs desk depth and a stand or arm that can hold it. Some people find the edges too far to see without turning their head, so consider the seating distance.",
        "Will my games support it? Many do, but some lock the field of view, stretch interface elements or crop the picture to 16:9. Search the game name with the aspect ratio, and check the widescreen community pages for fixes before you buy if one title decides the purchase.",
        "Does video look odd? Most films are 16:9 or about 2.39:1, so you will see black bars at the sides or top and bottom depending on the clip. This is normal and is not a fault in the monitor.",
      ],
    },
    {
      kind: "steps",
      heading: "Get the most from a new ultrawide in Windows",
      steps: [
        { title: "Confirm native resolution and refresh rate", body: "In Settings, System, Display, check the resolution shown and open Advanced display to select the highest refresh rate your cable supports." },
        { title: "Choose a scale that fits your eyes", body: "Most 34 inch models are comfortable at 100 percent, and a 38 or 49 inch model may feel better at 110 to 125 percent. Try them for a day." },
        { title: "Set up window zones", body: "Turn on Snap layouts in Settings, System, Multitasking, or install PowerToys and create FancyZones layouts that split the width into columns." },
        { title: "Check the monitor's picture-by-picture mode", body: "Many super ultrawides can show two inputs side by side, which suits a laptop and a desktop. Read the manual for the input and resolution limits." },
        { title: "Test each game once", body: "Launch your main games, look at the resolution list and field-of-view setting, and decide whether to play full width or in a 16:9 window." },
      ],
    },
  ],
  "windows-display-scaling-for-4k-monitors": [
    {
      kind: "steps",
      heading: "Fix one blurry app, step by step",
      steps: [
        { title: "Turn on the global fix", body: "In Settings, System, Display, Scale, open the advanced scaling settings and switch on the option that lets Windows try to fix apps that are blurry. Sign out and in again so it applies." },
        { title: "Open the app's compatibility page", body: "Right-click the program shortcut or its executable, choose Properties, then Compatibility, then Change high DPI settings." },
        { title: "Try the override", body: "Tick the override box and choose Application, System or System (Enhanced) one at a time. Application lets the program draw itself at the true density, System stretches it, and System (Enhanced) is a middle option for some older programs." },
        { title: "Restart the app, not only the window", body: "Close it fully, including any tray icon, then open it again. Scaling is chosen when the process starts." },
        { title: "Check for an update", body: "If no setting helps, look for a newer version, since developers add high-density support over time." },
      ],
    },
    {
      kind: "explanation",
      heading: "Custom scale values and the text-size slider",
      paragraphs: [
        "Windows lists preset scales such as 100, 125, 150 and 175 percent, and it also accepts a custom value in the same settings page. A custom value is applied after you sign out and in, and it can make some older programs look uneven, so use the presets first and a custom value only if none suits your eyes.",
        "The text-size slider under Accessibility changes only the text in Windows and many built-in apps, not icons or app layouts. It is a gentler way to enlarge writing than raising the whole scale, and it can be combined with a lower scale if you prefer more workspace but need larger type.",
        "If a particular application still looks small at the right scale, check whether it has its own zoom or interface size setting, as browsers, code editors and photo software often do. Setting that once is better than raising the scale for everything.",
      ],
    },
    {
      kind: "explanation",
      heading: "Reader questions about 4K scaling",
      paragraphs: [
        "Why does text look sharper on my phone than on my 4K monitor? The phone is held closer and has higher density, so it shows less pixel structure. On a 27 inch 4K monitor at about 163 PPI text is sharp, and a 32 inch model at about 138 PPI looks a little less dense from the same distance.",
        "Should I lower the resolution instead of scaling? Running a lower resolution than native makes the monitor stretch the image, which softens text, so scaling is almost always the better route. If you need lower load for games, change the resolution inside the game rather than on the desktop.",
        "Why do my icons look different after I change the scale? Windows rebuilds the layout at the new scale, and desktop icons or window positions may shift. Arrange them again once you settle on a value, and lock the position if you use icons.",
        "Does scaling affect performance? The desktop effect is small. The load on the graphics card comes from the resolution of games and video, not from the scale value you pick for the desktop.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What looks wrong, and where to look first",
      columns: ["Symptom", "Likely cause", "Where to look"],
      rows: [
        ["Fuzzy text in one older program", "App unaware of high density", "Properties, Compatibility, high DPI settings"],
        ["Fuzzy text everywhere", "Not at native resolution", "Settings, System, Display, resolution"],
        ["Colour fringes on text", "ClearType or reduced colour format", "ClearType tuner, then cable and colour format"],
        ["Tiny interface in a creative tool", "App has its own scale", "Preferences inside that app"],
        ["Windows jump between monitors", "Different scale per display", "Display settings, each monitor on its own"],
        ["Blurry after waking from sleep", "App kept an old scale", "Close and reopen the app, then sign out if needed"],
      ],
    },
  ],
  "what-a-prebuilt-pc-listing-leaves-out": [
    {
      kind: "steps",
      heading: "Identify what is really inside, within the first hour",
      intro: "These checks use free tools and the Windows settings you already have.",
      steps: [
        { title: "Open Task Manager", body: "Press Ctrl, Shift and Escape, open the Performance tab and read the CPU, Memory, Disk and GPU entries. The Memory page shows speed, slots used and form factor, so you can see whether two modules are installed." },
        { title: "Read System Information", body: "Search for System Information and note the baseboard manufacturer and product, the BIOS version and date, and the processor name. Compare the baseboard name with the seller's specification." },
        { title: "Use a free hardware identifier", body: "Tools such as CPU-Z, GPU-Z and HWiNFO name the memory modules, the exact graphics card and the sensors. Screenshot them for your records." },
        { title: "Check the drive model", body: "Open Disk Management or the drive tool of your choice and read the model, capacity and interface. Look up the model number to see whether it is a full-speed NVMe drive or a slower one." },
        { title: "Look inside if the warranty allows it", body: "Read the warranty terms first, since opening some cases voids parts of cover. If it is allowed, photograph the power supply label, the motherboard and the cooler for the record." },
      ],
    },
    {
      kind: "explanation",
      heading: "Reading the specification page like a buyer",
      paragraphs: [
        "A good product page names the exact graphics card including the memory size and whether it is a desktop part, because some model names exist in desktop and laptop forms with different performance. It names the processor with its full model number, since a tier label such as Core i5 or Ryzen 5 covers many generations. If those basics are missing, treat the page as incomplete.",
        "Memory should be listed as capacity, generation, speed and number of modules. Two modules usually run in dual-channel mode, one module often does not, and a single large module can leave performance on the table in games that benefit from bandwidth. Storage should list capacity, interface and, ideally, the drive model.",
        "The case and cooler deserve a line too. A cooler with a name and a stated type tells you more than the words liquid cooling, and an airflow description or photographs of the front panel tell you whether the intake is open or restricted. Ask the seller for anything the page leaves out and keep their reply in writing.",
      ],
    },
    {
      kind: "explanation",
      heading: "Questions readers ask about prebuilts",
      paragraphs: [
        "Is a prebuilt always worse value than building? Not always. Pricing depends on the market, and a prebuilt includes assembly, a warranty from one company and an operating system licence. The difference appears when the seller hides cheap parts you will have to replace, so compare with a part list at current prices for the same CPU, GPU, memory and storage.",
        "Can I upgrade it later? Often, but check the case, the power supply and the motherboard first. A standard ATX or SFX power supply and a standard motherboard make upgrades simple. Proprietary connectors, unusual board sizes or an unusual power supply shape can make a graphics card or storage upgrade awkward or costly.",
        "Will opening the case void the warranty? Terms vary by maker, so read the document rather than guessing. Some allow component upgrades, some require their own parts, and some ask for factory seals to stay intact.",
        "What should I do if a part differs from the page? Photograph the evidence, compare against the order confirmation and contact the seller within the return window. Keeping the original packaging during that period makes a return easier.",
      ],
    },
    {
      kind: "decision-table",
      heading: "A quick pass of green and red flags",
      columns: ["You see", "It suggests", "What to do"],
      rows: [
        ["Full part names and model numbers", "A seller willing to be checked", "Verify them against reviews"],
        ["Only a GPU brand and a CPU tier", "Details left out on purpose or by habit", "Ask for the exact models in writing"],
        ["One memory module listed", "Single-channel memory", "Ask for two modules or plan to add one"],
        ["Power supply listed only by wattage", "Unknown brand or quality", "Ask for the make, model and connectors"],
        ["No interior or front panel photos", "Airflow unknown", "Look for a review of that chassis"],
        ["Third-party warranty with unclear terms", "Claims may be slow", "Read who handles repair and who pays shipping"],
      ],
    },
  ],
  "first-boot-checklist-after-building-a-pc": [
    {
      kind: "steps",
      heading: "Set up Windows 11 after the first successful boot",
      steps: [
        { title: "Prepare the installer on another PC", body: "Use the Microsoft Media Creation Tool to write the installer to a USB stick of at least 8 GB. Plug it into a port on the rear of the motherboard." },
        { title: "Check boot mode in the BIOS", body: "Confirm UEFI boot is enabled and that the USB stick appears in the boot menu. The boot menu key is printed in the motherboard manual or on the first splash screen." },
        { title: "Confirm TPM and Secure Boot options", body: "Windows 11 asks for TPM 2.0 and Secure Boot capability. On many boards these are called firmware TPM, PTT or fTPM, and Secure Boot may need to be enabled in the security section." },
        { title: "Install, then update", body: "Run Windows Update until it reports nothing left, then install the chipset driver and the graphics driver from the makers' own sites rather than from a disc." },
        { title: "Review fan curves and temperatures", body: "In the BIOS or the board maker's utility, set a fan curve you find quiet enough, then watch temperatures with a monitoring tool during a game or a long task." },
      ],
    },
    {
      kind: "explanation",
      heading: "Reading debug lights and beep codes",
      paragraphs: [
        "Many boards have small status lights labelled CPU, DRAM, VGA and BOOT, or a two-digit code display. A light that stays on points to the stage where the board stopped, such as memory detection or graphics initialisation. The manual lists what each light or code means for that exact board, and it is the best first reference when the screen stays black.",
        "A DRAM light usually leads you to reseat the memory, try one module and check the slot recommended in the manual for a pair. A VGA light often points to the graphics card seating, the power cable to the card or the monitor connection. A CPU light can mean a missing eight-pin processor power connector or a bent pin or a BIOS that does not support the processor.",
        "If the board supports a BIOS flashback feature, it can update the firmware from a USB stick without a working CPU. The manual gives the exact stick format and port, which is helpful when a new processor needs a newer BIOS than the one the board shipped with.",
      ],
    },
    {
      kind: "explanation",
      heading: "Questions new builders ask",
      paragraphs: [
        "How long should the first boot take? Memory training on a new build can take longer than a normal start, sometimes a minute or more with a black screen. Give it a few minutes before assuming a failure, and do not switch it off during the process.",
        "Should I enable XMP or EXPO straight away? Boot with defaults first, confirm Windows installs and is stable, then enable the memory profile in the BIOS. If the system fails to boot afterwards, clear the CMOS using the jumper or button in the manual, and try again with a lower profile or one stick.",
        "Where do I plug the monitor? Into a port on the graphics card, not the motherboard's video outputs, when you have a dedicated card. A black screen with a working PC often turns out to be this.",
        "Why does the fan speed up and down? Many CPU fans react to short bursts of load. Smoothing the curve or adding a small delay in the BIOS fan settings can reduce the effect, and the details depend on the board.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Settings to confirm before you call the build done",
      columns: ["Setting", "Where", "Why it matters"],
      rows: [
        ["Memory profile", "BIOS, memory or tweaker page", "Runs the RAM at its listed speed after a stable first start"],
        ["Resizable BAR or Above 4G Decoding", "BIOS, PCI or advanced page", "Some graphics cards list it for performance; check the card maker's page"],
        ["SATA mode", "BIOS, storage", "AHCI is normal; changing it after Windows installs can stop it booting"],
        ["Fan headers", "BIOS monitor page", "Confirms the CPU fan is detected and reading speed"],
        ["Boot order", "BIOS boot page", "Puts the Windows drive first after installation"],
      ],
    },
  ],
  "mini-pc-vs-small-form-factor-pc-build": [
    {
      kind: "explanation",
      heading: "Standard sizes that decide what fits",
      paragraphs: [
        "A Mini-ITX motherboard measures 170 by 170 millimetres and takes a full desktop processor and a PCIe x16 slot, which is why it is the usual heart of a small custom build. A small chassis then limits the rest: the maximum graphics card length and thickness, the height of the CPU cooler and the type of power supply.",
        "SFX and SFX-L power supplies are the small standards. An SFX unit is 125 millimetres wide, 63.5 high and 100 deep, and the SFX-L version is longer at 130 millimetres to fit a larger fan. Check which one the chassis supports, because an SFX-L unit will not fit a case designed only for SFX, and some cases take full-size ATX units.",
        "A mini PC uses a very different design. It normally builds the processor and memory into a laptop-class board with a small cooler, and it uses an external power adapter. You buy it as a finished product, so the question is which ports, memory and storage options it offers, not which standards it follows.",
      ],
    },
    {
      kind: "steps",
      heading: "Plan a Mini-ITX build before you buy anything",
      steps: [
        { title: "Pick the chassis first", body: "Read its volume, the maximum graphics card length and thickness, the CPU cooler height limit and the power supply type. These limits shape every other part." },
        { title: "Choose a processor and cooler that suit the airflow", body: "A small case with limited airflow favours efficient processors and low-profile or compact coolers. Check the cooler maker's compatibility list for the case." },
        { title: "Match the graphics card to the clearances", body: "Compare the card's length, slot width and power connectors with the case limits, and note that a thick card can block airflow to the cooler." },
        { title: "Confirm the power supply and cable length", body: "Check wattage, the connectors for your graphics card, and cable length, since short cases need short, flexible cables." },
        { title: "Plan the build order", body: "Fit the cooler, memory and drive to the motherboard first, then install the board, then route cables before you fit the graphics card." },
      ],
    },
    {
      kind: "explanation",
      heading: "Questions readers ask about mini PCs and SFF builds",
      paragraphs: [
        "Can a mini PC play modern games? Some have integrated graphics that suit lighter games and older titles, and a few offer a port for an external graphics enclosure. Read independent reviews of the exact model and be careful with claims that are not tied to a game, resolution and setting.",
        "Is a mini PC quieter? It often draws less power, but small fans spin fast when the system is loaded. Look for measured noise in reviews of that model, and consider where the machine will sit, since a desk shelf close to your ears changes the experience.",
        "Can I upgrade a mini PC? Many allow memory and storage changes, some solder the memory on and some use only one drive slot. Check the memory type, the number of slots and the maximum supported capacity in the manual before you plan an upgrade.",
        "Does a mini PC come with Windows? Some include a licence and some are sold bare, so check the product page and confirm the activation arrangement, and look at the warranty terms for the operating system and the hardware.",
      ],
    },
    {
      kind: "mistakes",
      heading: "More ways small builds go wrong",
      items: [
        { mistake: "Buying a tall CPU cooler for a short case.", instead: "Read the case's CPU cooler height limit and the cooler's listed height before ordering." },
        { mistake: "Ignoring the graphics card thickness.", instead: "Check slot width as well as length, because a three-slot card may not fit a two-slot case." },
        { mistake: "Assuming a mini PC's ports match your desk.", instead: "List the monitors, drives and peripherals you use and count the ports, including the video output versions." },
      ],
    },
  ],
  "windows-activation-and-bitlocker-after-a-pc-upgrade": [
    {
      kind: "steps",
      heading: "Back up and read your BitLocker status, step by step",
      steps: [
        { title: "Open the device encryption page", body: "In Windows 11 go to Settings, Privacy and security, Device encryption, or search for BitLocker in the Start menu. The page tells you whether the system drive is protected." },
        { title: "Save the recovery key somewhere else", body: "Choose to back up the key to your Microsoft account, print it or save it to a USB drive. For a Microsoft account, you can see saved keys in the account's device section online." },
        { title: "Match the key ID", body: "Each recovery screen shows a short key ID. Compare it with the ID next to the saved key so you use the right one if several drives are listed." },
        { title: "Suspend protection before firmware work", body: "In the BitLocker control panel choose Suspend protection, or use the command line with administrator rights, then make the hardware or BIOS change and resume protection afterwards." },
        { title: "Confirm protection resumed", body: "After the change, open the same page and check that the drive shows protection on, and save the new key if one was generated." },
      ],
    },
    {
      kind: "steps",
      heading: "If Windows says it is not activated after a change",
      steps: [
        { title: "Open the activation page", body: "Go to Settings, System, Activation and read the message. It tells you whether Windows is linked to a digital licence and whether it can find one." },
        { title: "Sign in with your Microsoft account", body: "If your licence is linked to an account, sign in with it and run the troubleshooter that appears on the activation page." },
        { title: "Choose the hardware change option", body: "In the troubleshooter select the option that says you changed hardware on this device recently, and pick the device from the list of those linked to your account." },
        { title: "Check the edition", body: "A licence for Windows Home does not activate a Pro install, so make sure the installed edition matches the one you own." },
        { title: "Contact support if it fails", body: "Keep your proof of purchase and product key, and use Microsoft's support tools to explain the change." },
      ],
    },
    {
      kind: "explanation",
      heading: "Questions readers ask about activation and encryption",
      paragraphs: [
        "Will a graphics card or memory upgrade affect activation? Normally not, since activation is tied to the core hardware profile and most Windows licences tolerate such changes. A motherboard replacement is the usual trigger, which is why the guidance around it is stricter.",
        "Is the recovery screen a sign my data is gone? No. It is a protective response when Windows sees a change it cannot explain. With the right key your data is available, and without it the data is not recoverable by normal means, so the key is worth saving in two places.",
        "Do I need BitLocker at all? That depends on your risk. Encryption protects data if a laptop is lost or a drive is removed, and the cost is the need to manage a recovery key. On a desktop that stays at home, some people prefer not to use it, and that is a valid choice if they keep backups.",
        "What if I use a local account? Recovery keys for devices without a Microsoft account must be stored by you, so print or save the key to a safe place and keep it away from the encrypted drive.",
        "Does a BIOS update trigger recovery? It can, because firmware changes alter what the TPM measures. Suspend protection before updating firmware if the maker's notes advise it, and resume afterwards.",
      ],
    },
  ],
};

for (const [slug, mods] of Object.entries(more)) {
  wave1Extras[slug] = [...(wave1Extras[slug] ?? []), ...mods];
}

const tail: Record<string, GuideModule[]> = {
  "ultrawide-monitor-resolutions-explained": [
    {
      kind: "mistakes",
      heading: "Two more ultrawide checks",
      items: [
        { mistake: "Comparing ultrawides by the first number only.", instead: "A 34 inch 3440 x 1440 and a 49 inch 5120 x 1440 share the same height, so text size and vertical room are alike and only the width differs." },
        { mistake: "Forgetting that a curve changes the way you sit.", instead: "Curved panels suit one person sitting centrally, while flat panels suit straight-line work and shared viewing, so choose by how you actually sit." },
      ],
    },
  ],
  "windows-display-scaling-for-4k-monitors": [
    {
      kind: "explanation",
      heading: "A short routine after changing monitors",
      paragraphs: [
        "Start by letting Windows pick the recommended scale and resolution, and live with it for a day before changing anything. Many complaints disappear once the eyes adjust, and a value you chose in the first minute is often a poor guess.",
        "Then deal with exceptions one at a time: fix a blurry program through its compatibility page, enlarge only the text if reading is the problem, and use an application's own zoom for specific tools. Resist changing the global scale to solve a single program, because that moves every other window with it.",
        "If you share the PC, note that the scale is stored per user and per display, so another account may start at different values. Check each account after a monitor swap, and sign out and in again whenever Windows asks.",
      ],
    },
  ],
  "mini-pc-vs-small-form-factor-pc-build": [
    {
      kind: "decision-table",
      heading: "Which limits to read on each route",
      columns: ["Route", "Limit to read first", "Where to find it"],
      rows: [
        ["Mini PC", "Memory type, slot count and drive slots", "Maker's specification and manual"],
        ["Mini PC", "Video outputs and their versions", "Port table on the product page"],
        ["Mini-ITX build", "Graphics card length and slot width", "Chassis specification"],
        ["Mini-ITX build", "CPU cooler height", "Chassis and cooler pages"],
        ["Mini-ITX build", "Power supply standard (SFX or SFX-L)", "Chassis specification"],
      ],
    },
    {
      kind: "explanation",
      heading: "Heat is the shared problem",
      paragraphs: [
        "Both routes put hot parts close together, and the difference lies in how the heat leaves. A mini PC relies on a small fan and a metal case that acts as the heatsink, so sustained loads tend to bring fan noise and may lower clock speeds. A Mini-ITX case can fit larger fans but may have little room between the graphics card and the side panel.",
        "Whichever you choose, give the machine room to breathe: leave space behind and beside it, keep dust filters clean, and avoid enclosing it in a cabinet. If you will run long renders or games, look for measured temperature and noise in independent reviews of the exact model or build rather than the maker's own claims.",
      ],
    },
  ],
};
for (const [slug, mods] of Object.entries(tail)) {
  wave1Extras[slug] = [...(wave1Extras[slug] ?? []), ...mods];
}
