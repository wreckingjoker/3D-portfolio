"use client";

import dynamic from "next/dynamic";

const FramerEyes = dynamic(() => import("./FramerEyes"), { ssr: false });
const WebSamplesCarousel = dynamic(() => import("./WebSamplesCarousel"), { ssr: false });

const STACK = [
  { name: "Three.js", desc: "3D rendering engine — geometry, materials, lighting" },
  { name: "React Three Fiber", desc: "React renderer for Three.js — declarative 3D" },
  { name: "GSAP ScrollTrigger", desc: "Scroll-driven animations with cinematic precision" },
  { name: "Claude Code", desc: "AI-accelerated development — build at thought-speed" },
  { name: "Lovable / Bolt", desc: "Rapid prototyping and UI scaffolding" },
];

export default function ThreeDSection() {
  return (
    <>
    <style>{`
      @media (max-width: 768px) {
        .threed-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
      }
    `}</style>
    <section
      data-mode="3d"
      style={{
        minHeight: "100vh",
        padding: "6rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#0A0A0F",
      }}
    >
      <div style={{ maxWidth: 1100, width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", opacity: 0.8, marginBottom: "1rem" }}>
            04 / 3D WEB
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Websites that<br />
            <span style={{ color: "var(--accent)" }}>feel alive.</span>
          </h2>
          <div style={{ marginTop: "1.5rem" }}>
            <FramerEyes size={54} gap={16} />
          </div>
        </div>

        {/* Web samples carousel */}
        <div style={{ marginBottom: "3rem" }}>
          <WebSamplesCarousel />
        </div>

        {/* Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>
            TOOLS & STACK
          </div>
          <div className="threed-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {STACK.map((item, i) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "0.75rem 1rem",
                  border: "1px solid rgba(139,92,246,0.12)",
                  borderRadius: 4,
                  background: "rgba(139,92,246,0.03)",
                  transition: "border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)"}
              >
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--accent)", opacity: 0.4, minWidth: 20, paddingTop: 3 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
