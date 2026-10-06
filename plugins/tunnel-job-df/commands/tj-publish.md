---
description: Publish a Tunnel Job pack to the workshop as a pull request (fork, branch, check, PR)
argument-hint: <pack id>
---
Publish the pack `$ARGUMENTS` from the Mods folder (`game_status` gives the path) to the workshop
https://github.com/BartekZawadzki/tunnel-job-workshop:

1. Ask the player to confirm: the pack id, the category (`ai` when you made it), and that it goes out under CC BY 4.0.
   Publishing is the player's decision; do not open the pull request without a yes.
2. `gh repo fork BartekZawadzki/tunnel-job-workshop --clone` (once), then a branch `pack/$ARGUMENTS`.
3. Copy the pack folder into `packs/$ARGUMENTS/`. An `ai` pack must carry `evidence.json` (`tj-playtest`).
4. `node tools/catalog.mjs --check` must print `CATALOG ok`; fix the pack until it does.
5. Commit with the player's GitHub noreply address, push, `gh pr create` with the brief, the scenarios and their
   results. Packs with data only merge when the check passes; scripts and AI packs wait for the maintainer.
