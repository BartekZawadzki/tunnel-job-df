---
name: tj-map-builder
description: Build or change a Tunnel Job map with the player — read and write blocks in the live world through the MCP bridge, place zones, save it as a pack map. Use for "build a…", "a map with…", "zbuduj", "mapa", "budynek".
---

# Tunnel Job map builder

The world is a grid of 0.5 m cells (`x`, `z` across, `y` up; ground level is usually `y = 13`, bedrock `y = 0`).

## Working with the player

1. The player opens **Creator → Maps → New map** (from First National, the Battlefield or an empty field) or **Edit**
   on one of theirs: the map editor is now live.
2. Look before you build: `world_get` small boxes (≤ 8192 cells) around where you will work; `camera` to show the
   player what you are about to change.
3. Build with `world_set` in batches (≤ 2048 cells a call): floors first, then walls, then details. Use block ids from
   `library_list kind=Block` (pack blocks as `<pack>:<id>`). Say what you built after each batch.
4. Zones are drawn by the player in the editor (Z: zone tool) or written into the map file; a heist map needs `fence`,
   `crew_spawn`, `security_spawn`, `vault`, `payload_spawn`, `extraction`.
5. The player saves (Esc → Save). Then prove it with `bots_playtest` using a mode on that map.

## Good maps

- Every route into the vault should be possible by digging, blasting or a door — and cost something.
- Give the defenders a way in (a `security_door` zone opens for them only) and windows to hold.
- Keep the extraction 30–60 m from the vault; measure it in cells (×0.5 m).
- Check the bots: a playtest where nobody reaches the vault in 300 s means a route the bots cannot find.
