---
description: Start a change to Tunnel Job's engine as a fork and a branch, for a pull request with evidence
argument-hint: <what to change>
---
Start a core change for: $ARGUMENTS

Use the `tj-core-contributor` skill. Fork and clone the game repository with `gh repo fork <owner>/tunnel-job --clone`
(ask the player for the repository if it is not public yet), create a branch named after the change, write the design
delta and failing tests first, and keep the change as small as the tests allow. Open the pull request only when the
whole EditMode suite passes and the `tj-verifier` agent has given its verdict.
