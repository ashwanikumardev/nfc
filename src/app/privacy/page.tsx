import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="section" style={{ paddingTop: 120, minHeight: "100vh" }}>
      <Link href="/" className="btn-secondary" style={{ textDecoration: "none", marginBottom: 40 }}>
        Back home
      </Link>
      <div className="card" style={{ padding: "40px 36px", maxWidth: 780 }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 18 }}>
          Privacy
        </h1>
        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8, marginBottom: 18 }}>
          The enquiry form asks for basic contact and business details so the team can respond to your card request. Do not submit card payment details through the enquiry form.
        </p>
        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8, marginBottom: 18 }}>
          Shared business information may be used to prepare your NFC card order, configure the review link you provide, and coordinate delivery.
        </p>
        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8 }}>
          Contact details are used for follow-up about the enquiry and are not intended for unrelated outreach.
        </p>
      </div>
    </main>
  );
}
