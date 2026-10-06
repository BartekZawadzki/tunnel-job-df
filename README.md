# Tunnel Job DF — develop the game with an AI agent

A [Claude Code](https://claude.com/claude-code) plugin for developing [Tunnel Job](https://github.com/BartekZawadzki)
and its packs on your own Claude subscription, the Dark Factory way: a brief with numbers, the build, proof by
seeded bot playtests with a decoy that must fail, and evidence published with the pack.

## Set up

1. In the game: **Settings → AI tools → Allow AI tools**. The game shows a command with your token; run it once in a
   terminal. It connects Claude Code to the running game (127.0.0.1 only):

   ```
   claude mcp add --transport http tunnel-job http://127.0.0.1:47820/mcp --header "Authorization: Bearer <token>"
   ```

2. In Claude Code:

   ```
   /plugin marketplace add BartekZawadzki/tunnel-job-df
   /plugin install tunnel-job-df@tunnel-job
   ```

## Use

| Command | Does |
|---|---|
| `/tj-new-pack <idea>` | a new pack: brief, build in your Mods folder, check, reload |
| `/tj-playtest <pack>` | seeded bot playtests, a decoy, an independent verifier, `evidence.json` |
| `/tj-publish <pack>` | a pull request to the [workshop](https://github.com/BartekZawadzki/tunnel-job-workshop) (asks you first) |
| `/tj-fork <change>` | a change to the engine itself: fork, branch, tests first, pull request |

Skills: `tj-pack-author`, `tj-mode-designer`, `tj-map-builder`, `tj-playtest`, `tj-core-contributor`.
Agent: `tj-verifier` (blind: gets the brief only). A hook stops `gh pr create` from a workshop clone while the
workshop check fails or an AI pack has no evidence.

## What the agent can do in the game

Read the library and every number, check and reload packs, start and stop matches, run bots-only playtests in the
background, take screenshots, read the log, read and write blocks in the live world (with the map editor open, it
builds with you) and move the camera. The game shows "AI bridge on" while it is connected, and the switch in Settings
turns it off.

## Licence

MIT.
