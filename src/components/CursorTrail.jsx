"use client";

import { useEffect, useRef } from "react";
import { cursorShapes } from "@/lib/cursorShapes";

const POOL_SIZE = 20;
const TRAIL_DELAY_MS = 16; // each particle is ~16ms behind the previous
const BURST_COUNT = 12;

export default function CursorTrail() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const particleRefs = useRef([]);
  const posHistory = useRef([]); // ring buffer of {x, y, t}
  const currentMode = useRef("automation");
  const poolIndex = useRef(0);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });

  // ── Determine mode from nearest ancestor with data-mode ─────────────────────
  function getModeFromPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return "automation";
    const section = el.closest("[data-mode]");
    return section ? section.getAttribute("data-mode") : "automation";
  }

  // ── Apply cursor shape based on mode ────────────────────────────────────────
  function applyCursorShape(mode, cursorEl) {
    if (!cursorEl) return;
    const shapeMap = {
      automation: "gear",
      video: "triangle",
      "3d": "hexagon",
    };
    const shape = shapeMap[mode] || "dot";
    cursorEl.innerHTML = cursorShapes[shape];

    // Remove old animation classes
    cursorEl.style.animation = "";
    cursorEl.style.transform = "translate(-50%, -50%)";

    if (shape === "gear") {
      cursorEl.style.animation = "cursorSpin 1s linear infinite";
    } else if (shape === "hexagon") {
      cursorEl.style.animation = "cursorRotateY 2s linear infinite";
    }
  }

  // ── RAF loop: update cursor + stagger particles ──────────────────────────────
  function tick() {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const { x, y } = mouse.current;

    if (cursor) {
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    }
    if (ring) {
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
    }

    // Update position history
    const now = performance.now();
    posHistory.current.push({ x, y, t: now });
    // Keep only last 2 seconds of history
    while (posHistory.current.length > 200) posHistory.current.shift();

    // Stagger particles: particle i targets position from i*TRAIL_DELAY_MS ago
    particleRefs.current.forEach((p, i) => {
      if (!p) return;
      const targetTime = now - i * TRAIL_DELAY_MS;
      // Find nearest history entry
      let best = posHistory.current[0];
      for (const entry of posHistory.current) {
        if (Math.abs(entry.t - targetTime) < Math.abs((best?.t ?? 0) - targetTime)) {
          best = entry;
        }
      }
      if (best) {
        p.style.left = `${best.x}px`;
        p.style.top = `${best.y}px`;
        const age = now - best.t;
        const opacity = Math.max(0, 1 - age / 600);
        const scale = Math.max(0, 1 - age / 600);
        p.style.opacity = opacity;
        p.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    });

    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    // ── Mouse move ─────────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Mode detection from hovered element
      const mode = getModeFromPoint(e.clientX, e.clientY);
      if (mode !== currentMode.current) {
        currentMode.current = mode;
        applyCursorShape(mode, cursor);
        // Show ring only in default/no-mode areas
        if (ring) ring.style.opacity = mode ? "0" : "1";
      }
    };

    // ── Click burst ────────────────────────────────────────────────────────
    const onMouseDown = (e) => {
      const { clientX: x, clientY: y } = e;
      for (let i = 0; i < BURST_COUNT; i++) {
        const idx = poolIndex.current % POOL_SIZE;
        poolIndex.current++;
        const p = particleRefs.current[idx];
        if (!p) continue;

        const angle = (360 / BURST_COUNT) * i;
        const distance = 40 + Math.random() * 40;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * distance;
        const ty = Math.sin(rad) * distance;

        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.opacity = "1";
        p.style.transform = "translate(-50%, -50%) scale(1)";
        p.style.transition = "none";

        // Force reflow then animate
        void p.offsetWidth;
        p.style.transition =
          "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
        p.style.opacity = "0";
      }
    };

    // ── Hover: scale triangle on clickable elements ─────────────────────────
    const onMouseOver = (e) => {
      if (
        currentMode.current === "video" &&
        (e.target.tagName === "A" ||
          e.target.tagName === "BUTTON" ||
          e.target.closest("a, button"))
      ) {
        if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1.4)";
      }
    };
    const onMouseOut = () => {
      if (cursor) cursor.style.transform = "translate(-50%, -50%)";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Set initial shape
    applyCursorShape("automation", cursor);

    // Start RAF loop
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        @keyframes cursorSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes cursorRotateY {
          0%   { transform: translate(-50%, -50%) perspective(100px) rotateY(0deg); }
          100% { transform: translate(-50%, -50%) perspective(100px) rotateY(360deg); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50%       { transform: translate(-50%, -50%) scale(1.3); opacity: 0.1; }
        }
      `}</style>

      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: -100,
          top: -100,
          pointerEvents: "none",
          zIndex: 9999,
          color: "var(--accent)",
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
          lineHeight: 0,
        }}
        aria-hidden="true"
      />

      {/* Orbiting ring (default/nav only) */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: -100,
          top: -100,
          width: 20,
          height: 20,
          border: "1px solid var(--accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          animation: "ringPulse 2s ease-in-out infinite",
          willChange: "left, top",
        }}
        aria-hidden="true"
      />

      {/* Particle pool — 20 reusable elements, NEVER appended on mousemove */}
      {Array.from({ length: POOL_SIZE }, (_, i) => (
        <div
          key={i}
          ref={(el) => (particleRefs.current[i] = el)}
          style={{
            position: "fixed",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--accent)",
            pointerEvents: "none",
            zIndex: 9997,
            left: -100,
            top: -100,
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0)",
            willChange: "left, top, opacity, transform",
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
