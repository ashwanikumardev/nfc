export default function MarqueeStrip() {
  const items = [
    "RESTAURANTS",
    "CAFÉS",
    "SALONS",
    "GYMS",
    "HOTELS",
    "RETAIL STORES",
    "CLINICS",
    "BARBERS",
    "SHOWROOMS",
    "RECEPTION DESKS",
    "BILLING COUNTERS",
  ];

  const repeated = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", background: "var(--accent)", padding: "13px 0" }}>
      <div className="marquee-inner" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              fontSize: 12,
              color: "#000",
              letterSpacing: 2,
              padding: "0 24px",
            }}
          >
            {item}
            <span style={{ marginLeft: 24, opacity: 0.35 }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
