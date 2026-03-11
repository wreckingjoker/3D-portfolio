"use client";

const STATS = [
  { value: "100+", label: "Clients Served" },
  { value: "3",    label: "Industries" },
  { value: "4+",   label: "Years Building" },
  { value: "UAE",  label: "Based In Dubai" },
];

const TAGS = [
  "n8n Automation", "OpenAI APIs", "AI Video",
  "Three.js", "React Three Fiber", "GSAP",
  "HeyGen", "Google Veo", "Next.js",
];

export default function AboutSection() {
  return (
    <section
      data-mode="automation"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        position: "relative",
        background: "#050A14",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes floatPhoto {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes scanAbout {
          0%   { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        .about-tag:hover {
          border-color: rgba(0,245,255,0.6) !important;
          color: #00F5FF !important;
          background: rgba(0,245,255,0.06) !important;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 100, height: 100, borderTop: "1px solid rgba(0,245,255,0.12)", borderLeft: "1px solid rgba(0,245,255,0.12)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 100, height: 100, borderBottom: "1px solid rgba(0,245,255,0.12)", borderRight: "1px solid rgba(0,245,255,0.12)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, width: "100%", position: "relative", zIndex: 1 }}>

        {/* Section label */}
        <div style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", opacity: 0.8, marginBottom: "3rem" }}>
          02 / ABOUT
        </div>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* ── LEFT: Photo ── */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "stretch" }}>

            {/* Glow blob */}
            <div style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "radial-gradient(ellipse at center, rgba(0,245,255,0.08) 0%, transparent 70%)",
              animation: "glowPulse 3s ease-in-out infinite",
              pointerEvents: "none",
            }} />

            {/* Photo — fills the column height */}
            <div style={{
              width: "100%",
              maxWidth: 420,
              aspectRatio: "3/4",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(0,245,255,0.22)",
              boxShadow: "0 0 80px rgba(0,245,255,0.08), 0 32px 80px rgba(0,0,0,0.7)",
              animation: "floatPhoto 5s ease-in-out infinite",
              position: "relative",
            }}>
              <img
                src="/profile.jpeg"
                alt="Shon Varghese"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 15%",
                  display: "block",
                }}
              />
              {/* Scanline */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "repeating-linear-gradient(0deg, rgba(0,245,255,0.025) 0px, rgba(0,245,255,0.025) 1px, transparent 1px, transparent 4px)",
                animation: "scanAbout 0.15s linear infinite",
                pointerEvents: "none",
              }} />
              {/* Bottom fade */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "38%",
                background: "linear-gradient(to top, rgba(5,10,20,0.85) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />
              {/* Name badge */}
              <div style={{
                position: "absolute", bottom: 14, left: 14,
                fontFamily: "monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "var(--accent)",
                opacity: 0.8,
              }}>
                SHON VARGHESE // DUBAI, UAE
              </div>
            </div>

            {/* Available badge */}
            <div style={{
              position: "absolute",
              top: 16, right: 16,
              background: "rgba(5,10,20,0.95)",
              border: "1px solid rgba(0,245,255,0.3)",
              borderRadius: 6,
              padding: "6px 12px",
              fontFamily: "monospace",
              fontSize: "0.52rem",
              letterSpacing: "0.12em",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 4px 20px rgba(0,245,255,0.1)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5FF", display: "inline-block", boxShadow: "0 0 8px #00F5FF" }} />
              AVAILABLE FOR FREELANCE
            </div>
          </div>

          {/* ── RIGHT: Text ── */}
          <div>
            <h2 style={{
              fontSize: "clamp(2rem, 3.2vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              margin: "0 0 1.5rem",
              fontFamily: "monospace",
            }}>
              I build AI systems<br />
              <span style={{ color: "var(--accent)" }}>that think,</span><br />
              move, and scale.
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.9,
              fontSize: "0.92rem",
              marginBottom: "2.5rem",
              maxWidth: 440,
            }}>
              I'm Shon — an AI Automation Developer, 3D Web Creator, and AI Video Producer
              based in Dubai, UAE. I blend code, AI, and cinematic design to build things
              that feel alive. Currently driving AI marketing at{" "}
              <span style={{ color: "var(--accent)" }}>Just Search, UAE</span>.
            </p>

            {/* Stats */}
            <div className="about-stats" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              marginBottom: "2.5rem",
              padding: "1.5rem 0",
              borderTop: "1px solid rgba(0,245,255,0.07)",
              borderBottom: "1px solid rgba(0,245,255,0.07)",
            }}>
              {STATS.map(({ value, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)",
                    fontWeight: 900,
                    fontFamily: "monospace",
                    color: "var(--accent)",
                    lineHeight: 1,
                    marginBottom: 5,
                  }}>{value}</div>
                  <div style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                  }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Skill tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="about-tag"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    padding: "5px 12px",
                    border: "1px solid rgba(0,245,255,0.12)",
                    color: "rgba(255,255,255,0.4)",
                    borderRadius: 3,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "default",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
