---
name: build-feature
description: Use when someone asks to build a feature, implement a section, start on hero-triptych, neural-path, cursor-trail, mode-shift, reel-wall, or sv1-chatbot, or says "build the [feature name]".
argument-hint: "hero-triptych | neural-path | cursor-trail | mode-shift | reel-wall | sv1-chatbot"
---

## What This Skill Does

Builds one of the six core features of the Shon Varghese portfolio by reading its workflow file and the corresponding spec section in CLAUDE.md, then implementing the component(s) step by step.

Feature names and their workflow files:

| Argument        | Workflow File                | Components Built                                                   |
| --------------- | ---------------------------- | ------------------------------------------------------------------ |
| `hero-triptych` | `workflows/hero-triptych.md` | `HeroTriptych.jsx`                                                 |
| `neural-path`   | `workflows/neural-path.md`   | `NeuralPath.jsx`                                                   |
| `cursor-trail`  | `workflows/cursor-trail.md`  | `CursorTrail.jsx`                                                  |
| `mode-shift`    | `workflows/mode-shift.md`    | `ModeController.jsx`, `lib/modeConfig.js`, `styles/globals.css`    |
| `reel-wall`     | `workflows/reel-wall.md`     | `ReelWall.jsx`, `VideoSection.jsx`                                 |
| `sv1-chatbot`   | `workflows/sv1-chatbot.md`   | `SV1Chatbot.jsx`, `app/api/sv1/route.js`, `lib/sv1SystemPrompt.js` |

## Steps

1. **Read the workflow file** at `workflows/$ARGUMENTS.md`.
   - If the file does not exist yet, tell the user: "The workflow file `workflows/$ARGUMENTS.md` hasn't been created yet. I'll build from the CLAUDE.md spec directly."
   - Proceed using the feature spec in CLAUDE.md regardless.

2. **Read the relevant CLAUDE.md spec section** for `$ARGUMENTS` (e.g., "Feature 1 — Hero Triptych" for `hero-triptych`). Use this as the authoritative spec.

3. **Check what already exists** — glob the relevant component file(s) in `src/`. If a component file already exists, read it before making changes.

4. **Follow the workflow steps in order.** For each step in the workflow:
   - Implement the code
   - Verify the "done when" criterion before moving to the next step
   - If a step depends on a file that doesn't exist yet (e.g., a video file the user must supply), note it and skip that step with a clear message

5. **For `sv1-chatbot` specifically:**
   - Build `app/api/sv1/route.js` first (server-side only)
   - Verify `ANTHROPIC_API_KEY` is read from environment, never hardcoded
   - Build `lib/sv1SystemPrompt.js` with Shon's full profile from CLAUDE.md
   - Build `SV1Chatbot.jsx` last

6. **For `mode-shift` specifically:**
   - Start with `lib/modeConfig.js` — copy the exact config object from CLAUDE.md
   - Then `styles/globals.css` — add CSS custom properties and transition rule
   - Then `ModeController.jsx` — IntersectionObserver with threshold: 0.5

7. After all steps are complete, output a **completion summary**:
   - Files created or modified (with paths)
   - Any steps skipped and why (e.g., missing user-supplied assets)
   - What to verify manually in the browser
   - The next recommended build step (reference the Build Order in CLAUDE.md)

## Key Constraints (Always Enforce)

- CSS mode transitions must use `cubic-bezier(0.4, 0, 0.2, 1)` — never `linear` or `ease-in-out`
- `data-mode` attribute is the single source of truth for mode — never hardcode mode in component logic
- `ANTHROPIC_API_KEY` must never appear in client-side code
- Cursor trail pool must reuse 20 existing DOM elements — never append new nodes on `mousemove`
- Neural Path coordinates must recalculate on `window.resize`
- SV-1 must include full conversation history in every API call

## Notes

- If `$ARGUMENTS` is not one of the six valid feature names, list the valid options and ask the user to re-invoke with the correct name.
- Always check CLAUDE.md Key Constraints section before submitting any code.
- Do not build multiple features in one invocation — one skill call = one feature.
