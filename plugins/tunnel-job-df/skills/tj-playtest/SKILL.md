---
name: tj-playtest
description: Prove a Tunnel Job pack with seeded bot playtests and write its evidence.json — scenarios, seeds, results, a decoy that must fail, the model and the token cost. Use before publishing anything, and when asked "does it work", "przetestuj", "sprawdź".
---

# Tunnel Job playtest (the evidence)

A pack is not done when it loads; it is done when its brief's scenarios pass in matches the game ran, and a check
was seen failing a known-bad version. Your own "it works" is not evidence.

## Steps

1. From the brief, write 1–3 **scenarios** as `given → when → then` with a number:
   "a 5 v 5 Vampire heist: within 240 s at least one kill heals its killer (a script message counts it)".
2. Run each with `bots_playtest` (`mode`, `map`, `seconds`, `seed`): at least seeds 1, 2 and 3. Only from the main menu.
3. Judge from the tool's answer (`winner`, `kills`, `vaultEntrySeconds`, `payload`, `scriptMessages`,
   `scriptProblems`) — never from what you expected. Any `scriptProblems` is a fail.
4. **Decoy**: break the pack on purpose (set the healing to 0, remove the vault zone, raise a number past its range),
   run the same check, and see it fail. Restore the pack. A check never seen failing proves nothing.
5. Write `evidence.json` next to `pack.json`:

```json
{
  "brief": "one paragraph",
  "scenarios": [
    { "name": "kills heal", "given": "5 v 5 Vampire heist", "when": "240 s of bots", "then": "a heal message appears",
      "seed": 1, "pass": true, "result": "3 heal messages; kills crew 4, security 6" }
  ],
  "decoy": { "change": "heal 0", "failed": true, "result": "0 heal messages" },
  "model": "the model you are", "tokens": 0, "game": "the version from game_status"
}
```

`tokens` is an honest estimate of what this pack cost. The workshop's check refuses an `ai` pack without evidence,
and the game shows "verified: n/n scenarios" with the model and the cost next to it.
