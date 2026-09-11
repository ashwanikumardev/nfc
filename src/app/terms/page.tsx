import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="section" style={{ paddingTop: 120, minHeight: "100vh" }}>
      <Link href="/" className="btn-secondary" style={{ textDecoration: "none", marginBottom: 40 }}>
        Back home
      </Link>
      <div className="card" style={{ padding: "40px 36px", maxWidth: 780 }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 18 }}>
          Terms
        </h1>
        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8, marginBottom: 18 }}>
          NFC Review Cards helps customers reach the review link provided by a business. The cards do not create, guarantee, or influence reviews, ratings, rankings, or customer feedback.
        </p>
        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8, marginBottom: 18 }}>
          After an enquiry is submitted, the team will contact you to confirm pack quantity, card details, review URL, delivery information, pricing, and next steps before processing an order.
        </p>
        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8 }}>
          Final production and shipping timelines depend on confirmed artwork, review URL details, agreed next steps handled outside this website, and delivery location.
        </p>
      </div>
    </main>
  );
}
