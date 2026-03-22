"use client";

import { useRef, useEffect } from "react";
import ClientLogoGroup from "./ClientLogoGroup";

const TOOLS = [
  "HeyGen", "Higgsfield", "Grok", "Meta AI",
  "InVideo", "Google Veo", "Google Flow",
  "Leonardo AI", "OpenArt AI", "Suno AI",
  "Lovable", "Bolt", "Canva", "CapCut", "Claude Code",
];

const REAL_VIDEOS = [
  { src: "/video-creatives/RICO Chips-web.webm",    label: "F&B" },
  { src: "/video-creatives/vid-web.webm",           label: "Real Estate" },
  { src: "/video-creatives/vide2-web.webm",         label: "Fashion" },
  { src: "/video-creatives/vide3-web.webm",         label: "Tech" },
  { src: "/video-creatives/web-video.webm",         label: "Retail" },
];

const POSTERS = [
  { src: "/video-creatives/greenpest.png",             label: "Pest Control" },
  { src: "/video-creatives/post williamikanda.png",    label: "Personal Brand" },
  { src: "/video-creatives/vanya citrus.png",          label: "F&B" },
  { src: "/video-creatives/vanya perfumes.png",        label: "Lifestyle" },
];

const PLACEHOLDER_LABELS = ["Real Estate", "F&B", "Fashion", "Tech", "Retail"];
const PLACEHOLDER_COUNT = 11;

const CARDS = [
  ...REAL_VIDEOS.map((v, i) => ({ id: i, ...v, isVideo: true, isPoster: false })),
  ...POSTERS.map((p, i) => ({ id: REAL_VIDEOS.length + i, ...p, isVideo: false, isPoster: true })),
  ...Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({
    id: i + REAL_VIDEOS.length + POSTERS.length,
    label: PLACEHOLDER_LABELS[i % 5],
    num: String(i + 1).padStart(2, "0"),
    isVideo: false,
    isPoster: false,
  })),
];

function HorizontalScroller() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      lastX.current = e.pageX;
      velocity.current = 0;
      el.style.cursor = "grabbing";
      cancelAnimationFrame(rafId.current);
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.4;
      velocity.current = e.pageX - lastX.current;
      lastX.current = e.pageX;
      el.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      el.style.cursor = "grab";
      // Momentum
      const glide = () => {
        if (Math.abs(velocity.current) < 0.5) return;
        el.scrollLeft -= velocity.current;
        velocity.current *= 0.92;
        rafId.current = requestAnimationFrame(glide);
      };
      glide();
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="reel-track"
      style={{
        display: "flex",
        gap: 12,
        overflowX: "auto",
        overflowY: "hidden",
        cursor: "grab",
        paddingBottom: 12,
        paddingTop: 4,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        userSelect: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Hide scrollbar */}
      <style>{`
        .reel-track::-webkit-scrollbar { display: none; }
        @keyframes livePulse { 0%,100%{opacity:1}50%{opacity:0.2} }
        .reel-card:hover .hover-hint { opacity: 0 !important; }
        @media (max-width: 640px) {
          .reel-card { width: 130px !important; }
        }
      `}</style>

      {CARDS.map((card) => (
        <div
          key={card.id}
          className="reel-card"
          style={{
            flexShrink: 0,
            width: 180,
            aspectRatio: "9/16",
            background: "#0d000d",
            border: "1px solid rgba(255,45,85,0.1)",
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
            transform: `rotate(${((card.id * 7 + 3) % 9 - 4) * 0.08}deg)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04) rotate(0deg)";
            e.currentTarget.style.borderColor = "rgba(255,45,85,0.6)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,45,85,0.2)";
            e.currentTarget.style.zIndex = "10";
            const vid = e.currentTarget.querySelector("video");
            if (vid) {
              const playPromise = vid.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${((card.id * 7 + 3) % 9 - 4) * 0.08}deg)`;
            e.currentTarget.style.borderColor = "rgba(255,45,85,0.1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.zIndex = "";
            const vid = e.currentTarget.querySelector("video");
            if (vid) {
              const playPromise = vid.play();
              if (playPromise !== undefined) {
                playPromise.then(() => { vid.pause(); vid.currentTime = 0; }).catch(() => {});
              } else {
                vid.pause();
                vid.currentTime = 0;
              }
            }
          }}
        >
          {/* Gradient overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(8,0,8,0.9) 0%, rgba(8,0,8,0.2) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Real video */}
          {card.isVideo && (
            <video
              src={card.src}
              preload="metadata"
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => { e.target.currentTime = 0.1; }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Poster image */}
          {card.isPoster && (
            <img
              src={card.src}
              alt={card.label}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Noise texture (placeholders only) */}
          {!card.isVideo && !card.isPoster && (
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
              opacity: 0.4,
              pointerEvents: "none",
            }} />
          )}

          {/* Hover to play hint (video cards only) */}
          {card.isVideo && (
            <div className="hover-hint" style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.5)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.3s ease",
            }}>
              HOVER TO PLAY
            </div>
          )}

          {/* LIVE badge */}
          <div style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontFamily: "monospace",
            fontSize: "0.48rem",
            letterSpacing: "0.18em",
            color: "#FF2D55",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}>
            <span style={{ animation: "livePulse 1.5s ease-in-out infinite" }}>●</span> LIVE
          </div>

          {/* Card number (placeholders only) */}
          {!card.isVideo && !card.isPoster && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "monospace",
              fontSize: "2rem",
              fontWeight: 800,
              color: "rgba(255,45,85,0.06)",
              letterSpacing: "-0.05em",
            }}>
              {card.num}
            </div>
          )}

          {/* Bottom accent line */}
          <div style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
          }}>
            <div style={{
              height: 1,
              background: "linear-gradient(to right, rgba(255,45,85,0.4), transparent)",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VideoSection() {
  return (
    <section
      data-mode="video"
      style={{
        minHeight: "100vh",
        padding: "6rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        background: "#080008",
        overflow: "hidden",
      }}
    >
      {/* Header — padded */}
      <div style={{ padding: "0 2rem", marginBottom: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", opacity: 0.8, marginBottom: "1rem" }}>
            03 / AI VIDEO
          </div>
          <ClientLogoGroup />
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            100+ clients.<br />
            <span style={{ color: "var(--accent)" }}>3 industries. 1 creative engine.</span>
          </h2>
        </div>
      </div>

      {/* Full-width scroller — bleeds to edges */}
      <div style={{ padding: "1rem 2rem 1.5rem", width: "100%" }}>
        <HorizontalScroller />
      </div>

      {/* Footer — padded */}
      <div style={{ padding: "0 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Drag hint */}
          <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,45,85,0.4)", marginBottom: "1.5rem" }}>
            ← DRAG TO EXPLORE →
          </div>

          {/* Tool belt */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {TOOLS.map((t) => (
              <span key={t} style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                padding: "4px 12px",
                border: "1px solid rgba(255,45,85,0.25)",
                color: "rgba(255,45,85,0.7)",
                borderRadius: 2,
              }}>{t}</span>
            ))}
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: 560, margin: 0 }}>
            End-to-end AI video production — creative concept development, script generation, AI avatar creation, voice synthesis, visual generation, and post-production editing. Delivered for clients across real estate, F&amp;B, fashion, and tech.
          </p>
        </div>
      </div>
    </section>
  );
}
