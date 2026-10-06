---
description: Prove a Tunnel Job pack with seeded bot playtests, a decoy, and an independent verifier; write evidence.json
argument-hint: <pack id>
---
Prove the pack `$ARGUMENTS` with the `tj-playtest` skill: scenarios from its README brief, `bots_playtest` on seeds
1-3 from the main menu, a decoy that must fail. Then dispatch the `tj-verifier` agent with the brief only (not your
notes) and compare its verdict with yours. Write `evidence.json` with both. Report the raw numbers, not a summary.
