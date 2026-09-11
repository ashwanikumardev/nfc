import Link from "next/link";

const adminItems = [
  "View enquiries",
  "Update card packs",
  "Edit FAQs",
  "Manage testimonials",
  "Export requests",
  "Connect fulfilment tools",
];

export default function AdminPage() {
  return (
    <main className="section" style={{ paddingTop: 120, minHeight: "100vh" }}>
      <Link href="/" className="btn-secondary" style={{ textDecoration: "none", marginBottom: 40 }}>
        Back home
      </Link>

      <div className="card" style={{ padding: "40px 36px", maxWidth: 860 }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(0,255,136,0.08)",
            color: "var(--accent)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            padding: "6px 16px",
            borderRadius: 99,
            border: "1px solid rgba(0,255,136,0.15)",
            marginBottom: 20,
          }}
        >
          ADMIN
        </span>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.05,
            marginBottom: 18,
          }}
        >
          Admin dashboard placeholder
        </h1>

        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8, maxWidth: 680, marginBottom: 30 }}>
          The old mock order dashboard has been removed. This page is ready for a real enquiry management dashboard when the backend is connected.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {adminItems.map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "18px 20px",
                color: "rgba(255,255,255,0.76)",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
