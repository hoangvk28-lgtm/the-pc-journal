import type { PlanItem } from "./batch17-plan";
import { build, type Game } from "./batch29-plan";

export const GPU_GAMES: Game[] = [
  ["balatro", "Balatro"], ["against-the-storm", "Against the Storm"], ["assassins-creed-brotherhood", "Assassin's Creed Brotherhood"],
  ["batman-arkham-asylum", "Batman: Arkham Asylum"], ["batman-arkham-city", "Batman: Arkham City"], ["battlefield-3", "Battlefield 3"], ["bayonetta", "Bayonetta"],
  ["beat-saber", "Beat Saber"], ["bioshock", "BioShock"], ["bioshock-2", "BioShock 2"], ["bioshock-infinite", "BioShock Infinite"], ["blue-prince", "Blue Prince"],
  ["borderlands-2", "Borderlands 2"], ["brothers-a-tale-of-two-sons", "Brothers: A Tale of Two Sons"], ["cabernet", "Cabernet"], ["call-of-duty-4-modern-warfare", "Call of Duty 4"],
  ["celeste", "Celeste"], ["chained-echoes", "Chained Echoes"], ["cocoon", "Cocoon"], ["company-of-heroes", "Company of Heroes"], ["crusader-kings-iii", "Crusader Kings III"],
  ["crypt-of-the-necrodancer", "Crypt of the NecroDancer"], ["cuphead", "Cuphead"], ["dark-souls-ii", "Dark Souls II"], ["dark-souls-iii", "Dark Souls III"],
  ["dave-the-diver", "Dave the Diver"], ["dead-cells", "Dead Cells"], ["deus-ex-human-revolution", "Deus Ex: Human Revolution"], ["disco-elysium", "Disco Elysium"],
  ["dishonored", "Dishonored"], ["dispatch", "Dispatch"], ["divinity-original-sin-2", "Divinity: Original Sin 2"], ["divinity-original-sin", "Divinity: Original Sin"],
  ["dota-2", "Dota 2"], ["dwarf-fortress", "Dwarf Fortress"], ["europa-universalis-iv", "Europa Universalis IV"], ["factorio", "Factorio"],
  ["fallout", "Fallout"], ["far-cry", "Far Cry"], ["grand-theft-auto-iv", "Grand Theft Auto IV"], ["grand-theft-auto-v", "Grand Theft Auto V"], ["guild-wars-2", "Guild Wars 2"],
  ["hades-ii", "Hades II"], ["half-life", "Half-Life"], ["halls-of-torment", "Halls of Torment"], ["hollow-knight", "Hollow Knight"], ["hollow-knight-silksong", "Hollow Knight: Silksong"],
  ["i-was-a-teenage-exocolonist", "I Was a Teenage Exocolonist"], ["inertial-drift", "Inertial Drift"], ["inside", "Inside"], ["into-the-breach", "Into the Breach"],
  ["it-takes-two", "It Takes Two"], ["kynseed", "Kynseed"], ["limbo", "Limbo"], ["lost-and-found-co", "Lost and Found Co"], ["mafia", "Mafia"], ["mass-effect", "Mass Effect"],
  ["mass-effect-3", "Mass Effect 3"], ["max-payne-3", "Max Payne 3"], ["metal-gear-solid-v-the-phantom-pain", "Metal Gear Solid V"], ["mewgenics", "Mewgenics"],
  ["minecraft", "Minecraft"], ["monkey-island-2", "Monkey Island 2"], ["mullet-madjack", "Mullet MadJack"], ["n-plus-plus", "N++"], ["night-in-the-woods", "Night in the Woods"],
  ["okami-hd", "Okami HD"], ["ori-and-the-blind-forest", "Ori and the Blind Forest"], ["ori-and-the-will-of-the-wisps", "Ori and the Will of the Wisps"], ["owlboy", "Owlboy"],
  ["pillars-of-eternity", "Pillars of Eternity"], ["pillars-of-eternity-ii-deadfire", "Pillars of Eternity II"], ["prince-of-persia-the-sands-of-time", "Prince of Persia 2003"],
  ["rayman-legends", "Rayman Legends"], ["return-of-the-obra-dinn", "Return of the Obra Dinn"], ["rimworld", "RimWorld"], ["sacrifice", "Sacrifice"], ["scarlet-hollow", "Scarlet Hollow"],
  ["shin-megami-tensei-v-vengeance", "SMT V: Vengeance"], ["civilization-iii", "Civilization III"], ["civilization-iv", "Civilization IV"], ["sid-meiers-pirates", "Sid Meier's Pirates!"],
  ["slay-the-princess", "Slay the Princess"], ["slay-the-spire", "Slay the Spire"], ["star-wars-jedi-knight-dark-forces-ii", "Jedi Knight: Dark Forces II"],
  ["star-wars-jedi-knight-ii-jedi-outcast", "Jedi Outcast"], ["stardew-valley", "Stardew Valley"], ["street-fighter-v", "Street Fighter V"], ["super-meat-boy", "Super Meat Boy"],
  ["thank-goodness-youre-here", "Thank Goodness You're Here"], ["the-elder-scrolls-iii-morrowind", "Morrowind"], ["the-elder-scrolls-iv-oblivion", "Oblivion"],
  ["the-seance-of-blake-manor", "The Seance of Blake Manor"], ["the-sims-2-legacy-collection", "The Sims 2 Legacy Collection"], ["the-sims-legacy-collection", "The Sims Legacy Collection"],
  ["the-stanley-parable", "The Stanley Parable"], ["the-witcher-2", "The Witcher 2"], ["there-is-no-game-wrong-dimension", "There Is No Game"], ["thief-gold", "Thief Gold"],
  ["splinter-cell-chaos-theory", "Splinter Cell Chaos Theory"], ["torchlight-ii", "Torchlight II"], ["total-war-empire", "Total War: Empire"], ["total-war-shogun-2", "Total War: Shogun 2"],
  ["trails-in-the-sky", "Trails in the Sky"], ["xcom-2", "XCOM 2"], ["xcom-enemy-unknown", "XCOM: Enemy Unknown"], ["hitman-2-silent-assassin", "Hitman 2: Silent Assassin"],
];

export const PLAN: PlanItem[] = build("gpu", GPU_GAMES);
