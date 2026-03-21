"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ── Animated gradient blobs ─────────────────────────────────────────────────
   Each blob drifts in a unique Lissajous-ish path using keyframe arrays.
   One extra blob tracks the mouse with spring physics.
────────────────────────────────────────────────────────────────────────────── */
const BLOBS = [
  {
    color: "0,245,255",
    size: 680,
    left: "10%",
    top: "20%",
    xPath: [0, 60, -40, 30, 0],
    yPath: [0, -50, 70, -30, 0],
    dur: 20,
    delay: 0,
    opacity: 0.65,
  },
  {
    color: "255,45,85",
    size: 580,
    left: "68%",
    top: "55%",
    xPath: [0, -50, 30, -60, 0],
    yPath: [0, 60, -40, 50, 0],
    dur: 24,
    delay: 3,
    opacity: 0.6,
  },
  {
    color: "139,92,246",
    size: 720,
    left: "45%",
    top: "75%",
    xPath: [0, 40, -60, 20, 0],
    yPath: [0, -60, 30, -50, 0],
    dur: 22,
    delay: 6,
    opacity: 0.55,
  },
  {
    color: "0,245,255",
    size: 380,
    left: "82%",
    top: "12%",
    xPath: [0, -30, 50, -20, 0],
    yPath: [0, 40, -60, 30, 0],
    dur: 17,
    delay: 1,
    opacity: 0.45,
  },
  {
    color: "255,45,85",
    size: 320,
    left: "5%",
    top: "72%",
    xPath: [0, 50, -30, 40, 0],
    yPath: [0, -40, 60, -20, 0],
    dur: 19,
    delay: 8,
    opacity: 0.4,
  },
  {
    color: "139,92,246",
    size: 420,
    left: "55%",
    top: "10%",
    xPath: [0, -40, 20, -50, 0],
    yPath: [0, 50, -30, 60, 0],
    dur: 26,
    delay: 4,
    opacity: 0.5,
  },
];

const SERVICES = [
  { label: "AI AUTOMATION", color: "#00F5FF", font: "monospace",           style: "normal" },
  { label: "AI VIDEO",      color: "#FF2D55", font: "Georgia, serif",      style: "italic" },
  { label: "3D WEB",        color: "#8B5CF6", font: "var(--font-geist-sans), sans-serif", style: "normal" },
];

const NAME = "SHON VARGHESE";
const NAME_COLORS = { 0: "#00F5FF", 4: "#FF2D55", 9: "#8B5CF6" };

function getLetterColor(i) {
  if (i >= 9) return "#8B5CF6";
  if (i >= 4) return "#FF2D55";
  return "#00F5FF";
}

export default function HeroGradient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 22 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`
        @keyframes fadeUpHero {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
        .hero-letter {
          display: inline-block;
          transition: color 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-service-pill {
          padding: 8px 22px;
          border-radius: 100px;
          border: 1px solid;
          backdrop-filter: blur(8px);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
          cursor: default;
        }
        .hero-service-pill:hover {
          transform: translateY(-3px) scale(1.04);
        }
        @media (max-width: 768px) {
          .hero-services { flex-direction: column !important; align-items: center !important; }
          .hero-gradient-name { font-size: clamp(2.2rem, 11vw, 4rem) !important; }
        }
      `}</style>

      <section
        className="hero-gradient-root"
        data-mode="automation"
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── Gradient blob layer ── */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
        >
          {BLOBS.map((b, i) => (
            <motion.div
              key={i}
              animate={{ x: b.xPath, y: b.yPath }}
              transition={{
                duration: b.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: b.delay,
              }}
              style={{
                position: "absolute",
                left: b.left,
                top: b.top,
                width: b.size,
                height: b.size,
                borderRadius: "50%",
                background: `radial-gradient(circle at 40% 40%, rgba(${b.color},${b.opacity}) 0%, rgba(${b.color},0) 68%)`,
                filter: "blur(72px)",
                transform: "translate(-50%, -50%)",
                willChange: "transform",
              }}
            />
          ))}

          {/* Mouse-tracking blob */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              x: springX,
              y: springY,
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 70%)",
              filter: "blur(55px)",
              transform: "translate(-50%, -50%)",
              willChange: "transform",
            }}
          />

          {/* Subtle noise grain overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
              opacity: 0.6,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.8rem",
          }}
        >
          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontFamily: "monospace",
              fontSize: "clamp(0.55rem, 0.9vw, 0.68rem)",
              letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
            }}
          >
            AI Developer · Dubai, UAE
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-gradient-name"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontSize: "clamp(3rem, 9vw, 8.5rem)",
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              fontFamily: "var(--font-geist-sans), sans-serif",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {NAME.split("").map((ch, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{
                  color: getLetterColor(i),
                  textShadow: `0 0 40px rgba(${
                    i >= 9 ? "139,92,246" : i >= 4 ? "255,45,85" : "0,245,255"
                  }, 0.35)`,
                  whiteSpace: "pre",
                }}
              >
                {ch}
              </span>
            ))}
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: 120,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(0,245,255,0.6), rgba(255,45,85,0.6), rgba(139,92,246,0.6))",
              transformOrigin: "center",
            }}
          />

          {/* Service pills */}
          <div
            className="hero-services"
            style={{
              display: "flex",
              gap: "0.9rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.label}
                className="hero-service-pill"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  fontFamily: s.font,
                  fontStyle: s.style,
                  fontWeight: 700,
                  fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)",
                  letterSpacing: "0.18em",
                  color: s.color,
                  borderColor: `${s.color}44`,
                  background: `rgba(${
                    s.color === "#00F5FF" ? "0,245,255" :
                    s.color === "#FF2D55" ? "255,45,85" : "139,92,246"
                  },0.08)`,
                  boxShadow: `0 0 18px ${s.color}22, inset 0 1px 0 ${s.color}18`,
                }}
              >
                {s.label}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.28)",
            animation: "scrollBounce 2s ease-in-out infinite",
            whiteSpace: "nowrap",
          }}
        >
          SCROLL ↓
        </div>
      </section>
    </>
  );
}
