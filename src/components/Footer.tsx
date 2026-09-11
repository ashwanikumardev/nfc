"use client";

import { CONTACT_EMAIL } from "@/lib/site-config";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Real Proof", href: "#testimonials" },
  { label: "Packs", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.5V8.5l6 3.5-6 3.5z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 14,
                  color: "#000",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                NFC
              </div>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                NFC REVIEW CARDS
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.6,
                maxWidth: 300,
                marginBottom: 24,
              }}
            >
              NFC cards that make it easy for customers to leave genuine reviews — placed at your counter, table, or reception.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: <InstagramIcon />, label: "Instagram" },
                { icon: <TikTokIcon />, label: "TikTok" },
                { icon: <YoutubeIcon />, label: "YouTube" },
              ].map((s) => (
                <span
                  key={s.label}
                  aria-label={s.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.35)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }}
                >
                  {s.icon}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 1.5,
                marginBottom: 20,
              }}
            >
              LINKS
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
            }}
          >
            © 2026 NFC Review Cards. All rights reserved.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              textAlign: "right",
            }}
          >
            NFC cards make the review page easier to reach; customers decide whether to leave feedback.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
