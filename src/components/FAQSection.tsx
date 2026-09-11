"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Does the customer need an app?",
    a: "No. On a compatible NFC phone, the customer taps the card and the programmed link can open directly in the browser.",
  },
  {
    q: "Can the card be used again?",
    a: "Yes. NFC cards are reusable. Keep the card at your business and different customers can tap it.",
  },
  {
    q: "Can it open my own business review link?",
    a: "Yes. The card can be configured with the review URL you provide.",
  },
  {
    q: "What is the minimum order?",
    a: "The minimum order is 10 cards.",
  },
  {
    q: "Are reviews guaranteed?",
    a: "No. The card makes it easier for customers to reach your review page, but the decision to leave a review and the rating itself remain entirely with the customer.",
  },
  {
    q: "How do I receive my order?",
    a: "After you submit an enquiry, our team will contact you to confirm your details and review link. Cards are then shipped Pan-India.",
  },
  {
    q: "Can I choose a different review link later?",
    a: "Cards are pre-programmed before shipping. If you need to change the link after delivery, get in touch and we'll advise you on the best approach.",
  },
];

function FAQItem({ item }: { item: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "22px 0", gap: 16, textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 600,
          color: open ? "var(--accent)" : "#fff", transition: "color 0.2s", lineHeight: 1.4,
        }}>
          {item.q}
        </span>
        <ChevronDown
          size={20}
          color={open ? "var(--accent)" : "rgba(255,255,255,0.35)"}
          style={{ flexShrink: 0, transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div ref={contentRef} style={{ height, overflow: "hidden", transition: "height 0.35s ease" }}>
        <p style={{ paddingBottom: 22, color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, fontFamily: "Inter, sans-serif" }}>
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="section">
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <span style={{
          display: "inline-block", background: "rgba(201,169,110,0.1)", color: "var(--accent)",
          fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: "6px 16px",
          borderRadius: 99, border: "1px solid rgba(201,169,110,0.25)", marginBottom: 20,
        }}>
          FAQ
        </span>
        <h2 style={{
          fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>
          Got questions?
          <br />
          <span className="gradient-text">We&apos;ve got answers.</span>
        </h2>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {faqs.map((faq, i) => <FAQItem key={i} item={faq} />)}
      </div>

      <div style={{ textAlign: "center", marginTop: 48 }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "Inter" }}>
          More questions?{" "}
          <a href="mailto:hello@nfcreviewcards.com" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            Drop us a message →
          </a>
        </p>
      </div>
    </section>
  );
}
