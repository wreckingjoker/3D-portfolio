"use client";

import { IconBriefcase, IconMapPin, IconCalendar } from "@tabler/icons-react";

const EXPERIENCES = [
  {
    role: "AI Marketing Strategist",
    type: null,
    company: "Just Search",
    location: "United Arab Emirates",
    period: "Dec 2025 – Apr 2026",
    current: false,
    skills: ["AI Automation", "n8n", "OpenAI API", "SEO", "Lead Generation"],
  },
  {
    role: "AI Marketing Strategist",
    type: "Internship",
    company: "Al Asala Furniture",
    location: "United Arab Emirates",
    period: "Oct 2025 – Nov 2025",
    current: false,
    skills: ["AI Video", "Content Strategy", "HeyGen", "CapCut"],
  },
];

export default function WorkExperienceSection() {
  return (
    <section
      data-mode="3d"
      style={{
        padding: "6rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        background: "#0A0A0F",
        overflow: "hidden",
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

      <div style={{ maxWidth: 800, width: "100%", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", opacity: 0.8, marginBottom: "1rem" }}>
            05 / EXPERIENCE
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Where I've<br />
            <span style={{ color: "var(--accent)" }}>shipped work.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} style={{ display: "flex", gap: "1.5rem" }}>

              {/* Left rail — dot + line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 24 }}>
                {/* Dot */}
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: exp.current ? "var(--accent)" : "rgba(139,92,246,0.35)",
                  border: exp.current ? "2px solid rgba(139,92,246,0.5)" : "2px solid rgba(139,92,246,0.2)",
                  boxShadow: exp.current ? "0 0 10px rgba(139,92,246,0.6), 0 0 24px rgba(139,92,246,0.2)" : "none",
                  flexShrink: 0,
                  marginTop: 22,
                  position: "relative",
                  zIndex: 1,
                }}>
                  {/* Pulse ring for current */}
                  {exp.current && (
                    <div style={{
                      position: "absolute",
                      inset: -5,
                      borderRadius: "50%",
                      border: "1px solid rgba(139,92,246,0.4)",
                      animation: "dotPulse 2s ease-in-out infinite",
                    }} />
                  )}
                </div>

                {/* Connecting line (not on last item) */}
                {i < EXPERIENCES.length - 1 && (
                  <div style={{
                    width: 1,
                    flex: 1,
                    marginTop: 6,
                    marginBottom: 6,
                    background: "linear-gradient(to bottom, rgba(139,92,246,0.5), rgba(139,92,246,0.1))",
                    position: "relative",
                  }}>
                    </div>
                )}
              </div>

              {/* Card */}
              <div
                style={{
                  flex: 1,
                  marginBottom: i < EXPERIENCES.length - 1 ? "1.5rem" : 0,
                  padding: "1.75rem",
                  border: "1px solid rgba(139,92,246,0.15)",
                  borderRadius: 8,
                  background: "rgba(139,92,246,0.03)",
                  position: "relative",
                  transition: "border-color 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.45)";
                  e.currentTarget.style.background = "rgba(139,92,246,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.15)";
                  e.currentTarget.style.background = "rgba(139,92,246,0.03)";
                }}
              >
                {/* Role + badge */}
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.4rem" }}>
                  <IconBriefcase size={14} style={{ color: "var(--accent)", opacity: 0.7, flexShrink: 0 }} />
                  <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "#fff" }}>{exp.role}</span>
                  {exp.type && (
                    <span style={{
                      fontFamily: "monospace",
                      fontSize: "0.5rem",
                      letterSpacing: "0.15em",
                      padding: "2px 8px",
                      border: "1px solid rgba(139,92,246,0.35)",
                      color: "rgba(139,92,246,0.8)",
                      borderRadius: 2,
                    }}>
                      {exp.type.toUpperCase()}
                    </span>
                  )}
                  {exp.current && (
                    <span style={{
                      fontFamily: "monospace",
                      fontSize: "0.5rem",
                      letterSpacing: "0.15em",
                      padding: "2px 8px",
                      border: "1px solid rgba(139,92,246,0.35)",
                      color: "rgba(139,92,246,0.9)",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      <span style={{ animation: "workPulse 1.5s ease-in-out infinite", display: "inline-block" }}>●</span> CURRENT
                    </span>
                  )}
                </div>

                {/* Company */}
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent)", marginBottom: "0.5rem" }}>
                  {exp.company}
                </div>

                {/* Location + period */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                    <IconMapPin size={13} style={{ opacity: 0.6 }} />
                    {exp.location}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                    <IconCalendar size={13} style={{ opacity: 0.6 }} />
                    {exp.period}
                  </div>
                </div>

                {/* Skill tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {exp.skills.map((s) => (
                    <span key={s} style={{
                      fontFamily: "monospace",
                      fontSize: "0.7rem",
                      letterSpacing: "0.08em",
                      padding: "3px 10px",
                      border: "1px solid rgba(139,92,246,0.18)",
                      color: "rgba(255,255,255,0.35)",
                      borderRadius: 2,
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes workPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes dotPulse  { 0%,100%{opacity:0.6; transform:scale(1)} 50%{opacity:0; transform:scale(1.8)} }
      `}</style>
    </section>
  );
}
