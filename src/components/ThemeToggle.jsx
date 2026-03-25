"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LIGHT_STYLES = `
  /* ── Body & base ── */
  body {
    background: #f0f2fa !important;
    color: #0a0a14 !important;
    --tooltip-bg: rgba(255,255,255,0.95);
    --tooltip-color: #0a0a14;
  }

  /* ── All sections by data-mode ── */
  [data-mode="automation"] { background: #f0f2fa !important; }
  [data-mode="video"]      { background: #fdf0f4 !important; }
  [data-mode="3d"]         { background: #f3f0ff !important; }

  /* ── Hero panels ── */
  .hero-panels             { background: transparent !important; }
  .hero-panel-fade-bottom  { opacity: 0 !important; }
  .hero-panel-fade-top     { opacity: 0 !important; }

  /* ── Hide WebGL orbs (opaque dark canvas, can't fix with CSS) ── */
  .hero-orb-wrapper        { display: none !important; }

  /* ── Light accent backgrounds per panel ── */
  .hero-panels .hero-panel:nth-child(1) { background: linear-gradient(160deg, #d8f6fb 0%, #c2eef5 100%) !important; }
  .hero-panels .hero-panel:nth-child(2) { background: linear-gradient(160deg, #fde8ec 0%, #fcd0d9 100%) !important; }
  .hero-panels .hero-panel:nth-child(3) { background: linear-gradient(160deg, #ede8ff 0%, #ddd2ff 100%) !important; }

  /* ── Section direct children (content wrappers) ── */
  [data-mode] > div        { background: transparent !important; }

  /* ── ALL text inside sections → dark (overrides every inline rgba/white) ── */
  [data-mode] *            { color: rgba(10,10,20,0.78) !important; }

  /* ── Client logo tooltip — always readable ── */
  .logo-tooltip-inner      { background: rgba(255,255,255,0.95) !important; color: #0a0a14 !important; }

  /* ── Hero gradient name letters — keep accent colors ── */
  .hero-letter             { color: inherit !important; }
  .hero-gradient-root .hero-letter[style*="#00F5FF"] { color: #00a8b5 !important; }
  .hero-gradient-root .hero-letter[style*="#FF2D55"] { color: #c4003d !important; }
  .hero-gradient-root .hero-letter[style*="#8B5CF6"] { color: #5b21b6 !important; }

  /* ── Hero service pills — keep accent borders/colors ── */
  .hero-service-pill       { background: rgba(0,0,0,0.05) !important; }

  /* ── Restore accent-colored elements ── */
  [data-mode] [style*="color: var(--accent)"] { color: var(--accent) !important; }
  [data-mode] [style*="var(--accent)"]        { color: var(--accent) !important; }

  /* ── Headings ── */
  h1, h2, h3               { color: #0a0a14 !important; }
  [data-mode] h1, [data-mode] h2, [data-mode] h3 { color: #0a0a14 !important; }

  /* ── Muted / subdued text — slightly lighter than body ── */
  [data-mode] p            { color: rgba(10,10,20,0.62) !important; }

  /* ── Keep skill/section labels at accent ── */
  .skill-label             { color: var(--accent) !important; }
  .hero-subtitle           { color: rgba(10,10,20,0.4) !important; }

  /* ── Automation glass panels in light mode ── */
  .auto-card               { background: rgba(255,255,255,0.55) !important; border-color: rgba(0,180,200,0.2) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9) !important; }
  .auto-node-flow          { background: rgba(255,255,255,0.45) !important; border-color: rgba(0,180,200,0.18) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9) !important; }
  .auto-node               { background: rgba(255,255,255,0.75) !important; border-color: rgba(0,180,200,0.35) !important; }
  .auto-tool-chip          { background: rgba(255,255,255,0.5) !important; border-color: rgba(0,180,200,0.2) !important; }

  /* ── Node flow SVG connector lines — visible on light bg ── */
  .auto-node-flow line     { stroke: rgba(0,160,180,0.55) !important; }

  /* ── About tags ── */
  .about-tag               { border-color: rgba(0,0,0,0.15) !important; }

  /* ── Scanline noise — invisible in light mode ── */
  .hero-panel > div[style*="repeating-linear"] { opacity: 0 !important; }

  /* ── Canvas elements — reduce intensity in light mode ── */
  canvas { opacity: 0.35 !important; }

  /* ── Borders with dark variants ── */
  [data-mode="automation"] [style*="border: 1px solid rgba(0,245,255"],
  [data-mode="automation"] [style*="border:1px solid rgba(0,245,255"]  {
    border-color: rgba(0,200,210,0.3) !important;
  }
  [data-mode="3d"] [style*="border: 1px solid rgba(139,92,246"],
  [data-mode="3d"] [style*="border:1px solid rgba(139,92,246"]  {
    border-color: rgba(100,60,200,0.3) !important;
  }
`;

function SunRays() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2, delay: i * 0.025 }}
          style={{
            position: "absolute",
            width: 2,
            height: 5,
            borderRadius: 1,
            background: "#f59e0b",
            top: "50%",
            left: "50%",
            transformOrigin: "0 -10px",
            transform: `rotate(${i * 45}deg) translateX(-50%)`,
          }}
        />
      ))}
    </>
  );
}

function Stars() {
  const stars = [
    { top: "14%", left: "60%", size: 2.5 },
    { top: "36%", left: "74%", size: 1.8 },
    { top: "60%", left: "63%", size: 1.5 },
  ];
  return (
    <>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2, delay: i * 0.07 }}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#c4b5fd",
            top: s.top,
            left: s.left,
          }}
        />
      ))}
    </>
  );
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Inject / remove the light-mode <style> tag
    const existing = document.getElementById("__theme-light");
    if (!dark) {
      if (!existing) {
        const el = document.createElement("style");
        el.id = "__theme-light";
        el.textContent = LIGHT_STYLES;
        document.head.appendChild(el);
      }
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      existing?.remove();
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 24,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
    }}>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={dark ? "dark" : "light"}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.18 }}
          style={{
            fontFamily: "monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.22em",
            color: dark ? "rgba(196,181,253,0.6)" : "rgba(180,130,0,0.8)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {dark ? "DARK" : "LIGHT"}
        </motion.span>
      </AnimatePresence>

      {/* Toggle track */}
      <motion.button
        onClick={toggle}
        aria-label="Toggle light/dark mode"
        animate={{
          background: dark
            ? "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)"
            : "linear-gradient(135deg, #bfdbfe 0%, #7dd3fc 100%)",
          borderColor: dark ? "rgba(139,92,246,0.45)" : "rgba(56,189,248,0.5)",
          boxShadow: dark
            ? "0 0 14px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 0 14px rgba(56,189,248,0.3), inset 0 1px 0 rgba(255,255,255,0.45)",
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "relative",
          width: 56,
          height: 28,
          borderRadius: 14,
          border: "1px solid",
          cursor: "pointer",
          outline: "none",
          overflow: "hidden",
          padding: 0,
          flexShrink: 0,
        }}
      >
        {/* Stars (dark only) */}
        <AnimatePresence>{dark && <Stars key="stars" />}</AnimatePresence>

        {/* Sliding thumb */}
        <motion.div
          animate={{ x: dark ? 4 : 28 }}
          transition={{ type: "spring", stiffness: 440, damping: 32 }}
          style={{
            position: "absolute",
            top: 3,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(circle at 38% 32%, #c4b5fd, #7c3aed)"
              : "radial-gradient(circle at 38% 30%, #fef08a, #f59e0b)",
            boxShadow: dark
              ? "0 1px 6px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,181,253,0.25)"
              : "0 1px 6px rgba(0,0,0,0.2), 0 0 10px rgba(245,158,11,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          {/* Sun rays (light only) */}
          <AnimatePresence>{!dark && <SunRays key="rays" />}</AnimatePresence>
        </motion.div>
      </motion.button>
    </div>
  );
}
