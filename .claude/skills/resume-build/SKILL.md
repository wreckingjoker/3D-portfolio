---
name: resume-build
description: Use when someone asks where we left off, what to build next, what's done so far, or wants to resume the build from the current state.
---

## What This Skill Does

Inspects the project filesystem to determine which of the 24 build steps are complete, then tells you exactly what to build next.

## Steps

1. **Check which component files exist** by globbing these paths:
   - `src/styles/globals.css`
   - `src/lib/modeConfig.js`
   - `src/lib/sv1SystemPrompt.js`
   - `src/lib/cursorShapes.js`
   - `src/components/ModeController.jsx`
   - `src/components/HeroTriptych.jsx`
   - `src/components/NeuralPath.jsx`
   - `src/components/CursorTrail.jsx`
   - `src/components/ReelWall.jsx`
   - `src/components/SV1Chatbot.jsx`
   - `src/components/AutomationSection.jsx`
   - `src/components/VideoSection.jsx`
   - `src/components/ThreeDSection.jsx`
   - `src/components/AboutSection.jsx`
   - `src/components/ContactSection.jsx`
   - `src/app/api/sv1/route.js`
   - `src/app/page.jsx`
   - `src/app/layout.jsx`
   - `package.json` (check for `three`, `gsap`, `howler`, `@anthropic-ai/sdk` in dependencies)

2. **Map findings to the Build Order** from CLAUDE.md:

   | Step | Criterion | File/Check |
   |------|-----------|-----------|
   | 1 | Next.js scaffolded | `package.json` exists with Next.js + all deps |
   | 2 | CSS vars + ModeController shell | `globals.css` + `ModeController.jsx` + `modeConfig.js` |
   | 3–7 | HeroTriptych (static → animated) | `HeroTriptych.jsx` |
   | 8–10 | NeuralPath | `NeuralPath.jsx` |
   | 11–14 | CursorTrail | `CursorTrail.jsx` + `cursorShapes.js` |
   | 15 | Content sections | All 5 section components present |
   | 16–17 | ReelWall | `ReelWall.jsx` + `VideoSection.jsx` |
   | 18–19 | SV-1 Chatbot | `SV1Chatbot.jsx` + `route.js` + `sv1SystemPrompt.js` |
   | 20 | ModeController wired to sections | `page.jsx` imports ModeController |
   | 21–22 | Sound + mode dots | Check `page.jsx` or `ModeController.jsx` for Howler import |
   | 23 | Polish | Subjective — ask user |
   | 24 | Deployed | Ask user if they have a live Vercel URL |

3. **Output a status table** in this format:

   ```
   ## Build Status

   ✅ Step 1  — Next.js scaffolded
   ✅ Step 2  — CSS vars + ModeController shell
   ⬜ Step 3  — HeroTriptych (static panels)   ← NEXT
   ⬜ Step 4  — Code Rain canvas
   ...
   ```

4. **Highlight the next step** clearly with `← NEXT` and provide the exact command or skill to run:
   - If next step involves a feature: `Run /build-feature [name]`
   - If next step is scaffolding: `Run /scaffold`
   - If next step is deployment: `Run /deploy`
   - If next step is SV-1 testing: `Run /sv1-test`

5. If all 23 build steps are done but not deployed, prompt: "All features built! Run `/deploy` to ship to Vercel."

## Notes

- This skill is read-only — it never writes files.
- If `package.json` doesn't exist at all, the project hasn't been scaffolded yet. Tell the user to run `/scaffold` first.
- Steps 3–7 are all inside `HeroTriptych.jsx`. Treat the file as a proxy for all of them.
- Steps 11–14 are all inside `CursorTrail.jsx`. Treat the file as a proxy for all of them.
