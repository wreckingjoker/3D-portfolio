"use client";

const LINKS = [
  { label: "EMAIL", value: "shonvarghesevenad@gmail.com", href: "mailto:shonvarghesevenad@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/shonv", href: "https://www.linkedin.com/in/shonv" },
  { label: "GITHUB", value: "github.com/wreckingjoker", href: "https://github.com/wreckingjoker" },
  { label: "PHONE", value: "+971 505513554", href: "tel:+971505513554" },
];

export default function ContactSection() {
  return (
    <>
    <style>{`
      @media (max-width: 768px) {
        .contact-link { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
        .contact-link-value { font-size: 0.75rem !important; word-break: break-all; }
      }
    `}</style>
    <section
      data-mode="3d"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        position: "relative",
        background: "#0A0A0F",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 700, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>

        <div style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", opacity: 0.8, marginBottom: "1.5rem" }}>
          05 / CONTACT
        </div>

        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 1.5rem" }}>
          Let's build<br />
          <span style={{ color: "var(--accent)" }}>something.</span>
        </h2>

        <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "3rem", fontSize: "0.95rem" }}>
          Available for freelance projects in AI automation, AI video production, and 3D scroll websites. Based in Dubai, UAE. Dependent visa valid until July 2027.
        </p>

        {/* Contact links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          {LINKS.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-link"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.5rem",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: 4,
                textDecoration: "none",
                color: "#fff",
                background: "rgba(139,92,246,0.03)",
                transition: "border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)";
                e.currentTarget.style.background = "rgba(139,92,246,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                e.currentTarget.style.background = "rgba(139,92,246,0.03)";
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--accent)", opacity: 0.7 }}>
                {label}
              </span>
              <span className="contact-link-value" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>{value}</span>
              <span style={{ color: "var(--accent)", opacity: 0.5, fontSize: "0.8rem" }}>→</span>
            </a>
          ))}
        </div>

        {/* Languages */}
        <div style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)" }}>
          ENGLISH · MALAYALAM · HINDI · TAMIL
        </div>

        {/* Footer */}
        <div style={{ marginTop: "4rem", fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>
          SHON VARGHESE © 2025 · DUBAI, UAE · BUILT WITH NEXT.JS + THREE.JS + CLAUDE
        </div>
      </div>
    </section>
    </>
  );
}
