"use client";

import { useEffect, useState } from "react";
import NovaGlowOrb from "./NovaGlowOrb";

// ── Panel config ───────────────────────────────────────────────────────────────
const PANELS = [
  {
    id: "left",
    bgPos: "22% 14%",
    accent: "#00F5FF",
    accentRgb: "0,245,255",
    skill: "AUTOMATION",
    sub: "AI systems that work while you sleep.",
    tag: "n8n · OpenAI · REST APIs",
    align: "left",
    fontFamily: "monospace",
    fontStyle: "normal",
    nameColor: "#00F5FF",
  },
  {
    id: "center",
    bgPos: "50% 14%",
    accent: "#FF2D55",
    accentRgb: "255,45,85",
    skill: "AI VIDEO",
    sub: "Cinematic. Automated. Scalable.",
    tag: "HeyGen · Veo · CapCut",
    align: "center",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    nameColor: "#FF2D55",
  },
  {
    id: "right",
    bgPos: "78% 14%",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
    skill: "3D WEB",
    sub: "Websites that scroll like films.",
    tag: "Three.js · R3F · GSAP",
    align: "right",
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontStyle: "normal",
    nameColor: "#8B5CF6",
  },
];

// ── Single name letter ─────────────────────────────────────────────────────────
function NameLetter({ char, index, color, normalized }) {
  return (
    <span
      style={{
        display: "inline-block",
        color: normalized ? "#ffffff" : color,
        animation: `letterDrop 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.07}s both`,
        transition: "color 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
        fontWeight: 900,
        letterSpacing: "-0.01em",
        whiteSpace: "pre",
      }}
    >
      {char}
    </span>
  );
}

// ── Hero Triptych ─────────────────────────────────────────────────────────────
export default function HeroTriptych() {
  const [normalized, setNormalized] = useState(false);

  useEffect(() => {
    const name = "SHON VARGHESE";
    const delay = (name.length - 1) * 70 + 500 + 2000;
    const t = setTimeout(() => setNormalized(true), delay);
    return () => clearTimeout(t);
  }, []);

  // Map each character to its panel color
  const name = "SHON VARGHESE";
  const nameMap = name.split("").map((char, i) => ({
    char,
    color: i < 4 ? "#00F5FF" : i < 9 ? "#FF2D55" : "#8B5CF6",
  }));

  return (
    <>
      <style>{`
        @keyframes letterDrop {
          from { opacity: 0; transform: translateY(-32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        .hero-panel:hover .skill-label {
          letter-spacing: 0.28em !important;
          color: #fff !important;
        }
        .hero-panel:hover .accent-bar {
          width: 48px !important;
        }
        @media (max-width: 768px) {
          .hero-panels { flex-direction: column !important; }
          .hero-panel  { flex: none !important; height: 33.33vh !important; }
          .hero-subtitle { letter-spacing: 0.1em !important; font-size: 0.5rem !important; }
          .hero-name { font-size: clamp(1.8rem, 9vw, 3rem) !important; }
        }
      `}</style>

      <section
        data-mode="automation"
        style={{ height: "100vh", position: "relative", overflow: "hidden" }}
      >

        {/* ── Three panels ── */}
        <div className="hero-panels" style={{ display: "flex", height: "100%" }}>
          {PANELS.map((p) => (
            <div
              key={p.id}
              className="hero-panel"
              style={{
                flex: 1,
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#050A14",
              }}
            >
              {/* Nova Glow Orb — fills the panel */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <NovaGlowOrb color={p.accent} style={{ width: "100%", height: "100%" }} />
              </div>

              {/* Bottom fade-to-dark */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(5,5,15,0.95) 0%, rgba(5,5,15,0.4) 30%, transparent 60%)",
                pointerEvents: "none",
              }} />

              {/* Top fade */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(5,5,15,0.7) 0%, transparent 22%)",
                pointerEvents: "none",
              }} />

              {/* Scanlines */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `repeating-linear-gradient(0deg, rgba(${p.accentRgb},0.035) 0px, rgba(${p.accentRgb},0.035) 1px, transparent 1px, transparent 4px)`,
                animation: "scanline 0.12s linear infinite",
                pointerEvents: "none",
              }} />

              {/* Panel separator */}
              {p.id !== "left" && (
                <div style={{
                  position: "absolute", top: 0, left: 0, bottom: 0,
                  width: 1,
                  background: `linear-gradient(to bottom, transparent, rgba(${p.accentRgb},0.4) 40%, rgba(${p.accentRgb},0.4) 60%, transparent)`,
                  pointerEvents: "none",
                }} />
              )}

              {/* ── Skill block ── */}
              <div style={{
                position: "absolute",
                bottom: "9%",
                left: p.align === "right" ? undefined : "7%",
                right: p.align === "right" ? "7%" : undefined,
                ...(p.align === "center" ? { left: "7%", right: "7%" } : {}),
                textAlign: p.align,
                animation: "fadeUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 1.3s both",
              }}>
                {/* Accent bar */}
                <div
                  className="accent-bar"
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 2,
                    background: p.accent,
                    marginBottom: 10,
                    verticalAlign: "middle",
                    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    ...(p.align === "right" ? { display: "block", marginLeft: "auto" } : {}),
                    ...(p.align === "center" ? { display: "block", margin: "0 auto 10px" } : {}),
                  }}
                />

                {/* Skill name */}
                <div
                  className="skill-label"
                  style={{
                    fontSize: "clamp(1.2rem, 2.3vw, 2rem)",
                    fontWeight: 900,
                    color: p.accent,
                    fontFamily: p.fontFamily,
                    fontStyle: p.fontStyle,
                    letterSpacing: "0.16em",
                    lineHeight: 1,
                    marginBottom: 8,
                    transition: "letter-spacing 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {p.skill}
                </div>

                <div style={{
                  fontSize: "clamp(0.62rem, 0.9vw, 0.78rem)",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.6,
                  marginBottom: 7,
                }}>
                  {p.sub}
                </div>

                <div style={{
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  color: `rgba(${p.accentRgb}, 0.5)`,
                }}>
                  {p.tag}
                </div>
              </div>

              {/* Panel index */}
              <div style={{
                position: "absolute",
                top: 20,
                left: p.align === "right" ? undefined : "7%",
                right: p.align === "right" ? "7%" : undefined,
                ...(p.align === "center" ? { left: "7%" } : {}),
                fontFamily: "monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                color: `rgba(${p.accentRgb}, 0.3)`,
                animation: "fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1s both",
              }}>
                {p.id === "left" ? "01" : p.id === "center" ? "02" : "03"} / {p.id.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* ── Name — absolute over all panels ── */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          paddingTop: "4.5vh",
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          pointerEvents: "none",
        }}>
          <div className="hero-name" style={{
            display: "flex",
            fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
            fontFamily: "var(--font-geist-sans), sans-serif",
            userSelect: "none",
            lineHeight: 1,
          }}>
            {nameMap.map(({ char, color }, i) => (
              <NameLetter key={i} char={char} index={i} color={color} normalized={normalized} />
            ))}
          </div>
        </div>

        {/* ── Subtitle ── */}
        <div style={{
          position: "absolute",
          top: "calc(4.5vh + clamp(2.4rem, 6.5vw, 6rem) + 10px)",
          left: 0, right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          pointerEvents: "none",
          animation: "fadeUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 1.6s both",
          opacity: 0,
        }}>
          <span className="hero-subtitle" style={{
            fontFamily: "monospace",
            fontSize: "clamp(0.55rem, 0.9vw, 0.72rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.35)",
          }}>
            AI AUTOMATION · AI VIDEO · 3D WEB · DUBAI, UAE
          </span>
        </div>

        {/* ── Scroll hint ── */}
        <div style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          animation: "fadeUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 2.5s both",
          pointerEvents: "none",
        }}>
          SCROLL ↓
        </div>
      </section>
    </>
  );
}
