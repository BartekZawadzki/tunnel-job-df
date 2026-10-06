---
name: tj-mode-designer
description: Design a Tunnel Job game mode and its Lua script — rules, timings, team sizes, maps, and new behaviour through the sandboxed script API. Use for "a mode where…", "custom rules", "script", "tryb", "zasady".
---

# Tunnel Job mode designer

A mode is a base (`heist` or `deathmatch`) on a map, with its own numbers, plus up to 8 Lua scripts that run **only
while that mode is played**. Write the rules as a short brief with numbers first; every number must come out of the
brief, and the brief's scenarios are what `tj-playtest` proves.

## Script API (the sandbox)

MoonSharp's hard sandbox: no files, OS, `require` or `load`. Each call may run 50 000 instructions; a script that
overruns or errors is switched off (the match goes on) and the reason shows on screen and in `log_tail`.
`math.random` and `game.random()` follow the match seed, so bots playtests are repeatable.

| Hook you define | Called |
|---|---|
| `onRoundStart()` | when the round begins |
| `onTick(seconds)` | twice a second, with the round time |
| `onKill(victim, killer)` | when a player dies; `killer` is -1 for falls |
| `onBlockBroken(x, y, z, blockId)` | when a cell breaks |

| `game.` | Does |
|---|---|
| `time()` | the round time in seconds |
| `message(text)` | shows a line at the top of the screen (`print` too) |
| `actors()` | list of `{id, team, alive, bot, hp, x, y, z}` (cells; one cell is 0.5 m) |
| `heal(id, hp)` | up to 200 at a time, never above full health |
| `getBlock(x, y, z)` / `setBlock(x, y, z, id)` | read / write a cell (`"air"` clears; up to 64 writes a tick) |
| `addKills(team, n)` | deathmatch score, ±10 at a time |
| `random()` | 0..1 from the match seed |

## Patterns

- Keep state in script locals; reset it in `onRoundStart`.
- Do work in `onTick`, not in loops; spread big changes over ticks (64 writes a tick).
- Make every rule observable: `game.message` when it fires, so a playtest can count it (`scriptMessages`).
- Example: the workshop's `vampire-heist` (kills heal the killer, streaks are announced).
