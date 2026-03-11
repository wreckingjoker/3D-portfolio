---
name: sv1-test
description: Use when someone asks to test SV-1, verify the chatbot works, check the Claude API integration, or test the AI assistant.
disable-model-invocation: true
---

## What This Skill Does

Verifies the SV-1 chatbot integration end-to-end: checks the API key is configured, audits the API route and system prompt, and sends a live test request to confirm Claude responds correctly.

Run this skill after Build Order Steps 18–19 are complete.

## Steps

### Step 1 — Verify environment variable

Check that `.env.local` exists at the project root and contains `ANTHROPIC_API_KEY`.

- Read `.env.local`
- **PASS:** File exists and contains a line starting with `ANTHROPIC_API_KEY=` with a non-placeholder value (not `your_key_here`)
- **FAIL:** File missing, or key is missing, or key is still the placeholder

If FAIL: Stop here and tell the user: "Set your real `ANTHROPIC_API_KEY` in `.env.local` before proceeding."

---

### Step 2 — Audit the API route

Read `src/app/api/sv1/route.js` and verify:

- [ ] Imports `Anthropic` from `@anthropic-ai/sdk`
- [ ] Imports `sv1SystemPrompt` from `@/lib/sv1SystemPrompt`
- [ ] The route is `export async function POST(req)`
- [ ] It calls `client.messages.create(...)` with:
  - `model: "claude-opus-4-5"` (or newer)
  - `max_tokens: 300` (or similar — not 0)
  - `system: sv1SystemPrompt`
  - `messages` from the request body (full array, not just latest)
- [ ] Returns `Response.json({ reply: response.content[0].text })`
- [ ] Does NOT reference `process.env.ANTHROPIC_API_KEY` directly — the SDK reads it automatically

Report any missing items.

---

### Step 3 — Audit the system prompt

Read `src/lib/sv1SystemPrompt.js` and verify it contains:

- [ ] Shon's name and location (Dubai, UAE)
- [ ] All three skill areas (Automation, AI Video, 3D Web)
- [ ] At least 3 specific project examples under Automation
- [ ] Contact email: `shonvarghesevenad@gmail.com`
- [ ] Phone: `+971 505513554`
- [ ] Behavior rules (2–3 sentence limit, first-person, redirect pricing questions)
- [ ] The rule: "Never fabricate projects or clients"

Report any missing items.

---

### Step 4 — Send a live test request

Instruct the user to make sure `npm run dev` is running, then run this curl command:

```bash
curl -X POST http://localhost:3000/api/sv1 \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What automation projects have you built?"}]}'
```

**Expected response shape:**
```json
{"reply": "...some text about n8n projects..."}
```

**PASS:** Response contains JSON with a `reply` field containing text about Shon's work.
**FAIL:**
- HTTP 500 → API key issue or code error (report the full error)
- HTTP 404 → API route not found (confirm `app/api/sv1/route.js` exists)
- Response missing `reply` field → Check route return statement

---

### Step 5 — Report results

Output a summary:

```
## SV-1 Test Results

✅ Step 1 — ANTHROPIC_API_KEY configured
✅ Step 2 — API route structure correct
⚠️  Step 3 — System prompt missing: phone number
✅ Step 4 — Live test passed, Claude responded

### Issues to Fix
- Add phone number to sv1SystemPrompt.js
```

## Notes

- Never log or display the actual API key value — only confirm it exists and is non-empty.
- If the dev server isn't running, remind the user to start it with `npm run dev` before Step 4.
- The curl test in Step 4 must be run by the user (or via Bash tool if dev server is confirmed running).
