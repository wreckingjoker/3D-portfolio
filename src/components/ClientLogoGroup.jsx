"use client";

import { useState, useEffect } from "react";

const LOGOS = [
  { file: "abn-logo.png",          name: "ABN" },
  { file: "agriventure-logo.png",  name: "Agriventure" },
  { file: "apollo-logo.png",       name: "Apollo" },
  { file: "aqsa-logo.png",         name: "Aqsa" },
  { file: "citypower-logo.png",    name: "City Power" },
  { file: "cle-logo.png",          name: "CLE" },
  { file: "coolcart-logo.png",     name: "Coolcart" },
  { file: "goldenglobe-logo.png",  name: "Golden Globe" },
  { file: "goldenlegacy logo.png", name: "Golden Legacy" },
  { file: "greenpest logo.png",    name: "Green Pest" },
  { file: "gulab-logo.png",        name: "Gulab" },
  { file: "hamza logo.png",        name: "Hamza" },
  { file: "mistygreens-logo.png",  name: "Misty Greens" },
  { file: "nuralnahar-logo.png",   name: "Nural Nahar" },
  { file: "partyhat-logo.png",     name: "Party Hat" },
  { file: "pebbles-logo.png",      name: "Pebbles" },
  { file: "pestora-logo.png",      name: "Pestora" },
  { file: "pinewood-logo.png",     name: "Pinewood" },
  { file: "queenslaundry-logo.png",name: "Queens Laundry" },
  { file: "quickaccess-logo.png",  name: "Quick Access" },
  { file: "rastilaril-logo.png",   name: "Rastilaril" },
  { file: "redmax-logo.png",       name: "Redmax" },
  { file: "rico-logo.png",         name: "Rico" },
  { file: "royaheavy-logo.png",    name: "Roya Heavy" },
  { file: "williamkanda-logo.png", name: "William Kanda" },
];

export default function ClientLogoGroup() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile after mount
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const SIZE    = isMobile ? 36 : 48;
  const OVERLAP = isMobile ? 8  : 6;
  // Show fewer logos on mobile so they don't overflow
  const visible = isMobile ? LOGOS.slice(0, 7) : LOGOS;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem", overflow: "visible", position: "relative", zIndex: 10 }}>
        {/* Avatar stack */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {visible.map((logo, i) => (
            <div
              key={logo.file}
              className="logo-item"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered(hovered === i ? null : i)}
              style={{
                position: "relative",
                marginLeft: i === 0 ? 0 : -OVERLAP,
                zIndex: hovered === i ? 50 : visible.length - i,
                transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hovered === i ? "translateY(-6px) scale(1.12)" : "translateY(0) scale(1)",
                cursor: "pointer",
              }}
            >
              {/* Tooltip — shows on hover (desktop) AND tap (mobile) */}
              {hovered === i && (
                <div className="logo-tooltip-inner" style={{
                  position: "absolute",
                  top: SIZE + 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--tooltip-bg, rgba(20,0,16,0.92))",
                  color: "var(--tooltip-color, #fff)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  padding: "4px 10px",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  border: "1px solid rgba(255,45,85,0.5)",
                  boxShadow: "0 4px 16px rgba(255,45,85,0.2)",
                  zIndex: 200,
                }}>
                  {/* Arrow pointing up */}
                  <div style={{
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0, height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderBottom: "5px solid rgba(255,45,85,0.5)",
                  }} />
                  {logo.name}
                </div>
              )}

              {/* Logo circle */}
              <div style={{
                width: SIZE,
                height: SIZE,
                borderRadius: "50%",
                border: `2px solid ${hovered === i ? "rgba(255,45,85,0.8)" : "rgba(255,255,255,0.1)"}`,
                overflow: "hidden",
                background: "#1a0010",
                transition: "border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: hovered === i ? "0 0 12px rgba(255,45,85,0.3)" : "none",
              }}>
                <img
                  src={`/client-logos/${logo.file}`}
                  alt={logo.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* +100 badge */}
        <div style={{
          marginLeft: -OVERLAP,
          width: SIZE,
          height: SIZE,
          borderRadius: "50%",
          background: "rgba(255,45,85,0.1)",
          border: "2px solid rgba(255,45,85,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: isMobile ? "0.45rem" : "0.55rem",
          color: "rgba(255,45,85,0.8)",
          letterSpacing: "0.05em",
          flexShrink: 0,
          zIndex: 0,
        }}>
          100+
        </div>
      </div>
    </>
  );
}
