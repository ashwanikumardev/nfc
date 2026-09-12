"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, CheckCircle, Clock, Truck, CheckCheck, XCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CONTACT_URL } from "@/lib/site-config";
import { getOrderById, Order, OrderStatus } from "@/lib/order-store";

function StatusBadge({ status, notes }: { status: OrderStatus; notes?: string }) {
  if (!status) return null;

  const config: Record<
    OrderStatus,
    { icon: React.ReactNode; label: string; color: string; bg: string; border: string; desc: string }
  > = {
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
      desc: "Your payment has been verified and your order is confirmed! We are encoding and printing your custom NFC review cards.",
    },
    shipped: {
      icon: <Truck size={16} />,
      label: "Shipped & In Transit",
      color: "#4ade80",
      bg: "rgba(74,222,128,0.08)",
      border: "rgba(74,222,128,0.2)",
      desc: "Your order has been dispatched via courier with Pan-India express delivery. Tracking details will be shared on your WhatsApp.",
    },
    delivered: {
      icon: <CheckCheck size={16} />,
      label: "Delivered",
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.08)",
      border: "rgba(56,189,248,0.2)",
      desc: "Your NFC review cards have been delivered! Place them on your checkout counters and start collecting 5-star Google reviews.",
    },
    cancelled: {
      icon: <XCircle size={16} />,
      label: "Cancelled / Payment Issue",
      color: "#f87171",
      bg: "rgba(248,113,113,0.08)",
      border: "rgba(248,113,113,0.2)",
      desc: "This order was cancelled or payment reference could not be matched. Please contact our support team on WhatsApp for immediate help.",
    },
  };

  const c = config[status] || config.verification;

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
          color: "rgba(255,255,255,0.7)",
          fontSize: 13,
          fontFamily: "Inter",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {c.desc}
      </p>

      {notes && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Inter",
          }}
        >
          <strong style={{ color: "#fff" }}>Latest update: </strong>
          {notes}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = getOrderById(orderId);
    setOrder(result);
    setLoading(false);
    setSearched(true);
  };

  const whatsappUrl = CONTACT_URL;

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
        <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
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
                NFC-748921
              </span>
              ) to check real-time status.
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
                placeholder="e.g. NFC-748921"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
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

            {searched && order && (
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
                {/* Order ID & Customer Info */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter",
                        letterSpacing: 1,
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      ORDER ID
                    </span>
                    <span
                      style={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 800,
                        fontSize: 16,
                        color: "var(--accent)",
                        letterSpacing: 0.5,
                      }}
                    >
                      {order.id}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter",
                        letterSpacing: 1,
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      ORDERED ON
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontSize: 13,
                        color: "#fff",
                      }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    padding: "14px 16px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Customer / Business</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 2 }}>{order.customerName}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{order.businessName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Selected Pack</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", marginTop: 2 }}>{order.packName}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>₹{order.amount.toLocaleString("en-IN")} · {order.cardsCount} cards</div>
                  </div>
                  {order.utr && (
                    <div style={{ gridColumn: "1 / -1", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 8 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>UPI Reference (UTR): </span>
                      <span style={{ fontSize: 12, fontFamily: "Space Grotesk", color: "#fff", letterSpacing: 0.5 }}>{order.utr}</span>
                    </div>
                  )}
                </div>

                <StatusBadge status={order.status} notes={order.notes} />

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
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(37,211,102,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <WhatsAppIcon />
                  Need help? Chat on WhatsApp →
                </a>
              </div>
            )}

            {searched && !order && (
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: 24,
                  marginTop: 24,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(239,68,68,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    color: "#ef4444",
                  }}
                >
                  <AlertCircle size={24} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                  Order Not Found
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 16 }}>
                  We couldn&apos;t find an order with ID &quot;{orderId}&quot;. Please verify the spelling from your confirmation screen, or contact us.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: "none", fontSize: 13, display: "inline-flex", gap: 8, alignItems: "center" }}
                >
                  <WhatsAppIcon /> Contact WhatsApp Support
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
