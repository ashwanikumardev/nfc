"use client";

import { Check } from "lucide-react";

export const PACKS = [
  {
    id: "starter",
    name: "Starter pack",
    price: "₹2,500",
    quantity: "10 cards",
    sub: "10 cards · ₹250/card",
    badge: null,
    features: [
      "10 NFC review cards",
      "Ideal for first order",
      "Pan-India shipping",
    ],
    cta: "Choose 10 cards",
    highlight: false,
  },
  {
    id: "business",
    name: "Business pack",
    price: "₹5,000",
    quantity: "20 cards",
    sub: "20 cards · ₹250/card",
    badge: "POPULAR",
    features: [
      "20 NFC review cards",
      "For multiple counters/tables",
      "Pan-India shipping",
    ],
    cta: "Choose 20 cards",
    highlight: true,
  },
  {
    id: "bulk",
    name: "Bulk pack",
    price: "₹12,500",
    quantity: "50 cards",
    sub: "50 cards · ₹250/card",
    badge: null,
    features: [
      "50 NFC review cards",
      "Suitable for resellers/bulk buyers",
      "Pan-India shipping",
    ],
    cta: "Choose 50 cards",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section">
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(201,169,110,0.1)",
            color: "var(--accent)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            padding: "6px 16px",
            borderRadius: 99,
            border: "1px solid rgba(201,169,110,0.25)",
            marginBottom: 20,
          }}
        >
          CARD PACKS
        </span>
        <h2
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          Choose your quantity
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 15,
            fontFamily: "Inter, sans-serif",
            maxWidth: 500,
            margin: "0 auto 48px",
            lineHeight: 1.6,
          }}
        >
          Minimum order is 10 cards. Choose a ready pack below, then send your business details and order request.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 960,
          margin: "0 auto",
        }}
        className="pricing-grid"
      >
        {PACKS.map((pack) => (
          <div
            key={pack.id}
            style={{
              position: "relative",
              borderRadius: 24,
              padding: "36px 28px",
              background: pack.highlight
                ? "linear-gradient(135deg, rgba(201,169,110,0.1) 0%, rgba(201,169,110,0.03) 100%)"
                : "var(--surface)",
              border: pack.highlight
                ? "1px solid rgba(201,169,110,0.35)"
                : "1px solid rgba(255,255,255,0.07)",
              boxShadow: pack.highlight ? "0 0 48px rgba(201,169,110,0.1)" : "none",
              transition: "transform 0.25s ease, border-color 0.25s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
              if (!pack.highlight) (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              if (!pack.highlight) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            {/* Popular badge */}
            {pack.badge && (
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--accent)",
                  color: "#000",
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "5px 16px",
                  borderRadius: 99,
                  letterSpacing: 2,
                  fontFamily: "Space Grotesk, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {pack.badge}
              </div>
            )}

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                color: pack.highlight ? "var(--accent)" : "rgba(255,255,255,0.35)",
                fontFamily: "Space Grotesk, sans-serif",
                marginBottom: 10,
              }}
            >
              {pack.name}
            </div>

            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 48,
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {pack.price}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "Inter, sans-serif",
                marginBottom: 28,
              }}
            >
              {pack.sub}
            </div>

            <div style={{ marginBottom: 32 }}>
              {pack.features.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                  <div
                    style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: pack.highlight ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}
                  >
                    <Check size={11} color={pack.highlight ? "var(--accent)" : "#fff"} />
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "Inter" }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={`/order?pack=${pack.id}`}
              className={pack.highlight ? "btn-primary" : "btn-secondary"}
              style={{ width: "100%", justifyContent: "center", display: "flex", textDecoration: "none" }}
            >
              {pack.cta}
            </a>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
