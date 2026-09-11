"use client";

import { useEffect, useState } from "react";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: "12px 20px calc(12px + env(safe-area-inset-bottom))",
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s ease",
        }}
        className="mobile-sticky"
      >
        <a
          href="/order"
          className="btn-primary"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            textDecoration: "none",
            fontSize: 16,
            padding: "16px",
            borderRadius: 16,
          }}
        >
          Order now
        </a>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .mobile-sticky { display: none !important; }
        }
      `}</style>
    </>
  );
}
