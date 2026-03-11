# CLAUDE.md — Shon Varghese Personal Portfolio

## Project Overview

You are operating inside the **WAT Framework (Workflows, Agents, Tools)** for the personal portfolio of **Shon Varghese** — AI Automation Developer, 3D Scroll Animation Website Creator, and AI Video Creator based in Dubai, UAE.

Your mission is to build a cinematic, interactive personal portfolio website that communicates Shon's three distinct professional identities through immersive scroll effects, three-mode identity shifting, a custom AI cursor trail, a Neural Path scroll system, a Reel Wall video mosaic, and an AI-powered chatbot named **SV-1**.

---

## The WAT Architecture

### Layer 1 — Workflows (`workflows/`)

Markdown SOPs stored in `workflows/`. Each workflow defines the objective, required inputs, which tools to use and in what order, expected outputs, and edge case handling. Read the relevant workflow before building any section. Never overwrite workflow files unless explicitly instructed.

### Layer 2 — Agent (You)

You are the decision-maker and orchestrator. Read the workflow → sequence the tools → recover from errors → improve the system. Build section by section. Never skip the workflow read step. Never make assumptions about design or behavior — refer to the spec below.

### Layer 3 — Tools (`tools/`)

Next.js API routes, utility JS modules, and component files in `src/`. API keys and credentials are stored exclusively in `.env.local`. Never hardcode secrets anywhere else.

---

## Tech Stack

| Layer              | Choice                                        |
| ------------------ | --------------------------------------------- |
| Framework          | Next.js 14 (App Router)                       |
| Styling            | Tailwind CSS                                  |
| 3D Engine          | Three.js + React Three Fiber                  |
| Scroll Animations  | GSAP ScrollTrigger                            |
| Cursor / Particles | Vanilla JS Canvas                             |
| Sound              | Howler.js                                     |
| AI Chatbot         | Claude API via Next.js API route (`/api/sv1`) |
| Hosting            | Vercel                                        |

---

## Project File Structure

```
shon-portfolio/
├── public/
│   ├── videos/                  # Reel Wall video files
│   ├── sounds/
│   │   ├── automation-hum.mp3
│   │   ├── video-pulse.mp3
│   │   └── 3d-drone.mp3
│   └── fonts/                   # Custom font files if self-hosted
├── src/
│   ├── app/
│   │   ├── page.jsx             # Main single-page entry
│   │   ├── layout.jsx           # Root layout, font imports, metadata
│   │   └── api/
│   │       └── sv1/
│   │           └── route.js     # Claude API proxy — SV-1 chatbot
│   ├── components/
│   │   ├── HeroTriptych.jsx     # Three-panel hero section
│   │   ├── NeuralPath.jsx       # SVG scroll-draw path + node activations
│   │   ├── CursorTrail.jsx      # Custom cursor + particle trail
│   │   ├── ModeController.jsx   # Intersection Observer, CSS var swapper
│   │   ├── ReelWall.jsx         # Video mosaic grid
│   │   ├── SV1Chatbot.jsx       # Floating chatbot button + panel
│   │   ├── AutomationSection.jsx
│   │   ├── VideoSection.jsx
│   │   ├── ThreeDSection.jsx
│   │   ├── AboutSection.jsx
│   │   └── ContactSection.jsx
│   ├── lib/
│   │   ├── modeConfig.js        # Color, font, cursor, sound config per mode
│   │   ├── sv1SystemPrompt.js   # Full system prompt for SV-1 AI
│   │   └── cursorShapes.js      # SVG strings for gear, triangle, hexagon
│   └── styles/
│       └── globals.css          # CSS custom properties + base styles
├── workflows/
│   ├── hero-triptych.md
│   ├── neural-path.md
│   ├── cursor-trail.md
│   ├── mode-shift.md
│   ├── reel-wall.md
│   └── sv1-chatbot.md
├── .env.local                   # ANTHROPIC_API_KEY — never commit
├── CLAUDE.md                    # This file
├── package.json
└── next.config.js
```

---

## The Three Modes — Identity System

The entire site is governed by three modes. Each section declares a `data-mode` attribute. A global `ModeController` component watches which section occupies >50% of the viewport via `IntersectionObserver` and updates CSS custom properties site-wide.

### Mode Config (`lib/modeConfig.js`)

```javascript
export const modes = {
  automation: {
    bg: "#050A14",
    accent: "#00F5FF",
    accentRgb: "0, 245, 255",
    fontStyle: "monospace",
    cursor: "gear",
    sound: "/sounds/automation-hum.mp3",
    label: "Automation",
  },
  video: {
    bg: "#080008",
    accent: "#FF2D55",
    accentRgb: "255, 45, 85",
    fontStyle: "serif",
    cursor: "triangle",
    sound: "/sounds/video-pulse.mp3",
    label: "Video",
  },
  "3d": {
    bg: "#0A0A0F",
    accent: "#8B5CF6",
    accentRgb: "139, 92, 246",
    fontStyle: "geometric",
    cursor: "hexagon",
    sound: "/sounds/3d-drone.mp3",
    label: "3D",
  },
};
```

### CSS Transition Rule (globals.css)

```css
:root {
  --bg: #050a14;
  --accent: #00f5ff;
  --accent-rgb: 0, 245, 255;
}

* {
  transition:
    background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Mode Indicator

Three dots, fixed bottom-left. One glows at full opacity in `--accent` color per active mode. Others sit at `opacity: 0.2`.

---

## Feature Specs

---

### Feature 1 — Hero Triptych (`HeroTriptych.jsx`)

Three full-height panels side-by-side. Shon's name spans all three as a single SVG `<text>` element with `overflow: visible`.

**Left Panel — Code Rain (data-mode="automation")**

- `<canvas>` element, full panel height
- Characters drawn: binary (`01`), n8n node labels (`HTTP Request`, `Code`, `Schedule`), API paths (`/openai/generate`, `/webhook/contacts`)
- Color: `#00F5FF` at varying opacity levels
- Fall speed: randomized per column, 1–3px per frame

**Middle Panel — Video Reel (data-mode="video")**

- `<video>` tag: `autoPlay muted loop playsInline`
- Source: `/public/videos/hero-reel.mp4` (Shon supplies this file)
- Overlay: CSS film grain texture via SVG `<feTurbulence>` filter
- Fallback: CSS scanline animation if no video file present

**Right Panel — 3D Object (data-mode="3d")**

- React Three Fiber `<Canvas>`
- Geometry: `IcosahedronGeometry` radius=1.5, detail=0
- Material: `MeshBasicMaterial` wireframe, color `#8B5CF6`
- Auto-rotates: `rotation.y += 0.005` per frame in `useFrame`

**Name Assembly Animation**

- Each letter: `opacity: 0`, `transform: translateY(-40px)` initially
- Stagger: `animation-delay: ${index * 0.08}s`
- Left panel letters: cyan, middle: red, right: violet
- At `t=2s` after last letter: all normalize to white via CSS class swap

**Mobile behavior:** Stack panels vertically. Code/3D panels collapse to `80px` accent strips. Video panel takes `60vh`.

---

### Feature 2 — Neural Path (`NeuralPath.jsx`)

A continuous SVG `<path>` absolutely positioned behind all page content, spanning full document height.

**The Path**

- Curved organic snake using cubic bezier commands: `M`, `C`
- Defined as percentage-based coordinates recalculated on `resize`
- Two layers: main path (`opacity: 1`, `strokeWidth: 2`) + ghost path (`opacity: 0.15`, `strokeWidth: 4`, `blur: 4px`)
- Gradient stroke: cyan → red → violet top to bottom via `<linearGradient>`

**Scroll Draw Formula**

```javascript
const totalLength = pathRef.current.getTotalLength();
pathRef.current.style.strokeDasharray = totalLength;

const onScroll = () => {
  const progress =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
  pathRef.current.style.strokeDashoffset = totalLength - totalLength * progress;
};
window.addEventListener("scroll", onScroll, { passive: true });
```

**Node Activation**

- 5 `<circle>` elements placed at section midpoints on the path
- Default state: `opacity: 0.4`, `r: 4`
- On activation: pulse animation — `r` expands to `12` and back, `opacity` flashes to `1`
- Trigger: `IntersectionObserver` on each section, fires when 50% visible
- Ripple: second circle expands from same center with `opacity` fading 1→0

---

### Feature 3 — AI Cursor Trail (`CursorTrail.jsx`)

**Custom Cursor**

- `cursor: none` on `<body>`
- One `<div id="cursor">` absolutely positioned, follows `mousemove` with `requestAnimationFrame`
- Shape changes based on `data-mode` of nearest ancestor section:
  - `automation`: SVG gear, `animation: spin 1s linear infinite`
  - `video`: SVG play triangle, scales `1.4x` on hover over clickable elements
  - `3d`: SVG hexagon, `animation: rotateY 2s linear infinite` via CSS perspective
  - `default/nav`: dot `8px` + orbiting ring `20px`

**Particle Trail**

- Pool of 20 `<div>` particles, reused via index cycling
- Each particle: `width/height: 8px`, `border-radius: 50%`, `background: var(--accent)`
- Staggered follow: particle `i` mirrors cursor position from `16 * i` ms ago
- Fade: `opacity` and `scale` reduce to `0` over `600ms` via CSS transition
- Color: inherits `var(--accent)` — transitions naturally with mode shifts

**Click Burst**

- On `mousedown`: emit 12 particles from click point
- Each travels in direction `(360 / 12 * i)` degrees, distance `40–80px` randomized
- Fade out over `500ms`

---

### Feature 4 — Reel Wall (`ReelWall.jsx`)

Located inside `VideoSection`. Section has `data-mode="video"`.

**Grid Layout**

- CSS Grid: `grid-template-columns: repeat(5, 1fr)` — 4 rows × 5 columns = 20 cells
- Gap: `2px`
- Each cell: `aspect-ratio: 9/16` (portrait video format)

**Video Setup**

```javascript
useEffect(() => {
  videoRefs.forEach((ref, i) => {
    if (ref.current) {
      ref.current.currentTime = Math.random() * ref.current.duration || i * 3;
    }
  });
}, []);
```

**Hover Expansion**

```css
.reel-cell:hover {
  grid-column: span 2;
  grid-row: span 2;
  z-index: 10;
}
.reel-cell {
  transition: all 0.4s ease;
}
```

- On hover: `video.muted = false`, volume fades `0 → 0.7` over `300ms`
- On leave: `video.muted = true`, volume fades out

**Cell Styling**

- Random micro-rotation: `transform: rotate(${(Math.random() - 0.5)}deg)`
- Dark overlay `rgba(0,0,0,0.3)` that lifts on hover
- Accent border `1px solid var(--accent)` appears on hover with glow `box-shadow`

**Placeholder Strategy**

- If fewer than 20 videos: remaining cells show a dark thumbnail with client name in monospace and a pulsing `● LIVE` badge in red

**Counter**
Above the grid: `"100+ clients. 3 industries. 1 creative engine."` — each segment ticks up from `0` using a number counter animation triggered by `IntersectionObserver`.

---

### Feature 5 — SV-1 Chatbot (`SV1Chatbot.jsx` + `api/sv1/route.js`)

**Floating Trigger Button**

- Fixed, bottom-right: `right: 24px, bottom: 24px`
- Animated brain/circuit SVG icon, `opacity` pulses `0.7 → 1` every `2s`
- Background: `var(--accent)` with `0.15` opacity fill, accent border
- Label: `"SV-1"` in monospace below icon

**Chat Panel**

- Slides up from bottom-right on click: `transform: translateY(0)` from `translateY(100%)`
- Dimensions: `380px wide × 520px tall`
- Header: `"SV-1 // SHON.AI"` with a blinking cursor `_`
- Accent color for AI bubbles matches current mode's `--accent`

**Starter Prompt Chips** (shown when no messages yet)

- `"What can you automate for my business?"`
- `"Show me examples of your AI videos"`
- `"How do you build 3D websites?"`
- `"Are you available for freelance?"`

**API Route (`app/api/sv1/route.js`)**

```javascript
import Anthropic from "@anthropic-ai/sdk";
import { sv1SystemPrompt } from "@/lib/sv1SystemPrompt";

export async function POST(req) {
  const { messages } = await req.json();
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 300,
    system: sv1SystemPrompt,
    messages,
  });
  return Response.json({ reply: response.content[0].text });
}
```

**System Prompt (`lib/sv1SystemPrompt.js`)**

```javascript
export const sv1SystemPrompt = `
You are SV-1, the portfolio AI for Shon Varghese.

About Shon:
- AI Automation Developer and AI Creative Strategist based in Dubai, UAE
- B.Tech in Computer Science and Artificial Intelligence, Muthoot Institute of Technology and Science (2021–2025)
- Currently AI Marketing Strategist at Just Search, UAE (Nov 2025–Present)
- Internship: AI Marketing Strategist at Al Asala Furniture, UAE (Oct–Nov 2025)

Automation Skills:
- Builds end-to-end automation systems using n8n
- Built AI-powered WordPress Blog Automation with OpenAI APIs (research, content, image, auto-publish)
- Built Multi-Agent SEO Optimizer with Google SERP scraping, competitor extraction, AI summarization
- Built AI Gmail Manager: email classification, labeling, AI-generated responses, finance routing
- Built Google Maps Lead Generation system with Apify scraping + Google Sheets integration
- Tools: n8n, OpenAI API, REST APIs, Apify, Google Sheets

AI Video Skills:
- Produced AI-generated cinematic advertisements and reels for 100+ clients across multiple industries
- Manages full production: concept, script, AI avatar, voice synthesis, visual generation, post-production
- Tools: HeyGen, Higgsfield, Grok, Meta AI, InVideo, Google Veo, Google Flow, Leonardo AI, OpenArt AI, Suno AI, CapCut

3D Web Skills:
- Builds 3D scroll animation websites
- Tools: Three.js, React Three Fiber, GSAP ScrollTrigger, Claude Code, Lovable, Bolt

Languages: English, Malayalam, Hindi, Tamil
Certifications: BEC Cambridge Assessment English, Automation Challenge (Udemy)
Contact: shonvarghesevenad@gmail.com | +971 505513554
LinkedIn: www.linkedin.com/in/shonv
Visa: Dependent visa UAE, valid until July 2027

Behavior rules:
- Answer in 2–3 sentences maximum. Be specific, confident, never vague.
- Speak in first person as Shon's representative.
- If asked about pricing or availability, say: "I'd love to discuss that directly — reach out at shonvarghesevenad@gmail.com"
- If asked something outside Shon's expertise, say so briefly and redirect to what you do know.
- Never fabricate projects or clients.
`;
```

**Typing Indicator**
Three dots in `var(--accent)`, staggered `animation-delay: 0s, 0.2s, 0.4s` pulse animation while waiting for API response.

---

## Page Section Map

| Order | Section              | data-mode     | Key Component                       |
| ----- | -------------------- | ------------- | ----------------------------------- |
| 1     | Hero                 | — (all three) | `HeroTriptych.jsx`                  |
| 2     | About                | `automation`  | `AboutSection.jsx`                  |
| 3     | Automation           | `automation`  | `AutomationSection.jsx`             |
| 4     | AI Video / Reel Wall | `video`       | `VideoSection.jsx` + `ReelWall.jsx` |
| 5     | 3D Web               | `3d`          | `ThreeDSection.jsx`                 |
| 6     | Contact              | `3d`          | `ContactSection.jsx`                |

Neural Path and CursorTrail render above all sections as persistent global overlays.

---

## Workflows

Read the relevant workflow file before building each section.

### Workflow: Hero Triptych Build (`workflows/hero-triptych.md`)

1. Scaffold three equal `<div>` panels in a flex row
2. Build Code Rain canvas — define character set from Shon's actual vocab, verify frame loop runs at 60fps
3. Add video element — confirm `autoPlay muted loop playsInline` attributes are set, add grain overlay
4. Add R3F Canvas with icosahedron wireframe — confirm auto-rotation works, no console errors
5. Create SVG name element spanning all three panels — define letter positions manually per panel
6. Implement staggered letter animation — verify all letters visible after 2s, normalize to white
7. Test mobile collapse — code/3D become accent strips, video takes 60vh

### Workflow: Neural Path Build (`workflows/neural-path.md`)

1. Calculate full document height after all sections are rendered
2. Define SVG path coordinates as viewport-percentage values
3. Set `strokeDasharray` and `strokeDashoffset` to full path length on mount
4. Attach passive scroll listener — verify path draws smoothly without jank
5. Place 5 node circles at section midpoints — verify positions align with sections visually
6. Wire `IntersectionObserver` to each section — test activation fires at 50% threshold
7. Verify gradient transitions cyan → red → violet across the full path length

### Workflow: Cursor Trail Build (`workflows/cursor-trail.md`)

1. Set `cursor: none` on body — confirm no default cursor visible anywhere
2. Build cursor `<div>`, confirm it follows mouse without lag via `requestAnimationFrame`
3. Build shape switcher — test all four cursor shapes render correctly per mode
4. Build particle pool of 20 — verify reuse cycle doesn't cause visual glitching
5. Implement staggered follow delay — each particle 16ms behind the previous
6. Confirm particle color inherits `var(--accent)` and shifts with mode transitions
7. Implement click burst — verify 12 particles scatter radially on every click

### Workflow: Mode Shift Build (`workflows/mode-shift.md`)

1. Assign `data-mode` attributes to all sections
2. Create `IntersectionObserver` with `threshold: 0.5`
3. On intersection: read `data-mode`, look up config in `modeConfig.js`
4. Update `document.documentElement` CSS variables: `--bg`, `--accent`, `--accent-rgb`
5. Update cursor shape state via React context or global event
6. Trigger sound swap via Howler.js — fade out current sound, fade in new (volume: 0.15, never jarring)
7. Verify mode indicator dots update correctly
8. Test that CSS transitions create a silky morph, not a hard switch

### Workflow: Reel Wall Build (`workflows/reel-wall.md`)

1. Source or create placeholder thumbnails for all 20 cells
2. Build CSS Grid — verify aspect ratios consistent across all cells
3. Add all `<video>` elements with `autoPlay muted loop playsInline`
4. Stagger `currentTime` on mount — visually verify no synchronized playback
5. Implement hover expansion — verify grid reflows correctly without layout break
6. Wire volume fade on hover enter/leave — confirm no abrupt audio jumps
7. Add micro-rotation per cell — verify barely perceptible, not distracting
8. Add counter above grid — verify number animation triggers on scroll into view

### Workflow: SV-1 Chatbot Build (`workflows/sv1-chatbot.md`)

1. Build floating button — verify pulse animation, correct positioning
2. Build chat panel slide-up — verify smooth transform transition
3. Render starter prompt chips — verify they send message on click
4. Build `api/sv1/route.js` — test with a single message, verify Claude responds
5. Confirm `ANTHROPIC_API_KEY` is read from `.env.local`, never exposed client-side
6. Wire full conversation history in each API call — verify multi-turn context works
7. Implement typing indicator — verify appears during fetch, disappears on response
8. Test accent color follows mode shifts inside the panel
9. Confirm chat panel is fully usable on mobile (full-width, bottom sheet)

### Workflow: Error Recovery

1. Read the full error carefully before acting
2. Fix and retest before proceeding
3. If the fix affects live API calls or user-visible behavior — stop and confirm with Shon first
4. Document the fix in the relevant workflow file
5. Continue with a more robust approach

---

## Build Order

| Step | Task                                                               | Done when...                                      |
| ---- | ------------------------------------------------------------------ | ------------------------------------------------- |
| 1    | Scaffold Next.js + Tailwind + R3F + GSAP                           | `npm run dev` shows blank dark page               |
| 2    | Build global CSS vars + ModeController shell                       | CSS vars defined, Observer wired, no errors       |
| 3    | Build HeroTriptych — three panels, static                          | Three panels visible, correct colors              |
| 4    | Add Code Rain canvas to left panel                                 | Characters fall, Shon's vocab visible             |
| 5    | Add video + grain to middle panel                                  | Video plays, grain overlay visible                |
| 6    | Add R3F icosahedron to right panel                                 | Wireframe rotates, no console errors              |
| 7    | Add SVG name + stagger animation                                   | Name assembles across panels, normalizes to white |
| 8    | Build NeuralPath — static SVG                                      | Path visible behind sections                      |
| 9    | Wire scroll draw to NeuralPath                                     | Path draws progressively on scroll                |
| 10   | Add node activation to NeuralPath                                  | Nodes pulse as sections enter viewport            |
| 11   | Build CursorTrail — dot cursor only                                | Default cursor hidden, dot follows mouse          |
| 12   | Add cursor shape switching                                         | Gear/triangle/hexagon render per mode             |
| 13   | Add particle trail                                                 | 20 particles trail cursor with decay              |
| 14   | Add click burst                                                    | 12 particles scatter on click                     |
| 15   | Build all content sections (About, Automation, Video, 3D, Contact) | All sections render with correct data-mode        |
| 16   | Build ReelWall — static grid                                       | 20 cells render with correct aspect ratio         |
| 17   | Wire video playback + hover expansion                              | Hover expands cell, audio unmutes                 |
| 18   | Build SV1Chatbot floating button + panel                           | Panel slides up/down correctly                    |
| 19   | Build `api/sv1/route.js` + wire to panel                           | SV-1 replies to messages                          |
| 20   | Wire ModeController to all sections                                | Mode shifts trigger CSS var swaps site-wide       |
| 21   | Add Howler.js sound per mode                                       | Sound shifts subtly with mode, never jarring      |
| 22   | Add mode indicator dots                                            | Active dot glows in accent color                  |
| 23   | Polish: loading states, mobile layout, performance                 | No blank screens, smooth 60fps scroll             |
| 24   | Deploy to Vercel                                                   | Live URL accessible                               |

---

## Environment Variables (`.env.local`)

```
ANTHROPIC_API_KEY=your_key_here
```

Never expose this in client-side code. All Claude API calls must go through `app/api/sv1/route.js`.

---

## Commands

```bash
npx create-next-app@latest shon-portfolio --tailwind --app --src-dir
cd shon-portfolio
npm install three @react-three/fiber @react-three/drei gsap howler @anthropic-ai/sdk
npm run dev        # Local dev server at localhost:3000
npm run build      # Production build
vercel --prod      # Deploy to Vercel
```

---

## Key Constraints — Never Violate

- Never expose `ANTHROPIC_API_KEY` client-side — all AI calls go through the API route
- Never use `localStorage` or `sessionStorage` — all state lives in React state or context
- CSS mode transitions must always use `cubic-bezier(0.4, 0, 0.2, 1)` — never `linear` or `ease-in-out`
- Sound must default to `OFF` with a visible toggle — never autoplay audio without user consent
- Cursor trail pool must always reuse 20 existing elements — never append new DOM nodes on `mousemove`
- `data-mode` attribute is the single source of truth for mode — never hardcode mode in component logic
- Neural Path coordinates must recalculate on `window.resize` — never assume fixed document height
- SV-1 must include full conversation history in every API call — never send single-turn messages
- Reel Wall video cells must never all start at `currentTime = 0` — always stagger on mount
- Shon's contact email (`shonvarghesevenad@gmail.com`) must appear in ContactSection and SV-1 responses
- Mobile layout is non-negotiable — every feature must degrade gracefully to mobile

---

## How to Use This File with Claude Code

- **Start a session**: `"Follow CLAUDE.md and begin with Step 1"`
- **Build a specific feature**: `"Follow the Neural Path workflow in CLAUDE.md and build NeuralPath.jsx"`
- **Build a section**: `"Build AutomationSection.jsx per the section map in CLAUDE.md"`
- **Wire the mode system**: `"Follow the Mode Shift workflow in CLAUDE.md"`
- **Set up SV-1**: `"Follow the SV-1 Chatbot workflow in CLAUDE.md and build the API route first"`
- **If Claude drifts**: `"Re-read CLAUDE.md"` to snap it back on track
- Claude Code reads this file automatically — keep it in the project root at all times

---

## Skills

Project skills live in `.claude/skills/`. Invoke with `/skill-name`.

| Skill | Command | When to use |
|-------|---------|-------------|
| `scaffold` | `/scaffold` | First time only — bootstraps Next.js + installs all deps |
| `build-feature` | `/build-feature [name]` | Build any of the 6 core features by name (e.g. `/build-feature hero-triptych`) |
| `resume-build` | `/resume-build` | Pick up where you left off — shows build status and recommends next step |
| `check-constraints` | `/check-constraints` | Audit all source files against the 11 Key Constraints before shipping |
| `sv1-test` | `/sv1-test` | Verify `.env.local`, API route, system prompt, and live Claude response |
| `deploy` | `/deploy` | Run production build then deploy to Vercel |

**Valid feature names for `/build-feature`:** `hero-triptych`, `neural-path`, `cursor-trail`, `mode-shift`, `reel-wall`, `sv1-chatbot`
