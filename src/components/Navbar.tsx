"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Real Photos & Videos", href: "#showcase" },
  { label: "Packs", href: "#pricing" },
  { label: "Track order", href: "/track-order" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 11,
                color: "#0A0A0A",
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: -0.5,
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
        </Link>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 32 }}
          className="desktop-nav"
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "color 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pricing"
            style={{
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Inter, sans-serif",
              transition: "color 0.2s",
              borderRight: "1px solid rgba(255,255,255,0.1)",
              paddingRight: 24,
              marginRight: 8,
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
          >
            View packs
          </a>
          <a href="/order" className="btn-primary" style={{ fontSize: 14, padding: "10px 22px" }}>
            Order now
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-hamburger"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8 }}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 24px 32px",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: 18,
                fontWeight: 600,
                fontFamily: "Space Grotesk, sans-serif",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/order"
            onClick={() => setOpen(false)}
            className="btn-primary"
            style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
          >
            Order now
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
