"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const SAMPLES = [
  {
    title: "Mango Splash",
    type: "3D Scroll Website",
    desc: "Product landing page with immersive 3D scroll animation, floating elements, and cinematic transitions built with Three.js + GSAP.",
    tags: ["Three.js", "GSAP", "R3F"],
    media: "/videos/mango-splash-web.webm",
    isVideo: true,
  },
  {
    title: "Optimus Prime",
    type: "3D Scroll Experience",
    desc: "Cinematic 3D web experience featuring a photorealistic model with scroll-driven camera paths and dynamic lighting.",
    tags: ["Three.js", "ScrollTrigger", "Claude Code"],
    media: "/videos/optimus-prime-3d scroll websie.webm",
    isVideo: true,
  },
  {
    title: "Noctis Perfume",
    type: "3D Product Demo",
    desc: "Luxury fragrance brand experience with dark cinematic atmosphere, scroll-driven reveal, and immersive 3D product showcase.",
    tags: ["Three.js", "GSAP", "Claude Code"],
    media: "/videos/Noctis perfume demo.webm",
    isVideo: true,
  },
];

// Pre-generate stable rotations so they don't re-randomize on every render
const ROTATIONS = [-6, 7, -5];

export default function WebSamplesCarousel() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef([]);

  const handleNext = useCallback(() => setActive((p) => (p + 1) % SAMPLES.length), []);
  const handlePrev = useCallback(() => setActive((p) => (p - 1 + SAMPLES.length) % SAMPLES.length), []);

  // Restart active video on slide change
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const sample = SAMPLES[active];

  return (
    <div style={{ width: "100%", perspective: "1000px" }}>
      <style>{`
        .carousel-root {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .carousel-root {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .carousel-info {
            min-height: auto !important;
            padding-top: 0 !important;
          }
          .carousel-controls {
            padding-top: 1.2rem !important;
          }
        }
      `}</style>
      <div className="carousel-root">

        {/* ── Left: stacked cards ── */}
        <div className="carousel-cards" style={{ position: "relative" }}>
          {/* Stack of cards — render in reverse so active is on top */}
          <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%"/* 16:9 */ }}>
            {[...SAMPLES].reverse().map((s, ri) => {
              const i = SAMPLES.length - 1 - ri; // real index
              const isAct = i === active;
              const dist = i - active; // signed distance from active

              return (
                <motion.div
                  key={s.title}
                  animate={{
                    rotateZ: isAct ? 0 : ROTATIONS[i],
                    scale: isAct ? 1 : 0.9 - Math.abs(dist) * 0.03,
                    x: isAct ? 0 : dist * 14,
                    y: isAct ? 0 : Math.abs(dist) * 10,
                    zIndex: isAct ? 10 : 10 - Math.abs(dist),
                    opacity: isAct ? 1 : Math.max(0.35, 0.7 - Math.abs(dist) * 0.2),
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 12,
                    overflow: "hidden",
                    border: isAct
                      ? "1px solid rgba(139,92,246,0.5)"
                      : "1px solid rgba(139,92,246,0.15)",
                    boxShadow: isAct
                      ? "0 8px 48px rgba(139,92,246,0.25), 0 2px 12px rgba(0,0,0,0.6)"
                      : "0 4px 20px rgba(0,0,0,0.5)",
                    cursor: isAct ? "default" : "pointer",
                    transformOrigin: "bottom center",
                    background: "#0A0A0F",
                  }}
                  onClick={() => !isAct && setActive(i)}
                >
                  {s.isVideo ? (
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      src={s.media}
                      muted
                      loop
                      playsInline
                      autoPlay={i === 0}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        background: "#0A0A0F",
                      }}
                    />
                  ) : (
                    <img
                      src={s.media}
                      alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}

                  {/* Dim overlay on inactive */}
                  {!isAct && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(5,5,15,0.55)",
                      pointerEvents: "none",
                    }} />
                  )}

                  {/* Inner glow */}
                  <div style={{
                    position: "absolute", inset: 0,
                    boxShadow: "inset 0 0 32px rgba(139,92,246,0.07)",
                    pointerEvents: "none",
                    borderRadius: 12,
                  }} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Right: info panel ── */}
        <div className="carousel-info" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 300 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -22, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Counter */}
              <div style={{
                fontFamily: "monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                color: "rgba(139,92,246,0.5)",
                marginBottom: "0.9rem",
              }}>
                {String(active + 1).padStart(2, "0")} / {String(SAMPLES.length).padStart(2, "0")}
              </div>

              {/* Type badge */}
              <div style={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                color: "var(--accent)",
                marginBottom: "0.6rem",
              }}>
                {sample.type}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 900,
                color: "#fff",
                margin: "0 0 1.1rem",
                lineHeight: 1.1,
              }}>
                {sample.title}
              </h3>

              {/* Description with blur-in words */}
              <motion.p style={{
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.8,
                margin: "0 0 1.5rem",
              }}>
                {sample.desc.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut", delay: 0.018 * i }}
                    style={{ display: "inline-block", marginRight: "0.28em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {sample.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: "monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.1em",
                    padding: "4px 12px",
                    border: "1px solid rgba(139,92,246,0.25)",
                    color: "rgba(139,92,246,0.75)",
                    borderRadius: 3,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="carousel-controls" style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "2rem" }}>
            <button
              onClick={handlePrev}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.28)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.1)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; }}
            >
              <IconArrowLeft size={15} color="rgba(139,92,246,0.9)" />
            </button>

            <button
              onClick={handleNext}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.28)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.1)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; }}
            >
              <IconArrowRight size={15} color="rgba(139,92,246,0.9)" />
            </button>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {SAMPLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 22 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === active ? "#8B5CF6" : "rgba(139,92,246,0.22)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
