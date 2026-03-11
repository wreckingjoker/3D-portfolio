"use client";

import { useEffect, useRef } from "react";

// Section data-modes in order — used to place nodes at midpoints
const SECTION_MODES = ["automation", "automation", "video", "3d", "3d"];

export default function NeuralPath() {
  const mainPathRef = useRef(null);
  const ghostPathRef = useRef(null);
  const svgRef = useRef(null);
  const nodeRefs = useRef([]);
  const rippleRefs = useRef([]);

  // ── Build the SVG path as percentage-based coords ──────────────────────────
  function buildPath(svgH) {
    // 5 section midpoints across the full document height (20%, 36%, 52%, 68%, 84%)
    const midpoints = [0.2, 0.36, 0.52, 0.68, 0.84];
    const w = window.innerWidth;

    // Snake: alternates left-center-right using cubic beziers
    const pts = midpoints.map((pct, i) => ({
      x: i % 2 === 0 ? w * 0.3 : w * 0.7,
      y: svgH * pct,
    }));

    // Build path with cubic beziers
    let d = `M ${pts[0].x} 0`;
    for (let i = 0; i < pts.length; i++) {
      const prev = i === 0 ? { x: pts[0].x, y: 0 } : pts[i - 1];
      const cur = pts[i];
      const cy1 = prev.y + (cur.y - prev.y) * 0.5;
      d += ` C ${prev.x} ${cy1}, ${cur.x} ${cy1}, ${cur.x} ${cur.y}`;
    }
    // End at bottom
    const last = pts[pts.length - 1];
    d += ` C ${last.x} ${svgH * 0.92}, ${w * 0.5} ${svgH * 0.96}, ${w * 0.5} ${svgH}`;

    return { d, pts };
  }

  // ── Place node circles at section midpoints ─────────────────────────────────
  function updateNodes(pts) {
    pts.forEach((pt, i) => {
      const node = nodeRefs.current[i];
      const ripple = rippleRefs.current[i];
      if (node) {
        node.setAttribute("cx", pt.x);
        node.setAttribute("cy", pt.y);
      }
      if (ripple) {
        ripple.setAttribute("cx", pt.x);
        ripple.setAttribute("cy", pt.y);
      }
    });
  }

  // ── Init + resize ────────────────────────────────────────────────────────────
  useEffect(() => {
    const svg = svgRef.current;
    const mainPath = mainPathRef.current;
    const ghostPath = ghostPathRef.current;
    if (!svg || !mainPath || !ghostPath) return;

    function setup() {
      const docH = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight
      );
      const w = window.innerWidth;

      svg.setAttribute("width", w);
      svg.setAttribute("height", docH);
      svg.style.height = `${docH}px`;

      const { d, pts } = buildPath(docH);
      mainPath.setAttribute("d", d);
      ghostPath.setAttribute("d", d);

      // Set stroke-dasharray after path is in DOM
      requestAnimationFrame(() => {
        const len = mainPath.getTotalLength();
        mainPath.style.strokeDasharray = len;
        mainPath.style.strokeDashoffset = len;
        ghostPath.style.strokeDasharray = len;
        ghostPath.style.strokeDashoffset = len;

        // Gradient stop positions
        const grad = svg.querySelector("#neuralGradient");
        if (grad) {
          grad.setAttribute("gradientUnits", "userSpaceOnUse");
          grad.setAttribute("x1", "0");
          grad.setAttribute("y1", "0");
          grad.setAttribute("x2", "0");
          grad.setAttribute("y2", docH);
        }

        updateNodes(pts);

        // Store for scroll handler
        mainPath._totalLength = len;
        ghostPath._totalLength = len;
      });
    }

    setup();

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    // ── Scroll draw ─────────────────────────────────────────────────────────
    const onScroll = () => {
      const progress =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      const len = mainPath._totalLength || 0;
      const offset = len - len * progress;
      mainPath.style.strokeDashoffset = offset;
      ghostPath.style.strokeDashoffset = offset;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Node activation via IntersectionObserver ────────────────────────────────
  useEffect(() => {
    const sections = document.querySelectorAll("[data-mode]");
    if (!sections.length) return;

    const observers = [];

    sections.forEach((section, i) => {
      const node = nodeRefs.current[i];
      const ripple = rippleRefs.current[i];
      if (!node) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Pulse the node
            node.style.animation = "none";
            void node.offsetWidth; // reflow
            node.style.animation = "nodePulse 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards";
            node.style.opacity = "1";

            if (ripple) {
              ripple.style.animation = "none";
              void ripple.offsetWidth;
              ripple.style.animation = "rippleExpand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
            }
          } else {
            node.style.opacity = "0.4";
            node.style.animation = "";
          }
        },
        { threshold: 0.5 }
      );

      obs.observe(section);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @keyframes nodePulse {
          0%   { r: 4; opacity: 0.4; }
          40%  { r: 12; opacity: 1; }
          100% { r: 4; opacity: 1; }
        }
        @keyframes rippleExpand {
          0%   { r: 4; opacity: 0.6; }
          100% { r: 28; opacity: 0; }
        }
      `}</style>

      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="neuralGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="10000">
            <stop offset="0%"   stopColor="#00F5FF" />
            <stop offset="50%"  stopColor="#FF2D55" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <filter id="ghostBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Ghost path — blurred, low opacity layer */}
        <path
          ref={ghostPathRef}
          stroke="url(#neuralGradient)"
          strokeWidth="4"
          fill="none"
          opacity="0.15"
          filter="url(#ghostBlur)"
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />

        {/* Main path */}
        <path
          ref={mainPathRef}
          stroke="url(#neuralGradient)"
          strokeWidth="2"
          fill="none"
          opacity="1"
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />

        {/* 5 nodes — one per section */}
        {SECTION_MODES.map((_, i) => (
          <g key={i}>
            {/* Ripple circle */}
            <circle
              ref={(el) => (rippleRefs.current[i] = el)}
              r="4"
              fill="none"
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              opacity="0"
            />
            {/* Main node */}
            <circle
              ref={(el) => (nodeRefs.current[i] = el)}
              r="4"
              fill="var(--accent)"
              stroke="var(--bg)"
              strokeWidth="2"
              opacity="0.4"
            />
          </g>
        ))}
      </svg>
    </>
  );
}
