"use client";

import { useState, useEffect, useRef } from "react";
import { User, Building2, Phone, MapPin, MessageSquare, Check, Loader2, X } from "lucide-react";
import { PACKS } from "./PricingSection";
import { CONTACT_URL } from "@/lib/site-config";
import { saveEnquiry } from "@/lib/order-store";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  padding: "14px 16px 14px 42px",
  color: "#fff",
  fontSize: 15,
  fontFamily: "Inter, sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "rgba(255,255,255,0.45)",
  marginBottom: 8,
  fontFamily: "Inter, sans-serif",
  letterSpacing: 1,
};

function Field({
  label,
  icon: Icon,
  ...props
}: { label: string; icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <Icon size={15} color="rgba(255,255,255,0.25)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          style={{ ...inputStyle, borderColor: focused ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.1)" }}
        />
      </div>
    </div>
  );
}

interface EnquiryFormProps {
  selectedPackId: string | null;
  onClose?: () => void;
}

export default function EnquiryForm({ selectedPackId, onClose }: EnquiryFormProps) {
  const [form, setForm] = useState({ name: "", business: "", phone: "", city: "", message: "" });
  const [submittedPackId, setSubmittedPackId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedPack = PACKS.find((p) => p.id === selectedPackId) || null;
  const selectedPackDetails = selectedPack
    ? `${selectedPack.name} — ${selectedPack.quantity} — ${selectedPack.price}`
    : "";
  const submitted = selectedPackId !== null && submittedPackId === selectedPackId;

  useEffect(() => {
    if (selectedPackId && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedPackId]);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    saveEnquiry({
      name: form.name,
      phone: form.phone,
      businessName: form.business,
      city: form.city,
      message: form.message,
      packName: selectedPack?.name || "Custom Pack",
    });
    setLoading(false);
    setSubmittedPackId(selectedPackId);
  };

  const whatsappUrl = CONTACT_URL;

  if (!selectedPackId) return null;

  return (
    <section id="enquiry" ref={ref} style={{ padding: "0 24px 96px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Section label */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 10,
            }}
          >
            Let&apos;s get your cards ready.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, fontFamily: "Inter" }}>
            Fill in your details and we&apos;ll be in touch shortly.
          </p>
        </div>

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "36px 32px",
          }}
        >
          {/* Selected pack display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(201,169,110,0.08)",
              border: "1px solid rgba(201,169,110,0.25)",
              borderRadius: 14,
              padding: "14px 18px",
              marginBottom: 28,
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: 1.5, fontFamily: "Space Grotesk", marginBottom: 3 }}>
                SELECTED PACK
              </div>
              <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                {selectedPackDetails}
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}
                aria-label="Change pack"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(201,169,110,0.12)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Check size={28} />
              </div>
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 10 }}>
                Request received ✓
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, fontFamily: "Inter", lineHeight: 1.6, marginBottom: 28 }}>
                Thanks! We&apos;ve received your request. We&apos;ll contact you shortly to confirm your business details and order.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#fff",
                  padding: "13px 24px",
                  borderRadius: 99,
                  textDecoration: "none",
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                <WhatsAppIcon />
                Chat on WhatsApp →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <input type="hidden" name="selectedPack" value={selectedPackDetails} />
              <Field label="FULL NAME *" icon={User} placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
              <Field label="BUSINESS NAME *" icon={Building2} placeholder="Your business / shop name" value={form.business} onChange={(e) => update("business", e.target.value)} required />
              <Field label="PHONE / WHATSAPP *" icon={Phone} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
              <Field label="CITY *" icon={MapPin} placeholder="e.g. Mumbai" value={form.city} onChange={(e) => update("city", e.target.value)} required />

              {/* Message */}
              <div>
                <label style={labelStyle}>MESSAGE (OPTIONAL)</label>
                <div style={{ position: "relative" }}>
                  <MessageSquare size={15} color="rgba(255,255,255,0.25)" style={{ position: "absolute", left: 14, top: 16 }} />
                  <textarea
                    placeholder="Any additional details or questions..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 90,
                      paddingTop: 14,
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ justifyContent: "center", fontSize: 16, padding: "16px", gap: 8, marginTop: 4 }}
              >
                {loading ? (
                  <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending...</>
                ) : (
                  "Send enquiry →"
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "Inter" }}>
                No payment collected here. We&apos;ll contact you to confirm everything.
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.141 1.546 5.877L.057 23.882l6.197-1.495A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.584-.5-5.083-1.374l-.364-.216-3.676.887.931-3.578-.237-.375A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}
