// Blocks opening a pull request from a workshop clone unless the workshop check passes and every AI pack carries
// evidence.json. Reads the PreToolUse event on stdin; exit 2 blocks the command and shows the reason to the agent.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

let input = "";
process.stdin.on("data", d => (input += d));
process.stdin.on("end", () => {
  let ev;
  try { ev = JSON.parse(input); } catch { process.exit(0); }
  const cmd = ev?.tool_input?.command ?? "";
  if (!/\bgh\s+pr\s+create\b/.test(cmd)) process.exit(0);
  const dir = ev.cwd || process.cwd();
  const tool = path.join(dir, "tools", "catalog.mjs");
  if (!fs.existsSync(tool) || !fs.existsSync(path.join(dir, "packs"))) process.exit(0);   // not a workshop clone
  const problems = [];
  for (const id of fs.readdirSync(path.join(dir, "packs"))) {
    const pj = path.join(dir, "packs", id, "pack.json");
    if (!fs.existsSync(pj)) continue;
    const text = fs.readFileSync(pj, "utf8").split("\n").filter(l => !/^\s*\/\//.test(l)).join("\n");
    try {
      const p = JSON.parse(text);
      if (p.category === "ai" && !fs.existsSync(path.join(dir, "packs", id, "evidence.json")))
        problems.push(`packs/${id}: an AI pack needs evidence.json (run /tj-playtest)`);
    } catch (e) { problems.push(`packs/${id}/pack.json: ${e.message}`); }
  }
  try { execFileSync("node", [tool, "--check"], { cwd: dir, stdio: "pipe" }); }
  catch (e) { problems.push("the workshop check fails:\n" + String(e.stdout || e.message)); }
  if (problems.length) { console.error("Not publishing:\n" + problems.join("\n")); process.exit(2); }
  process.exit(0);
});
