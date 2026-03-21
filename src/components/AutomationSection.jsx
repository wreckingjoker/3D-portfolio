"use client";

const PROJECTS = [
  {
    id: "01",
    title: "WordPress Blog Automation",
    desc: "Research → Content → Image → Auto-publish. Fully autonomous AI blog pipeline.",
    tags: ["n8n", "OpenAI API", "WordPress REST"],
  },
  {
    id: "02",
    title: "Multi-Agent SEO Optimizer",
    desc: "SERP scraping, competitor extraction, AI summarisation — delivered as a report.",
    tags: ["n8n", "Google SERP", "AI Agents"],
  },
  {
    id: "03",
    title: "AI Gmail Manager",
    desc: "Classifies, labels, drafts AI responses and routes finance emails automatically.",
    tags: ["n8n", "Gmail API", "OpenAI"],
  },
  {
    id: "04",
    title: "Google Maps Lead Gen",
    desc: "Scrapes business leads via Apify, enriches data, pipes into Google Sheets.",
    tags: ["n8n", "Apify", "Google Sheets"],
  },
];

const TOOLS = [
  "n8n", "Claude API", "OpenAI API", "REST APIs",
  "Webhooks", "API Config", "JSON / HTTP",
  "Apify", "Google Sheets", "Google Drive",
  "Gmail API", "WordPress REST",
];

const NODES = [
  { label: "Trigger",      sub: "Schedule / Webhook",  x: "8%",  y: "38%" },
  { label: "HTTP Request", sub: "Fetch external data",  x: "28%", y: "22%" },
  { label: "AI Agent",     sub: "OpenAI · Claude",      x: "50%", y: "38%" },
  { label: "Code",         sub: "Transform & filter",   x: "28%", y: "56%" },
  { label: "Output",       sub: "Sheets · Email · CMS", x: "72%", y: "38%" },
];

const EDGES = [
  { x1: "13%", y1: "44%", x2: "27%", y2: "30%" },
  { x1: "13%", y1: "44%", x2: "27%", y2: "60%" },
  { x1: "37%", y1: "30%", x2: "49%", y2: "44%" },
  { x1: "37%", y1: "60%", x2: "49%", y2: "44%" },
  { x1: "59%", y1: "44%", x2: "71%", y2: "44%" },
];

export default function AutomationSection() {
  return (
    <section
      data-mode="automation"
      style={{
        minHeight: "100vh",
        padding: "6rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        background: "#050A14",
        overflow: "hidden",
      }}
    >
      <style>{`
        /* ── Liquid glass keyframes ── */
        @keyframes nodeBlink {
          0%, 100% { box-shadow: 0 0 10px rgba(0,245,255,0.25), 0 4px 24px rgba(0,0,0,0.35); }
          50%       { box-shadow: 0 0 22px rgba(0,245,255,0.55), 0 4px 24px rgba(0,0,0,0.35); }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes glassSheen {
          0%   { transform: translateX(-100%) skewX(-18deg); }
          100% { transform: translateX(300%) skewX(-18deg); }
        }

        /* ── Card glass hover ── */
        .auto-card {
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                      box-shadow 0.35s cubic-bezier(0.4,0,0.2,1),
                      border-color 0.35s cubic-bezier(0.4,0,0.2,1) !important;
        }
        .auto-card:hover {
          transform: translateY(-4px) scale(1.012);
          border-color: rgba(0,245,255,0.45) !important;
          box-shadow: 0 12px 48px rgba(0,245,255,0.12),
                      0 2px 8px rgba(0,0,0,0.55),
                      inset 0 1px 0 rgba(255,255,255,0.12) !important;
        }
        .auto-card:hover .card-sheen {
          animation: glassSheen 0.65s ease forwards;
        }
        .auto-card:hover .card-id {
          color: #00F5FF !important;
        }

        /* ── Node glass ── */
        .auto-node {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .auto-node:hover {
          transform: translate(-50%, -50%) scale(1.08);
        }

        /* ── Tool chip hover ── */
        .auto-tool-chip {
          transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .auto-tool-chip:hover {
          background: rgba(0,245,255,0.1) !important;
          border-color: rgba(0,245,255,0.45) !important;
          color: #00F5FF !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,245,255,0.12) !important;
        }

        @media (max-width: 768px) {
          .auto-cards-grid { grid-template-columns: 1fr !important; }
          .auto-node-flow  { display: none !important; }
        }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,245,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.02) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      {/* Ambient glow blobs */}
      <div style={{ position: "absolute", top: "10%", left: "5%",  width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", opacity: 0.8, marginBottom: "1rem" }}>
            03 / AI AUTOMATION
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Systems that run<br />
            <span style={{ color: "var(--accent)" }}>while you sleep.</span>
          </h2>
        </div>

        {/* ── Node flow — liquid glass panel ── */}
        <div
          className="auto-node-flow"
          style={{
            position: "relative",
            width: "100%",
            height: 140,
            marginBottom: "3rem",
            borderRadius: 16,
            /* Liquid glass */
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            border: "1px solid rgba(0,245,255,0.14)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,245,255,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Top-edge highlight streak */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.35) 40%, rgba(0,245,255,0.35) 60%, transparent)",
            pointerEvents: "none",
          }} />

          {/* SVG edges */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {EDGES.map((e, i) => (
              <line
                key={i}
                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke="rgba(0,245,255,0.22)"
                strokeWidth="1"
                strokeDasharray="4 4"
                style={{ animation: `dashFlow 1.2s linear infinite`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>

          {/* Nodes — individual glass chips */}
          {NODES.map((node, i) => (
            <div
              key={node.label}
              className="auto-node"
              style={{
                position: "absolute",
                left: node.x, top: node.y,
                transform: "translate(-50%, -50%)",
                /* Node glass */
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(0,245,255,0.28)",
                borderRadius: 8,
                padding: "6px 12px",
                fontFamily: "monospace",
                animation: `nodeBlink 2s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: "0.6rem", color: "#00F5FF", letterSpacing: "0.08em", fontWeight: 700 }}>{node.label}</div>
              <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{node.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Project cards — liquid glass ── */}
        <div className="auto-cards-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}>
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="auto-card"
              style={{
                padding: "1.75rem",
                borderRadius: 16,
                position: "relative",
                overflow: "hidden",
                /* Liquid glass */
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px) saturate(150%)",
                WebkitBackdropFilter: "blur(20px) saturate(150%)",
                border: "1px solid rgba(0,245,255,0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
                cursor: "default",
              }}
            >
              {/* Top edge highlight */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.28) 50%, transparent)",
                pointerEvents: "none",
              }} />

              {/* Sheen on hover */}
              <div className="card-sheen" style={{
                position: "absolute", top: 0, left: 0, bottom: 0,
                width: "35%",
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                pointerEvents: "none",
                transform: "translateX(-100%) skewX(-18deg)",
              }} />

              {/* Corner glow accent */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 60, height: 60,
                background: "radial-gradient(circle at top right, rgba(0,245,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* ID */}
              <div
                className="card-id"
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: "rgba(0,245,255,0.4)",
                  marginBottom: "0.75rem",
                  transition: "color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {p.id}
              </div>

              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                {p.title}
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1.1rem" }}>
                {p.desc}
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: "monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    padding: "3px 10px",
                    background: "rgba(0,245,255,0.05)",
                    border: "1px solid rgba(0,245,255,0.18)",
                    color: "rgba(0,245,255,0.65)",
                    borderRadius: 4,
                    backdropFilter: "blur(4px)",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tool belt ── */}
        <div>
          <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>
            TOOLS & PLATFORMS
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {TOOLS.map((t) => (
              <span
                key={t}
                className="auto-tool-chip"
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  padding: "5px 14px",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,245,255,0.14)",
                  color: "rgba(0,245,255,0.6)",
                  borderRadius: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
                  cursor: "default",
                }}
              >{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
