---
name: scaffold
description: Use when someone asks to scaffold the project, initialize the Next.js app, bootstrap the portfolio, or set up the project for the first time.
disable-model-invocation: true
---

## What This Skill Does

Bootstraps the Shon Varghese 3D portfolio project from scratch — creates the Next.js 14 app with Tailwind, installs all required dependencies, and verifies the dev server runs.

Run this skill **once**, at the very start of the project (Build Order Step 1).

## Steps

1. Confirm the current working directory is the intended parent folder for the project (ask the user if unsure).

2. Run the Next.js scaffold command:
   ```bash
   npx create-next-app@latest shon-portfolio --tailwind --app --src-dir --no-eslint
   ```
   Wait for it to complete. If it prompts for options, choose defaults.

3. Move into the project directory:
   ```bash
   cd shon-portfolio
   ```

4. Install all required dependencies in one command:
   ```bash
   npm install three @react-three/fiber @react-three/drei gsap howler @anthropic-ai/sdk
   ```

5. Create the `.env.local` file with a placeholder for the API key:
   ```
   ANTHROPIC_API_KEY=your_key_here
   ```
   Remind the user: **Replace `your_key_here` with your real Anthropic API key before building SV-1.**

6. Create the required public directories:
   ```bash
   mkdir -p public/videos public/sounds public/fonts
   ```

7. Create the `workflows/` directory at the project root:
   ```bash
   mkdir -p workflows
   ```

8. Start the dev server to verify setup:
   ```bash
   npm run dev
   ```

9. Report back:
   - Confirm dev server is running at `localhost:3000`
   - List all installed packages and their versions
   - Confirm the directory structure matches the project file structure in CLAUDE.md

## Done When

`npm run dev` runs without errors and the browser shows the default Next.js blank/starter page.

## Notes

- Never run this skill a second time on an existing project — it would overwrite work.
- If `create-next-app` fails due to network issues, retry once. If it fails again, report the error to the user.
- After this step, the next step is: Build global CSS vars + ModeController shell (Build Order Step 2). Tell the user to run `/build-feature mode-shift` to continue.
