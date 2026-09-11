"use client";

import { WHATSAPP_NUMBER } from "@/lib/site-config";

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.141 1.546 5.877L.057 23.882l6.197-1.495A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.584-.5-5.083-1.374l-.364-.216-3.676.887.931-3.578-.237-.375A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

export default function WhatsAppButton() {
  const msg = encodeURIComponent(
    "Hi, I'm interested in your NFC Review Cards. I would like to know more about the available packs."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 998,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#25D366",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: 99,
        textDecoration: "none",
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 700,
        fontSize: 14,
        boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(37,211,102,0.35)";
      }}
    >
      <WhatsAppIcon />
      <span className="wa-label">WhatsApp</span>

      <style>{`
        @media (max-width: 480px) {
          .wa-label { display: none; }
        }
      `}</style>
    </a>
  );
}
