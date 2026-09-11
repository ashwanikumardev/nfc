export default function FinalCTA() {
  return (
    <section
      style={{
        padding: "120px 24px",
        background: "linear-gradient(135deg, #0A0A0A 0%, #1a1508 50%, #0A0A0A 100%)",
        borderTop: "1px solid rgba(201,169,110,0.1)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 400,
        background: "radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>📱</div>
        <h2
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            marginBottom: 20,
          }}
        >
          MAKE IT EASIER FOR
          <br />
          <span className="gradient-text">CUSTOMERS TO REVIEW YOU.</span>
        </h2>

        <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif", lineHeight: 1.6, marginBottom: 40 }}>
          One tap. Their browser opens. They leave a review. That&apos;s it.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/order" className="btn-primary glow-pulse" style={{ fontSize: 17, padding: "17px 36px", textDecoration: "none" }}>
            Order now →
          </a>
        </div>

        <p style={{ marginTop: 18, color: "rgba(255,255,255,0.25)", fontSize: 13, fontFamily: "Inter" }}>
          Min. 10 cards · Pan-India shipping · No payment collected here
        </p>
      </div>
    </section>
  );
}
