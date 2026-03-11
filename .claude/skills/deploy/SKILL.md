---
name: deploy
description: Use when someone asks to deploy the site, push to Vercel, go live, or ship the portfolio.
disable-model-invocation: true
---

## What This Skill Does

Runs a production build to catch errors, then deploys the portfolio to Vercel. Stops at any failure and reports what needs to be fixed before proceeding.

## Pre-flight Checklist

Before running any commands, verify:

1. Read `.env.local` — confirm `ANTHROPIC_API_KEY` is set to a real key (not `your_key_here`)
2. Run `/check-constraints` mentally — remind the user to run it if not recently done
3. Confirm the user has the Vercel CLI installed: `vercel --version`
   - If not installed: `npm install -g vercel`

---

## Steps

### Step 1 — Run production build

```bash
npm run build
```

Wait for output. Parse the result:

- **PASS:** Build completes with no errors (`✓ Compiled successfully` or similar)
- **FAIL:** Build errors present → Stop, display the full error output, and tell the user what to fix

Do NOT proceed to deployment if the build fails.

---

### Step 2 — Remind user about Vercel environment variable

Before deploying, instruct the user:

> "Make sure `ANTHROPIC_API_KEY` is added to your Vercel project's Environment Variables at [vercel.com/dashboard → your project → Settings → Environment Variables]. The `.env.local` file is not committed and will not be available in production."

Ask: "Have you added the API key to Vercel? (yes/no)" — wait for confirmation before proceeding.

---

### Step 3 — Deploy to Vercel

```bash
vercel --prod
```

Wait for the deployment to complete. Parse the output for:

- **PASS:** A live URL like `https://shon-portfolio-xxx.vercel.app`
- **FAIL:** Deployment error → Display the full error and stop

---

### Step 4 — Verify the live deployment

After a successful deployment:

1. Report the live URL to the user
2. Remind them to test:
   - [ ] All three modes switch correctly (scroll through sections)
   - [ ] SV-1 chatbot responds (requires API key in Vercel env vars)
   - [ ] Mobile layout works (resize browser or test on phone)
   - [ ] Neural Path draws on scroll
   - [ ] Reel Wall videos play on hover

---

### Step 5 — Report deployment result

```
## Deployment Result

✅ Build: Successful
✅ Deployed: https://shon-portfolio-xxx.vercel.app

### Next Steps
- Test the live URL on mobile
- Verify SV-1 chatbot works (needs ANTHROPIC_API_KEY in Vercel env vars)
- Share the URL!
```

## Notes

- Never force push or bypass build errors with `--force` flags.
- If the build fails due to a TypeScript or ESLint error, fix the root cause — do not add `// @ts-ignore` or disable lint rules to bypass.
- If Vercel CLI isn't linked to a project yet, run `vercel link` first, then re-invoke this skill.
