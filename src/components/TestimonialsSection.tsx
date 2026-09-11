"use client";

const TESTIMONIALS = [
  {
    quote: "We placed 10 cards across our tables and noticed customers tapping more often. Really easy to set up.",
    name: "Business Owner",
    business: "Restaurant",
    rating: 5,
  },
  {
    quote: "Simple product that does exactly what it says. Our reception now has one on every counter.",
    name: "Business Owner",
    business: "Salon",
    rating: 5,
  },
  {
    quote: "Ordered 20 cards for the gym. The fact that customers don't need an app makes a huge difference.",
    name: "Business Owner",
    business: "Fitness Studio",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      style={{
        padding: "96px 24px",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
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
            REAL PROOF
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
            Businesses using it.
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "Inter",
              marginBottom: 48,
            }}
          >
            * Placeholder testimonials — real reviews from clients will be added here.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "32px 28px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.25)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: 16, display: "flex", gap: 3 }}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} style={{ color: "#FFD700", fontSize: 18 }}>★</span>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: 24,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent), #e8c98c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  🏪
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "Inter",
                    }}
                  >
                    {t.business}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
