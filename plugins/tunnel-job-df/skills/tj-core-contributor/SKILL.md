---
name: tj-core-contributor
description: Change Tunnel Job's engine itself (C#, Unity 6) through a fork, a branch and a pull request with Dark Factory evidence. Use when something cannot be done in a pack — a new mechanic, a new script hook, a bug in the game — "zmiana silnika", "nowa mechanika", "bug".
---

# Tunnel Job core contributor

Packs are data and sandboxed scripts; anything else is a change to the game, made as a pull request that the
maintainer reviews. Merged changes ship in the next official build.

## Before you write code

- Could a pack do it (a mode, a script hook, a block)? Prefer that; a missing hook is a small core change.
- Read the repository's `docs/dark-factory/01-game-design.md` (the validation rules VR-xx and scenarios GS-xx are the
  authority) and the module you will touch. Keep the core (`Assets/_Game/Core`) free of engine references.

## The Dark Factory path

1. **Design delta** — add your VR/GS rows to `01-game-design.md` with numbers; list the existing scenarios that must
   stay green.
2. **Tests first** — EditMode tests in `Assets/_Game/Tests/EditMode` for the new rules; see them fail.
3. **Build** — the smallest change that makes them pass; match the surrounding style and comment density.
4. **Verify** — Unity batch mode: `Unity -batchmode -nographics -projectPath TunnelJob -runTests -testPlatform EditMode
   -testResults results.xml`; every test passes, not only yours. A blind check (the `tj-verifier` agent) on the
   behaviour.
5. **Pull request** — `/tj-fork` makes the fork and branch; the PR description carries what changed, the test totals
   before and after, and the verifier's result. Nothing private in the repository: English only, no local paths, the
   GitHub noreply address for commits.
