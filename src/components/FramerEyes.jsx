"use client";

import { useEffect, useRef } from "react";

function Eye({ x, y, size }) {
  const pupilRef = useRef(null);
  const irisRef = useRef(null);
  const glintRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const eyeCenter = useRef({ x, y });

  useEffect(() => {
    eyeCenter.current = { x, y };
  }, [x, y]);

  useEffect(() => {
    const maxTravel = size * 0.22;

    const handleMouseMove = (e) => {
      const svgEl = pupilRef.current?.closest("svg");
      if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const dx = mx - eyeCenter.current.x;
      const dy = my - eyeCenter.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clamp = Math.min(dist, maxTravel) / (dist || 1);
      mouse.current = { x: dx * clamp, y: dy * clamp };
    };

    const loop = () => {
      // Lerp toward target
      current.current.x += (mouse.current.x - current.current.x) * 0.12;
      current.current.y += (mouse.current.y - current.current.y) * 0.12;

      const tx = current.current.x;
      const ty = current.current.y;
      const transform = `translate(${tx}px, ${ty}px)`;

      if (pupilRef.current) pupilRef.current.style.transform = transform;
      if (irisRef.current) irisRef.current.style.transform = transform;
      if (glintRef.current) glintRef.current.style.transform = transform;

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  const r = size / 2;

  return (
    <g>
      {/* Sclera (white) */}
      <circle cx={x} cy={y} r={r} fill="white" />

      {/* Iris */}
      <circle
        ref={irisRef}
        cx={x}
        cy={y}
        r={r * 0.52}
        fill="#1a0028"
        style={{ willChange: "transform" }}
      />

      {/* Pupil */}
      <circle
        ref={pupilRef}
        cx={x}
        cy={y}
        r={r * 0.28}
        fill="#000"
        style={{ willChange: "transform" }}
      />

      {/* Glint */}
      <circle
        ref={glintRef}
        cx={x - r * 0.14}
        cy={y - r * 0.14}
        r={r * 0.1}
        fill="white"
        opacity={0.9}
        style={{ willChange: "transform" }}
      />
    </g>
  );
}

export default function FramerEyes({ size = 90, gap = 24 }) {
  const totalW = size * 2 + gap;
  const totalH = size;
  const cy = size / 2;
  const leftCx = size / 2;
  const rightCx = size / 2 + size + gap;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      style={{ display: "block", overflow: "visible" }}
    >
      <Eye x={leftCx} y={cy} size={size} />
      <Eye x={rightCx} y={cy} size={size} />
    </svg>
  );
}
