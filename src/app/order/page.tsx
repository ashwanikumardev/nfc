"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Copy, Loader2, Search, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PACKS } from "@/components/PricingSection";
import { UPI_ID, UPI_PAYEE_NAME, CONTACT_URL } from "@/lib/site-config";
import { saveOrder } from "@/lib/order-store";

/* ─── Types ─────────────────────────────────────────────── */

interface FormData {
  name: string;
  phone: string;
  business: string;
  pack: string;
  pincode: string;
  city: string;
  address: string;
}

type Pack = (typeof PACKS)[0];

/* ─── Constants ──────────────────────────────────────────── */

const PACK_AMOUNTS: Record<string, number> = {
  starter: 2500,
  business: 5000,
  bulk: 12500,
};

function generateOrderId() {
  return (
    "NFC-" + Math.random().toString(36).substring(2, 8).toUpperCase()
  );
}

/* ─── Shared Styles ──────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "13px 14px",
  color: "#fff",
  fontSize: 14,
  fontFamily: "Inter, sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.5,
  color: "rgba(255,255,255,0.4)",
  marginBottom: 7,
  fontFamily: "Space Grotesk, sans-serif",
};

/* ─── Step Indicator ─────────────────────────────────────── */

function StepIndicator({ step }: { step: number }) {
  const steps = [
    { n: 1, label: "Details" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Confirmation" },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 12,
        padding: 4,
        marginBottom: 32,
        gap: 4,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {steps.map((s) => (
        <div
          key={s.n}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 9,
            background: step === s.n ? "var(--accent)" : "transparent",
            color:
              step === s.n
                ? "#000"
                : step > s.n
                ? "rgba(255,255,255,0.5)"
                : "rgba(255,255,255,0.25)",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: 12,
            textAlign: "center",
            transition: "all 0.3s ease",
            letterSpacing: 0.3,
          }}
        >
          {s.n} · {s.label}
        </div>
      ))}
    </div>
  );
}

/* ─── Payment Summary Sidebar ────────────────────────────── */

function PaymentSummary({
  pack,
  orderId,
  step,
}: {
  pack: Pack | null;
  orderId: string;
  step: number;
}) {
  const amount = pack ? PACK_AMOUNTS[pack.id] : 0;

  const rows = [
    {
      label: "Order ID",
      value: step === 1 ? "Not created" : orderId,
      muted: step === 1,
    },
    {
      label: "Selected pack",
      value: pack ? pack.name : "Choose a pack",
      bold: true,
      muted: !pack,
    },
    {
      label: "Price per card",
      value: pack ? "₹250" : "—",
    },
    {
      label: "Amount to pay",
      value: pack ? `₹${amount.toLocaleString("en-IN")}` : "₹0",
      bold: true,
      accent: !!pack,
      large: true,
    },
  ];

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "24px 22px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <span
          style={{
            fontFamily: "Space Grotesk",
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
          }}
        >
          Payment summary
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.5,
            color: "var(--accent)",
            background: "rgba(201,169,110,0.1)",
            border: "1px solid rgba(201,169,110,0.2)",
            padding: "4px 10px",
            borderRadius: 99,
            fontFamily: "Space Grotesk",
          }}
        >
          UPI · INR
        </span>
      </div>

      {rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: i < rows.length - 1 ? 14 : 0,
            marginBottom: i < rows.length - 1 ? 14 : 0,
            borderBottom:
              i < rows.length - 1
                ? "1px solid rgba(255,255,255,0.05)"
                : "none",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Inter",
            }}
          >
            {row.label}
          </span>
          <span
            style={{
              fontSize: row.large ? 18 : 13,
              fontFamily: row.bold ? "Space Grotesk" : "Inter",
              fontWeight: row.bold ? 700 : 400,
              color: row.accent
                ? "var(--accent)"
                : row.muted
                ? "rgba(255,255,255,0.35)"
                : "#fff",
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Step 1: Customer Details ───────────────────────────── */

function Step1({
  form,
  setForm,
  onNext,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const update = (k: keyof FormData, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const validate = (): Partial<Record<keyof FormData, string>> => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit number";
    if (!form.business.trim()) e.business = "Required";
    if (!form.pack) e.pack = "Please choose a pack";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit PIN";
    if (!form.city.trim()) e.city = "Required";
    if (!form.address.trim()) e.address = "Required";
    return e;
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    onNext();
  };

  const Err = ({ field }: { field: keyof FormData }) =>
    errors[field] ? (
      <p
        style={{
          color: "#ff7b7b",
          fontSize: 11,
          marginTop: 5,
          fontFamily: "Inter",
        }}
      >
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleNext}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      {/* Full Name + Contact */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        className="form-grid-2"
      >
        <div>
          <label style={labelStyle}>FULL NAME *</label>
          <input
            style={inputStyle}
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <Err field="name" />
        </div>
        <div>
          <label style={labelStyle}>CONTACT NUMBER *</label>
          <input
            style={inputStyle}
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            type="tel"
          />
          <Err field="phone" />
        </div>
      </div>

      {/* Business Name */}
      <div>
        <label style={labelStyle}>BUSINESS NAME *</label>
        <input
          style={inputStyle}
          placeholder="Cafe / Hotel / Store name"
          value={form.business}
          onChange={(e) => update("business", e.target.value)}
        />
        <Err field="business" />
      </div>

      {/* Pack + PIN */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        className="form-grid-2"
      >
        <div>
          <label style={labelStyle}>CHOOSE PACK *</label>
          <select
            style={{ ...inputStyle, cursor: "pointer" }}
            value={form.pack}
            onChange={(e) => update("pack", e.target.value)}
          >
            <option value="">Select a pack</option>
            {PACKS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.price}
              </option>
            ))}
          </select>
          <Err field="pack" />
        </div>
        <div>
          <label style={labelStyle}>PIN CODE *</label>
          <input
            style={inputStyle}
            placeholder="6 digit PIN code"
            value={form.pincode}
            onChange={(e) => update("pincode", e.target.value)}
            maxLength={6}
          />
          <Err field="pincode" />
        </div>
      </div>

      {/* City / State */}
      <div>
        <label style={labelStyle}>CITY / STATE *</label>
        <input
          style={inputStyle}
          placeholder="e.g. Mumbai, Maharashtra"
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <Err field="city" />
      </div>

      {/* Delivery Address */}
      <div>
        <label style={labelStyle}>FULL DELIVERY ADDRESS *</label>
        <textarea
          style={{
            ...inputStyle,
            minHeight: 90,
            resize: "vertical",
            paddingTop: 13,
          }}
          placeholder="House/shop, area, road, landmark"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
        />
        <Err field="address" />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{ justifyContent: "center", fontSize: 15, padding: "16px", marginTop: 4 }}
      >
        {loading ? (
          <>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            Saving details...
          </>
        ) : (
          "Save details & continue to payment →"
        )}
      </button>

      {/* How this works note */}
      <div
        style={{
          background: "rgba(201,169,110,0.05)",
          border: "1px solid rgba(201,169,110,0.12)",
          borderRadius: 10,
          padding: "12px 16px",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Inter",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          <strong style={{ color: "rgba(255,255,255,0.65)" }}>
            How this works:
          </strong>{" "}
          Your details are stored before payment. Payment itself goes directly
          to the UPI account below. Final confirmation is done using your
          UTR/reference number.
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .form-grid-2 { grid-template-columns: 1fr !important; } }
        select option { background: #111; color: #fff; }
      `}</style>
    </form>
  );
}

/* ─── Step 2: UPI Payment ────────────────────────────────── */

function Step2({
  pack,
  orderId,
  onSubmit,
}: {
  pack: Pack | null;
  orderId: string;
  onSubmit: (utr: string) => void;
}) {
  const [utr, setUtr] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [utrFocused, setUtrFocused] = useState(false);

  const amount = pack ? PACK_AMOUNTS[pack.id] : 0;

  const upiNote = `${pack?.name || "NFC Cards"} ${orderId}`;
  const upiDeepLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
    UPI_PAYEE_NAME
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(upiNote)}`;

  // Dynamically generate QR code via public API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiDeepLink
  )}&bgcolor=ffffff&color=000000&margin=12`;

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utr.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    onSubmit(utr.trim());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* QR + Pay section */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
            }}
          >
            Pay with any UPI app
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "Space Grotesk",
            }}
          >
            DIRECT UPI
          </span>
        </div>

        {/* QR Code */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 14,
              display: "inline-block",
              boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="UPI QR Code"
              width={200}
              height={200}
              style={{ display: "block", borderRadius: 4 }}
            />
          </div>
        </div>

        {/* Amount */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Inter",
              marginBottom: 4,
              letterSpacing: 1,
            }}
          >
            Pay exactly
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontSize: 44,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            ₹{amount.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Payee details */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 18,
            marginBottom: 20,
          }}
        >
          {[
            { label: "Payee", value: UPI_PAYEE_NAME },
            { label: "UPI ID", value: UPI_ID, accent: true },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "Inter",
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  color: row.accent ? "var(--accent)" : "#fff",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <a
            href={upiDeepLink}
            className="btn-primary"
            style={{
              justifyContent: "center",
              fontSize: 14,
              padding: "13px",
              textDecoration: "none",
            }}
          >
            Pay in UPI App
          </a>
          <button
            type="button"
            onClick={copyUPI}
            className="btn-secondary"
            style={{ justifyContent: "center", fontSize: 14, padding: "12px", gap: 6 }}
          >
            {copied ? (
              <>
                <Check size={14} /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} /> Copy UPI ID
              </>
            )}
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            fontFamily: "Inter",
            marginTop: 14,
            lineHeight: 1.6,
          }}
        >
          PhonePe, Google Pay, Paytm, BHIM or any UPI app can be used.
          <br />
          Verify the payee name before paying.
        </p>
      </div>

      {/* UTR submission */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: "24px",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "Inter",
            lineHeight: 1.7,
            marginBottom: 18,
          }}
        >
          After making the payment, enter the UTR / UPI transaction reference
          below. We will save it against your Order ID and move your order to
          verification.
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>UTR / TRANSACTION REFERENCE *</label>
          <input
            style={{
              ...inputStyle,
              borderColor: utrFocused
                ? "rgba(201,169,110,0.5)"
                : "rgba(255,255,255,0.1)",
            }}
            placeholder="e.g. 12-digit UPI reference"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            onFocus={() => setUtrFocused(true)}
            onBlur={() => setUtrFocused(false)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !utr.trim()}
          className="btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            fontSize: 15,
            padding: "16px",
            opacity: !utr.trim() ? 0.6 : 1,
          }}
        >
          {loading ? (
            <>
              <Loader2
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Submitting...
            </>
          ) : (
            "Submit payment confirmation"
          )}
        </button>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </form>
    </div>
  );
}

/* ─── Step 3: Confirmation ───────────────────────────────── */

function Step3({ orderId, pack }: { orderId: string; pack: Pack | null }) {
  const amount = pack ? PACK_AMOUNTS[pack.id] : 0;

  return (
    <div style={{ textAlign: "center", padding: "24px 16px 8px" }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(201,169,110,0.12)",
          color: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          border: "1px solid rgba(201,169,110,0.3)",
        }}
      >
        <Check size={40} />
      </div>

      <h2
        style={{
          fontFamily: "Space Grotesk",
          fontSize: "clamp(22px, 4vw, 32px)",
          fontWeight: 800,
          color: "#fff",
          marginBottom: 8,
          letterSpacing: "-0.03em",
        }}
      >
        Order received ✓
      </h2>
      <p
        style={{
          fontFamily: "Space Grotesk",
          fontSize: 13,
          fontWeight: 700,
          color: "var(--accent)",
          marginBottom: 20,
          letterSpacing: 1.5,
        }}
      >
        {orderId}
      </p>

      {pack && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(201,169,110,0.08)",
            border: "1px solid rgba(201,169,110,0.2)",
            borderRadius: 12,
            padding: "12px 20px",
            marginBottom: 24,
          }}
        >
          <Package size={18} color="var(--accent)" />
          <span
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 14,
              color: "#fff",
            }}
          >
            {pack.name} · {pack.quantity} · ₹{amount.toLocaleString("en-IN")}
          </span>
        </div>
      )}

      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 15,
          fontFamily: "Inter",
          lineHeight: 1.7,
          maxWidth: 420,
          margin: "0 auto 32px",
        }}
      >
        Thanks! We&apos;ve received your order and payment confirmation. We&apos;ll
        verify your payment and contact you shortly to confirm your business
        details and shipping.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
        }}
      >
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "#25D366",
            color: "#fff",
            padding: "16px 28px",
            borderRadius: 14,
            textDecoration: "none",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            width: "100%",
            maxWidth: 380,
            boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(37,211,102,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.35)";
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.141 1.546 5.877L.057 23.882l6.197-1.495A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.584-.5-5.083-1.374l-.364-.216-3.676.887.931-3.578-.237-.375A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <span>Confirm on WhatsApp →</span>
        </a>
        <Link
          href="/track-order"
          className="btn-secondary"
          style={{ textDecoration: "none", fontSize: 14, width: "100%", maxWidth: 380, textAlign: "center" }}
        >
          Track your order →
        </Link>
        <Link
          href="/"
          className="btn-primary"
          style={{ textDecoration: "none", fontSize: 14, width: "100%", maxWidth: 380, textAlign: "center" }}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Checkout Wrapper (needs Suspense for useSearchParams) ── */

function OrderCheckout() {
  const searchParams = useSearchParams();
  const initPack = searchParams.get("pack") || "";

  const [step, setStep] = useState(1);
  const [orderId] = useState<string>(generateOrderId);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    business: "",
    pack: initPack,
    pincode: "",
    city: "",
    address: "",
  });

  const selectedPack = PACKS.find((p) => p.id === form.pack) || null;

  const handlePaymentSubmitted = (utrValue: string) => {
    saveOrder({
      id: orderId,
      customerName: form.name,
      phone: form.phone,
      businessName: form.business,
      packId: form.pack,
      packName: selectedPack?.name || "NFC Review Cards",
      cardsCount: selectedPack ? parseInt(selectedPack.quantity.replace(/\D/g, "") || "5") : 5,
      amount: selectedPack ? PACK_AMOUNTS[selectedPack.id] || 0 : 0,
      pincode: form.pincode,
      city: form.city,
      address: form.address,
      utr: utrValue,
      status: "verification",
    });
    setStep(3);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", paddingTop: 68 }}>
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}
      >
        {/* Page title */}
        <div style={{ marginBottom: 36 }}>
          <Link
            href="/#pricing"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "Inter",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.35)")
            }
          >
            ← Back to packs
          </Link>
          <h1
            style={{
              fontFamily: "Space Grotesk",
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 6,
            }}
          >
            {step === 3 ? "Order confirmed" : "Complete your order"}
          </h1>
          {step < 3 && (
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "Inter",
                fontSize: 14,
              }}
            >
              NFC Review Cards · Pan-India shipping · No payment stored on this site
            </p>
          )}
        </div>

        {/* Main layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: step < 3 ? "1fr 380px" : "1fr",
            gap: 28,
            alignItems: "start",
          }}
          className="order-layout"
        >
          {/* Left: Form card */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "32px 28px",
            }}
          >
            {step < 3 && <StepIndicator step={step} />}

            {step === 1 && (
              <Step1
                form={form}
                setForm={setForm}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2
                pack={selectedPack}
                orderId={orderId}
                onSubmit={handlePaymentSubmitted}
              />
            )}
            {step === 3 && (
              <Step3 orderId={orderId} pack={selectedPack} />
            )}
          </div>

          {/* Right: Payment summary (steps 1 & 2 only) */}
          {step < 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <PaymentSummary
                pack={selectedPack}
                orderId={orderId}
                step={step}
              />
              <div
                style={{
                  background: "rgba(201,169,110,0.04)",
                  border: "1px solid rgba(201,169,110,0.12)",
                  borderRadius: 14,
                  padding: "14px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Minimum order is 10 cards. After payment confirmation, we&apos;ll
                  verify and begin shipping your order.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .order-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Page Export ────────────────────────────────────────── */

export default function OrderPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "Inter",
                fontSize: 14,
              }}
            >
              Loading...
            </div>
          </div>
        }
      >
        <OrderCheckout />
      </Suspense>
      <WhatsAppButton />
    </>
  );
}
