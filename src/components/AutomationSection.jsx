"use client";

const PROJECTS = [
  {
    id: "01",
    title: "WordPress Blog Automation",
    desc: "Research → Content → Image → Auto-publish. Fully autonomous AI blog pipeline.",
    tags: ["n8n", "OpenAI API", "WordPress REST"],
    accent: "#00F5FF",
  },
  {
    id: "02",
    title: "Multi-Agent SEO Optimizer",
    desc: "SERP scraping, competitor extraction, AI summarisation — delivered as a report.",
    tags: ["n8n", "Google SERP", "AI Agents"],
    accent: "#00F5FF",
  },
  {
    id: "03",
    title: "AI Gmail Manager",
    desc: "Classifies, labels, drafts AI responses and routes finance emails automatically.",
    tags: ["n8n", "Gmail API", "OpenAI"],
    accent: "#00F5FF",
  },
  {
    id: "04",
    title: "Google Maps Lead Gen",
    desc: "Scrapes business leads via Apify, enriches data, pipes into Google Sheets.",
    tags: ["n8n", "Apify", "Google Sheets"],
    accent: "#00F5FF",
  },
];

const TOOLS = [
  "n8n", "Claude API", "OpenAI API", "REST APIs",
  "Webhooks", "API Config", "JSON / HTTP",
  "Apify", "Google Sheets", "Google Drive",
  "Gmail API", "WordPress REST",
];

// Simulated node flow — static representation of an n8n-style pipeline
const NODES = [
  { label: "Trigger", sub: "Schedule / Webhook", x: "8%",  y: "38%" },
  { label: "HTTP Request", sub: "Fetch external data",   x: "28%", y: "22%" },
  { label: "AI Agent",     sub: "OpenAI · Claude",       x: "50%", y: "38%" },
  { label: "Code",         sub: "Transform & filter",    x: "28%", y: "56%" },
  { label: "Output",       sub: "Sheets · Email · CMS",  x: "72%", y: "38%" },
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
        @keyframes nodeBlink {
          0%, 100% { box-shadow: 0 0 8px rgba(0,245,255,0.3); }
          50%       { box-shadow: 0 0 20px rgba(0,245,255,0.7); }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auto-card:hover {
          border-color: rgba(0,245,255,0.4) !important;
          background: rgba(0,245,255,0.04) !important;
        }
        .auto-card:hover .card-id {
          color: #00F5FF !important;
        }
        @media (max-width: 768px) {
          .auto-cards-grid { grid-template-columns: 1fr !important; }
          .auto-node-flow  { display: none !important; }
        }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

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

        {/* ── Node flow diagram ── */}
        <div className="auto-node-flow" style={{
          position: "relative",
          width: "100%",
          height: 140,
          marginBottom: "3rem",
          borderRadius: 10,
          border: "1px solid rgba(0,245,255,0.08)",
          background: "rgba(0,245,255,0.02)",
          overflow: "hidden",
        }}>
          {/* SVG edges */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {EDGES.map((e, i) => (
              <line
                key={i}
                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke="rgba(0,245,255,0.25)"
                strokeWidth="1"
                strokeDasharray="4 4"
                style={{ animation: `dashFlow 1.2s linear infinite`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>

          {/* Nodes */}
          {NODES.map((node, i) => (
            <div
              key={node.label}
              style={{
                position: "absolute",
                left: node.x, top: node.y,
                transform: "translate(-50%, -50%)",
                background: "rgba(5,10,20,0.95)",
                border: "1px solid rgba(0,245,255,0.3)",
                borderRadius: 6,
                padding: "5px 10px",
                fontFamily: "monospace",
                animation: `nodeBlink 2s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
                whiteSpace: "nowrap",
              }}
            >
              <div style={{ fontSize: "0.6rem", color: "#00F5FF", letterSpacing: "0.08em", fontWeight: 700 }}>{node.label}</div>
              <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>{node.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Project cards grid ── */}
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
                padding: "1.5rem",
                border: "1px solid rgba(0,245,255,0.1)",
                borderRadius: 8,
                background: "rgba(0,245,255,0.01)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* ID */}
              <div
                className="card-id"
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: "rgba(0,245,255,0.35)",
                  marginBottom: "0.75rem",
                  transition: "color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {p.id}
              </div>

              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                {p.title}
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1rem" }}>
                {p.desc}
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: "monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    padding: "3px 8px",
                    border: "1px solid rgba(0,245,255,0.15)",
                    color: "rgba(0,245,255,0.5)",
                    borderRadius: 2,
                  }}>{t}</span>
                ))}
              </div>

              {/* Corner accent */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 40, height: 40,
                borderBottom: "1px solid rgba(0,245,255,0.15)",
                borderLeft: "1px solid rgba(0,245,255,0.15)",
                pointerEvents: "none",
              }} />
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
              <span key={t} style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                padding: "5px 14px",
                border: "1px solid rgba(0,245,255,0.15)",
                color: "rgba(0,245,255,0.55)",
                borderRadius: 3,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
