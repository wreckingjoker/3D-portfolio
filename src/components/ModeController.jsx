"use client";

import { useEffect, useRef, useState } from "react";
import { modes } from "@/lib/modeConfig";

// Dispatched globally so CursorTrail can listen without prop drilling
function emitModeChange(mode) {
  window.dispatchEvent(new CustomEvent("modechange", { detail: { mode } }));
}

export default function ModeController() {
  const [activeMode, setActiveMode] = useState("automation");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const howlerRef = useRef(null);

  // Wire IntersectionObserver to all data-mode sections
  useEffect(() => {
    const sections = document.querySelectorAll("[data-mode]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mode = entry.target.getAttribute("data-mode");
            if (mode && modes[mode]) {
              applyMode(mode);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function applyMode(mode) {
    const config = modes[mode];
    if (!config) return;

    // Update CSS custom properties
    document.documentElement.style.setProperty("--bg", config.bg);
    document.documentElement.style.setProperty("--accent", config.accent);
    document.documentElement.style.setProperty("--accent-rgb", config.accentRgb);
    document.body.style.backgroundColor = config.bg;

    setActiveMode(mode);
    emitModeChange(mode);

    // Sound swap — only if user has enabled sound
    if (soundEnabled && typeof window !== "undefined") {
      import("howler").then(({ Howl }) => {
        if (howlerRef.current) {
          howlerRef.current.fade(0.15, 0, 500);
          setTimeout(() => howlerRef.current?.unload(), 600);
        }
        howlerRef.current = new Howl({
          src: [config.sound],
          loop: true,
          volume: 0,
        });
        howlerRef.current.play();
        howlerRef.current.fade(0, 0.15, 500);
      });
    }
  }

  function toggleSound() {
    if (soundEnabled && howlerRef.current) {
      howlerRef.current.fade(0.15, 0, 300);
      setTimeout(() => {
        howlerRef.current?.stop();
      }, 400);
    }
    setSoundEnabled((prev) => !prev);
  }

  const modeKeys = Object.keys(modes);

  return (
    <>
      {/* Mode indicator dots — fixed bottom-left */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        {modeKeys.map((key) => (
          <div
            key={key}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: modes[key].accent,
              opacity: activeMode === key ? 1 : 0.2,
              transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}
      </div>

      {/* Sound toggle — fixed bottom-left above dots */}
      <button
        onClick={toggleSound}
        className="fixed bottom-24 left-5 z-50 text-xs font-mono opacity-50 hover:opacity-100"
        style={{
          color: "var(--accent)",
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-label="Toggle sound"
      >
        {soundEnabled ? "◉ SFX" : "○ SFX"}
      </button>
    </>
  );
}
