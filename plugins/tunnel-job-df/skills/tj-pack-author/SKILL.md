---
name: tj-pack-author
description: Make or change a Tunnel Job content pack — blocks, guns, game modes, character looks, maps, scripts. Use when the player asks for new content ("add a block", "make a sniper rifle", "a mode where…", "nowa broń", "nowy blok", "tryb gry") or to fix a pack the game refuses.
---

# Tunnel Job pack author

A pack is a folder `<Mods>/<pack-id>/` with `pack.json` and the files it names. The game is the authority: it mounts a
pack only when every rule passes, and it says why when one does not. You talk to the running game through the
`tunnel-job` MCP tools (the player connects them once from Settings → AI tools).

## The loop (Dark Factory, small)

1. **Frame** — one paragraph: what the pack adds, for whom, and what must be true in a match (numbers, not adjectives).
   Write it into the pack's `README.md`.
2. **Read the game** — `game_status` (the Mods folder path, mounted packs), `library_list` / `library_get` for the
   official numbers you are building against. Never guess a number the library can tell you.
3. **Build** — write `pack.json` (and `textures/*.png` 16 × 16, `maps/*.tjmap`, `scripts/*.lua`) with your own file tools
   into the Mods folder. Keep ids lowercase `a-z0-9_-`, 2–40 characters; the pack id is the folder name; `official`
   is reserved.
4. **Check** — `pack_validate` with the pack.json text, then `pack_reload`; read `problems` and fix until there are none.
5. **Prove** — hand over to `tj-playtest` (scenarios with seeds, run by bots, a decoy that must fail).
6. **Publish** — `/tj-publish`.

## The format (format 1)

```jsonc
{ "format": 1, "id": "my-pack", "name": "My pack", "version": "1.0.0", "author": "you",
  "description": "...", "category": "community",          // "ai" when an agent made it: evidence.json is then required
  "requires": [],
  "blocks":     [{ "id", "name", "description", "maxHp" (0..10000], "resistBullet|resistExplosive|resistDig|resistCut" [0..3] (not all 0),
                   "bulletPenetrable", "transparent", "occlusionDb" [0..30], "color": [r,g,b],
                   "pattern": "plain|soil|sandbag|planks|brick|concrete|rivets|glass", "texture": "textures/<id>.png" }],
  "weapons":    [{ "id", "name", "side": "both|crew|security", "model": "rifle|smg|shotgun|marksman|lmg",
                   "damage" (0..200], "rpm" 30..1500, "magazine" 1..500, "reloadSeconds" 0.3..10, "effectiveRange" 1..150,
                   "pellets" 1..20, "softCellMultiplier" 0..5 }],
  "modes":      [{ "id", "name", "kind": "heist|deathmatch", "map": "first-national|battlefield|<your map id>",
                   "prepSeconds" 0..300, "actionSeconds" 30..1800, "overtimeSeconds" 0..600, "waveInterval" 0..60,
                   "securityRespawnDelay" 0..60, "pickupReach" 0.5..4, "roundsToWin" 1..9, "teamSize" 1..10,
                   "scripts": ["scripts/<file>.lua"] }],
  "characters": [{ "id", "name", "side": "crew|security", "model": 0, "scale" 0.85..1.15, "colors": { "<material>": [r,g,b] } }],
  "maps":       [{ "id", "name", "base": "first-national|battlefield|field", "file": "maps/<id>.tjmap", "blocks": { "<slot>": "<pack:block>" } }] }
```

Content of other packs is named `<pack>:<id>`; official blocks by their names (`brick`, `steel`…).

## Rules that bite

- Everything must stay breakable (VR-03): a block with all four multipliers at 0 is refused.
- A heist map needs the zones `fence`, `crew_spawn`, `security_spawn`, `vault`, `payload_spawn`, `extraction`.
- Scripts run only in the mode that lists them; see `tj-mode-designer` for the API and its limits.
- Licence: CC BY 4.0 by default in the workshop; say so in the README.
- Budget: state the token budget before you start (a pack is usually a few % of a Pro week) and stop at it.
