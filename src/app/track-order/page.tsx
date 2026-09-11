"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, CheckCircle, Clock, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WHATSAPP_NUMBER } from "@/lib/site-config";

type OrderStatus = "verification" | "confirmed" | "shipped" | null;

function StatusBadge({ status }: { status: OrderStatus }) {
  if (!status) return null;

  const config = {
    verification: {
      icon: <Clock size={16} />,
      label: "Payment Verification",
      color: "#FFD700",
      bg: "rgba(255,215,0,0.08)",
      border: "rgba(255,215,0,0.2)",
      desc: "We have received your order and UTR reference. Our team is currently verifying your payment. This usually takes 2–4 hours on business days.",
    },
    confirmed: {
      icon: <CheckCircle size={16} />,
      label: "Order Confirmed",
      color: "var(--accent)",
      bg: "rgba(201,169,110,0.08)",
      border: "rgba(201,169,110,0.25)",
      desc: "Your payment has been verified and your order is confirmed. We are preparing your NFC review cards for dispatch.",
    },
    shipped: {
      icon: <Truck size={16} />,
      label: "Shipped",
      color: "#4ade80",
      bg: "rgba(74,222,128,0.08)",
      border: "rgba(74,222,128,0.2)",
      desc: "Your order has been shipped! You'll receive a tracking link on your registered contact number shortly.",
    },
  };

  const c = config[status];

  return (
    <div
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: "16px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          color: c.color,
        }}
      >
        {c.icon}
        <span
          style={{
            fontFamily: "Space Grotesk",
            fontWeight: 700,
            fontSize: 15,
            color: c.color,
          }}
        >
          {c.label}
        </span>
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 14,
          fontFamily: "Inter",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {c.desc}
      </p>
    </div>
  );
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  // In a real app this would come from a database lookup.
  // For now we simulate a "verification" status for any valid order ID.
  const [status] = useState<OrderStatus>("verification");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSearched(true);
  };

  const isValidOrderId = /^NFC-[A-Z0-9]{6}$/i.test(orderId.trim());

  const whatsappMsg = encodeURIComponent(
    `Hi, I'd like to check the status of my order ${orderId.toUpperCase()}. Could you please update me?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "100px 24px 80px",
        }}
      >
        <div style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: "rgba(201,169,110,0.1)",
                border: "1px solid rgba(201,169,110,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                margin: "0 auto 20px",
              }}
            >
              <Package size={26} />
            </div>
            <h1
              style={{
                fontFamily: "Space Grotesk",
                fontSize: "clamp(28px, 5vw, 42px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: 12,
              }}
            >
              Track your order
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontFamily: "Inter",
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              Enter your Order ID (e.g.{" "}
              <span
                style={{ color: "var(--accent)", fontFamily: "Space Grotesk", fontWeight: 700 }}
              >
                NFC-AB1C2D
              </span>
              ) to check the current status.
            </p>
          </div>

          {/* Search card */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "32px 28px",
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", gap: 12, marginBottom: 0 }}
            >
              <input
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "13px 14px",
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  outline: "none",
                  letterSpacing: 0.5,
                }}
                placeholder="NFC-XXXXXX"
                value={orderId}
                onChange={(e) =>
                  setOrderId(e.target.value.toUpperCase())
                }
              />
              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className="btn-primary"
                style={{ padding: "13px 20px", flexShrink: 0 }}
              >
                {loading ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      border: "2px solid #000",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                ) : (
                  <Search size={16} />
                )}
              </button>
            </form>

            {searched && (
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: 24,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Order ID display */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "Inter",
                      letterSpacing: 1,
                    }}
                  >
                    ORDER ID
                  </span>
                  <span
                    style={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "var(--accent)",
                      letterSpacing: 1,
                    }}
                  >
                    {orderId.toUpperCase()}
                  </span>
                </div>

                <StatusBadge status={status} />

                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "Inter",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  If you haven&apos;t heard from us in 24 hours or need urgent
                  assistance, please reach out on WhatsApp.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "#25D366",
                    color: "#fff",
                    padding: "13px 20px",
                    borderRadius: 99,
                    textDecoration: "none",
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    fontSize: 14,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 24px rgba(37,211,102,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp →
                </a>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link
              href="/"
              style={{
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                fontSize: 13,
                fontFamily: "Inter",
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
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <WhatsAppButton />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.141 1.546 5.877L.057 23.882l6.197-1.495A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.584-.5-5.083-1.374l-.364-.216-3.676.887.931-3.578-.237-.375A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}
