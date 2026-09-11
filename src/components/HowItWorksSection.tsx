"use client";

import { CreditCard, ExternalLink, Smartphone } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Place the card",
    desc: "Keep it where customers naturally finish their visit or payment.",
    icon: CreditCard,
  },
  {
    number: "02",
    title: "Customer taps",
    desc: "The customer taps a compatible NFC phone on the card.",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "Review page opens",
    desc: "Your configured review link opens so the customer can leave genuine feedback.",
    icon: ExternalLink,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section">
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(201,169,110,0.08)",
            color: "var(--accent)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            padding: "6px 16px",
            borderRadius: 99,
            border: "1px solid rgba(201,169,110,0.2)",
            marginBottom: 20,
          }}
        >
          THE PROCESS
        </span>
        <h2
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          How the card works
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            fontFamily: "Inter, sans-serif",
            lineHeight: 1.6,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          No app for the customer. Place the card at your counter, billing desk, table or reception and make the review journey easier.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          maxWidth: 960,
          margin: "0 auto",
        }}
        className="how-grid"
      >
        {STEPS.map((step, i) => {
          const Icon = step.icon;

          return (
          <div
            key={step.number}
            className="card"
            style={{
              padding: "36px 28px",
              position: "relative",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {/* Step number */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "var(--accent)",
                letterSpacing: 3,
                fontFamily: "Space Grotesk, sans-serif",
                marginBottom: 16,
              }}
            >
              {step.number}
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 16,
                fontWeight: 800,
                marginBottom: 20,
              }}
            >
              <Icon size={22} />
            </div>
            <h3
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 10,
                letterSpacing: "-0.02em",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 14,
                lineHeight: 1.7,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {step.desc}
            </p>

            {/* Connector arrow — not on last */}
            {i < STEPS.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  right: -16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 20,
                  color: "rgba(201,169,110,0.4)",
                  zIndex: 1,
                }}
                className="step-arrow"
              >
                →
              </div>
            )}
          </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 48 }}>
        <a href="#pricing" className="btn-primary" style={{ textDecoration: "none" }}>
          Choose your pack →
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-grid { grid-template-columns: 1fr !important; }
          .step-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
