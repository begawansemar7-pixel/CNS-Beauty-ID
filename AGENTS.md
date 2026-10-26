<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Legion Working Method (planning / context / repair)

Large UI work follows the Legion stage method — full guide in `CLAUDE.md`
§18 "Working Method":

- Stage discipline: size the task first; foundation (`globals.css` tokens +
  layout) alone, then MAX 1 large page + 1 supporting file per stage; a page
  and its entry point land in the same stage or earlier; app builds green
  after every stage.
- Context checklist before writing: read every file the stage will import or
  modify (current content, never from memory); every `className` token must
  exist in `globals.css` `@theme`.
- Repair rounds: diagnose per-file, fix the root signature, MAX 3 rounds —
  then stop and report (symptom / diagnosis / action / verified).
