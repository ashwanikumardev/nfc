"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div style={{ position: "absolute", top: "20%", left: "30%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(201,169,110,0.1)",
            border: "1px solid rgba(201,169,110,0.25)",
            borderRadius: 99,
            padding: "7px 16px",
            marginBottom: 28,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0s",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "glow-pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", fontFamily: "Space Grotesk, sans-serif", letterSpacing: 0.5 }}>
            NFC Google Review Cards · Pan-India Shipping
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(40px, 6.5vw, 82px)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            marginBottom: 24,
            maxWidth: 800,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease 0.1s",
          }}
        >
          ONE TAP.
          <br />
          YOUR CUSTOMER
          <br />
          <span className="gradient-text">LEAVES A REVIEW.</span>
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Inter, sans-serif",
            lineHeight: 1.6,
            maxWidth: 520,
            marginBottom: 36,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          Place an NFC card at your counter. Customer taps. Your Google review page opens instantly — no app required.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            marginBottom: 48,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease 0.3s",
          }}
        >
          <a href="/order" className="btn-primary" style={{ fontSize: 16, padding: "16px 32px", textDecoration: "none" }}>
            Order now →
          </a>
          <a href="#how-it-works" className="btn-secondary" style={{ fontSize: 16, padding: "15px 32px", textDecoration: "none" }}>
            How It Works ↓
          </a>
        </div>

        {/* Trust row */}
        <div
          style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transition: "all 0.7s ease 0.4s",
          }}
        >
          {[
            { icon: "📦", label: "Min. 10 cards" },
            { icon: "🚀", label: "Pan-India shipping" },
            { icon: "🔁", label: "Reusable cards" },
            { icon: "📱", label: "No app for customer" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
