---
description: Make a new Tunnel Job pack from an idea, the Dark Factory way (brief, build, check, prove)
argument-hint: <the idea, e.g. "a mode where kills heal">
---
Make a new Tunnel Job pack for: $ARGUMENTS

Use the `tj-pack-author` skill (and `tj-mode-designer` or `tj-map-builder` when the idea needs them). Start by stating
a token budget for this pack and stop at it. Call `game_status` first; if the `tunnel-job` tools are missing, tell the
player to turn on Settings → AI tools in the game and run the command shown there. Write the brief into the pack's
README.md, build into the Mods folder, `pack_validate` and `pack_reload` until clean, then run `/tj-playtest`.
