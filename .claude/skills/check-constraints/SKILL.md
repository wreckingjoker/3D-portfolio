---
name: check-constraints
description: Use when someone asks to audit the code, check for constraint violations, verify the build is correct, or run a code review against the project rules.
---

## What This Skill Does

Audits all source files against the 11 Key Constraints defined in CLAUDE.md §Key Constraints. Reports pass/fail for each constraint. Run this before deploying or after building each major feature.

## Steps

1. **Collect all source files** to audit:
   - `src/app/page.jsx`
   - `src/app/layout.jsx`
   - `src/app/api/sv1/route.js`
   - `src/components/*.jsx` (all component files)
   - `src/lib/*.js` (all lib files)
   - `src/styles/globals.css`

   Read each file that exists. Skip files that don't exist yet — note them as "not yet built".

2. **Check each constraint** in order:

   ### Constraint 1 — No API key client-side
   - Search all files in `src/app/` (excluding `src/app/api/`) and `src/components/` and `src/lib/` for:
     - The string `ANTHROPIC_API_KEY`
     - Any import of `@anthropic-ai/sdk` or `Anthropic`
   - **PASS:** Only `src/app/api/sv1/route.js` uses the SDK/key
   - **FAIL:** Any other file references it

   ### Constraint 2 — No localStorage / sessionStorage
   - Search all files for `localStorage` or `sessionStorage`
   - **PASS:** Zero occurrences
   - **FAIL:** Any occurrence

   ### Constraint 3 — CSS transitions use correct cubic-bezier
   - Search `globals.css` and all component files for `transition` CSS properties
   - Check that all transitions use `cubic-bezier(0.4, 0, 0.2, 1)`
   - **PASS:** No transitions use `linear`, `ease-in-out`, `ease`, or other curves
   - **FAIL:** Any transition uses a different easing

   ### Constraint 4 — Sound defaults to OFF
   - Search `ModeController.jsx` and any Howler.js usage
   - Confirm there is a toggle mechanism and that autoplay is NOT the default
   - **PASS:** Sound is off by default with a visible toggle
   - **FAIL:** Howler plays sound without user interaction

   ### Constraint 5 — Cursor trail reuses pool of 20 elements
   - Read `CursorTrail.jsx`
   - Confirm a pool is initialized once (array of 20 elements) and reused by index cycling
   - **PASS:** No `document.createElement` or `appendChild` inside the `mousemove` handler
   - **FAIL:** DOM nodes are created dynamically on `mousemove`

   ### Constraint 6 — data-mode is the source of truth
   - Search all component files for mode-related conditional logic
   - **PASS:** Mode is determined by reading `data-mode` from the DOM / IntersectionObserver — never hardcoded strings like `if (mode === 'automation')`
   - **FAIL:** Mode is hardcoded in component logic instead of read from `data-mode`

   ### Constraint 7 — Neural Path recalculates on resize
   - Read `NeuralPath.jsx`
   - Confirm there is a `window.addEventListener('resize', ...)` or `ResizeObserver` that recalculates path coordinates
   - **PASS:** Resize handler present
   - **FAIL:** No resize handler, coordinates are static

   ### Constraint 8 — SV-1 sends full conversation history
   - Read `SV1Chatbot.jsx` and `app/api/sv1/route.js`
   - Confirm the API call sends the full `messages` array (not just the latest message)
   - **PASS:** `messages` array accumulates all turns
   - **FAIL:** Only the latest message is sent

   ### Constraint 9 — Reel Wall videos don't all start at currentTime = 0
   - Read `ReelWall.jsx`
   - Confirm `currentTime` is staggered on mount (e.g., `Math.random() * duration` or `i * 3`)
   - **PASS:** Stagger logic present in `useEffect`
   - **FAIL:** No stagger, all videos start at 0

   ### Constraint 10 — Contact email present
   - Read `ContactSection.jsx` and `lib/sv1SystemPrompt.js`
   - Confirm `shonvarghesevenad@gmail.com` appears in both
   - **PASS:** Email present in both files
   - **FAIL:** Missing from either file

   ### Constraint 11 — Mobile layout exists
   - Search all component files for responsive CSS (Tailwind responsive prefixes like `md:`, `sm:`, `lg:`, or CSS media queries)
   - **PASS:** Each major component has at least one responsive rule
   - **FAIL:** A component has no responsive rules at all

3. **Output the audit report** in this format:

   ```
   ## Constraint Audit Report

   ✅ Constraint 1  — No API key client-side
   ✅ Constraint 2  — No localStorage/sessionStorage
   ⚠️  Constraint 3  — CSS transitions: found 'ease-in-out' in CursorTrail.jsx:42
   ✅ Constraint 4  — Sound defaults to OFF
   ⬜ Constraint 5  — Cursor trail pool (CursorTrail.jsx not built yet)
   ...

   ### Violations to Fix
   - CursorTrail.jsx:42 — Change 'ease-in-out' to 'cubic-bezier(0.4, 0, 0.2, 1)'
   ```

4. For each violation, provide the exact file path, line number (if visible), and the fix needed.

## Notes

- If a file doesn't exist yet, mark the constraint as ⬜ (not applicable) rather than ❌ (violation).
- This skill is read-only — it reports violations but does not fix them. Fix them manually or ask Claude to fix each one.
- Run this skill again after fixing violations to confirm they're resolved.
