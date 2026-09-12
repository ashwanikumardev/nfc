"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Lock,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  CheckCheck,
  XCircle,
  Search,
  Download,
  Plus,
  RotateCcw,
  ExternalLink,
  MessageCircle,
  Trash2,
  Eye,
  ShieldCheck,
  LogOut,
  QrCode,
  Copy,
  Check,
  FileText,
  Building,
  User,
  Phone,
  MapPin,
  Save,
  X,
} from "lucide-react";
import {
  getOrders,
  getOrderById,
  saveOrder,
  updateOrderStatus,
  deleteOrder,
  resetToDemoData,
  exportOrdersToCSV,
  getEnquiries,
  updateEnquiryStatus,
  Order,
  OrderStatus,
  Enquiry,
} from "@/lib/order-store";
import { UPI_ID, UPI_PAYEE_NAME, WHATSAPP_NUMBER } from "@/lib/site-config";
import { PACKS } from "@/components/PricingSection";

const ADMIN_PASS = "9625";
const AUTH_KEY = "npc_admin_auth_9625";

/* ─── Status Badge Component ─────────────────────────────── */

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; border: string; icon: React.ElementType }
> = {
  verification: {
    label: "Verification",
    color: "#eab308",
    bg: "rgba(234,179,8,0.1)",
    border: "rgba(234,179,8,0.25)",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    color: "var(--accent)",
    bg: "rgba(201,169,110,0.12)",
    border: "rgba(201,169,110,0.3)",
    icon: CheckCircle2,
  },
  shipped: {
    label: "Shipped",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.1)",
    border: "rgba(56,189,248,0.25)",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    border: "rgba(74,222,128,0.25)",
    icon: CheckCheck,
  },
  cancelled: {
    label: "Cancelled",
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.25)",
    icon: XCircle,
  },
};

function StatusPill({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.verification;
  const Icon = cfg.icon;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "Space Grotesk, sans-serif",
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={13} />
      {cfg.label}
    </span>
  );
}

/* ─── Main Admin Component ───────────────────────────────── */

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Tabs: 'orders' | 'enquiries' | 'settings'
  const [activeTab, setActiveTab] = useState<"orders" | "enquiries" | "settings">("orders");

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Enquiries State
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  // Notes editing state inside modal
  const [editingNotes, setEditingNotes] = useState("");
  const [copiedUtr, setCopiedUtr] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const authed = sessionStorage.getItem(AUTH_KEY);
    if (authed === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setOrders(getOrders());
    setEnquiries(getEnquiries());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setLoginError(false);
      loadData();
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders(getOrders());
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
    }
  };

  const handleSaveNotes = () => {
    if (!selectedOrder) return;
    const updated = updateOrderStatus(selectedOrder.id, selectedOrder.status, editingNotes);
    if (updated) {
      setSelectedOrder(updated);
      setOrders(getOrders());
    }
  };

  const handleDelete = (orderId: string) => {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
      deleteOrder(orderId);
      setOrders(getOrders());
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
    }
  };

  const handleResetData = () => {
    if (confirm("Reset orders and enquiries to sample demo data? Any custom orders created in this browser will be replaced.")) {
      resetToDemoData();
      loadData();
      setSelectedOrder(null);
    }
  };

  const handleAddMockOrder = () => {
    const randomId = "NFC-" + Math.floor(100000 + Math.random() * 900000);
    const mockOrder: Omit<Order, "createdAt" | "updatedAt"> = {
      id: randomId,
      customerName: "Rahul Kapoor",
      phone: "9821098765",
      businessName: "Kapoor Jewellers",
      packId: "business",
      packName: "Business Pack",
      cardsCount: 5,
      amount: 5000,
      pincode: "110024",
      city: "New Delhi",
      address: "M-Block Market, Greater Kailash 1",
      utr: "4" + Math.floor(10000000000 + Math.random() * 90000000000),
      status: "verification",
      notes: "Customer confirmed via WhatsApp. Wants gold foil finish.",
    };
    saveOrder(mockOrder);
    setOrders(getOrders());
  };

  const handleEnquiryStatus = (id: string, status: Enquiry["status"]) => {
    updateEnquiryStatus(id, status);
    setEnquiries(getEnquiries());
  };

  const copyText = (txt: string, key: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedUtr(key);
    setTimeout(() => setCopiedUtr(null), 2000);
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.businessName.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        (o.utr && o.utr.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const totalRev = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.amount || 0), 0);
    const pendingCount = orders.filter((o) => o.status === "verification").length;
    const confirmedCount = orders.filter((o) => o.status === "confirmed").length;
    const shippedCount = orders.filter((o) => o.status === "shipped" || o.status === "delivered").length;
    return {
      totalRev,
      totalOrders: orders.length,
      pendingCount,
      confirmedCount,
      shippedCount,
    };
  }, [orders]);

  if (!mounted) return null;

  /* ─── Login Screen ─────────────────────────────────────── */

  if (!isAuthenticated) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "radial-gradient(ellipse at 50% 20%, rgba(201,169,110,0.08) 0%, #080808 70%)",
        }}
      >
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            background: "var(--surface)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 20,
              background: "rgba(201,169,110,0.1)",
              border: "1px solid rgba(201,169,110,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              margin: "0 auto 24px",
            }}
          >
            <Lock size={26} />
          </div>

          <h1
            style={{
              fontFamily: "Space Grotesk",
              fontSize: 26,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Admin Console
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 14,
              fontFamily: "Inter",
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            Enter your admin passcode to access order management & verification.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <input
                type="password"
                placeholder="Passcode (default: npcadmin2026)"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: loginError
                    ? "1px solid #ef4444"
                    : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: "Inter",
                  textAlign: "center",
                  letterSpacing: 2,
                  outline: "none",
                }}
                autoFocus
              />
              {loginError && (
                <p style={{ color: "#f87171", fontSize: 12, marginTop: 8, fontFamily: "Inter" }}>
                  Invalid passcode. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
                fontSize: 15,
              }}
            >
              Unlock Dashboard →
            </button>
          </form>

          <div style={{ marginTop: 24 }}>
            <Link
              href="/"
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                fontFamily: "Inter",
              }}
            >
              ← Back to customer website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── Authenticated Dashboard ──────────────────────────── */

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", color: "#fff" }}>
      {/* Top Navbar */}
      <header
        style={{
          background: "rgba(12,12,14,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "rgba(201,169,110,0.15)",
                border: "1px solid rgba(201,169,110,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
              }}
            >
              <Package size={17} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 800,
                    fontSize: 15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  NFC CARDS
                </span>
                <span
                  style={{
                    background: "rgba(201,169,110,0.15)",
                    color: "var(--accent)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 6px",
                    letterSpacing: 1,
                  }}
                >
                  ADMIN
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: 4,
            }}
          >
            <button
              onClick={() => setActiveTab("orders")}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Space Grotesk",
                background: activeTab === "orders" ? "rgba(255,255,255,0.12)" : "transparent",
                color: activeTab === "orders" ? "#fff" : "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.15s",
              }}
            >
              <Package size={15} />
              Orders
              {stats.pendingCount > 0 && (
                <span
                  style={{
                    background: "#eab308",
                    color: "#000",
                    fontSize: 10,
                    fontWeight: 800,
                    borderRadius: 99,
                    padding: "1px 6px",
                  }}
                >
                  {stats.pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("enquiries")}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Space Grotesk",
                background: activeTab === "enquiries" ? "rgba(255,255,255,0.12)" : "transparent",
                color: activeTab === "enquiries" ? "#fff" : "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.15s",
              }}
            >
              <MessageCircle size={15} />
              Enquiries
              {enquiries.filter((e) => e.status === "new").length > 0 && (
                <span
                  style={{
                    background: "var(--accent)",
                    color: "#000",
                    fontSize: 10,
                    fontWeight: 800,
                    borderRadius: 99,
                    padding: "1px 6px",
                  }}
                >
                  {enquiries.filter((e) => e.status === "new").length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Space Grotesk",
                background: activeTab === "settings" ? "rgba(255,255,255,0.12)" : "transparent",
                color: activeTab === "settings" ? "#fff" : "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.15s",
              }}
            >
              <QrCode size={15} />
              UPI & Settings
            </button>
          </div>

          {/* Quick Actions & Logout */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href="/"
              target="_blank"
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "Inter",
              }}
            >
              View site <ExternalLink size={13} />
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
                padding: "7px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* KPI Metrics Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {/* Revenue */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 8, fontFamily: "Inter" }}>
              <span>TOTAL REVENUE</span>
              <TrendingUp size={16} color="var(--accent)" />
            </div>
            <div style={{ fontFamily: "Space Grotesk", fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
              ₹{stats.totalRev.toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontFamily: "Inter" }}>
              From {orders.filter((o) => o.status !== "cancelled").length} active orders
            </div>
          </div>

          {/* Pending Verification */}
          <div
            style={{
              background: stats.pendingCount > 0 ? "rgba(234,179,8,0.04)" : "var(--surface)",
              border: stats.pendingCount > 0 ? "1px solid rgba(234,179,8,0.25)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: stats.pendingCount > 0 ? "#eab308" : "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 8, fontFamily: "Inter" }}>
              <span>PENDING VERIFICATION</span>
              <Clock size={16} />
            </div>
            <div style={{ fontFamily: "Space Grotesk", fontSize: 32, fontWeight: 900, color: stats.pendingCount > 0 ? "#eab308" : "#fff", letterSpacing: "-0.02em" }}>
              {stats.pendingCount}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontFamily: "Inter" }}>
              Awaiting UTR / bank confirmation
            </div>
          </div>

          {/* Confirmed Orders */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 8, fontFamily: "Inter" }}>
              <span>CONFIRMED / IN PRINTING</span>
              <CheckCircle2 size={16} color="var(--accent)" />
            </div>
            <div style={{ fontFamily: "Space Grotesk", fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
              {stats.confirmedCount}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontFamily: "Inter" }}>
              Payment verified, in production
            </div>
          </div>

          {/* Shipped & Delivered */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 8, fontFamily: "Inter" }}>
              <span>SHIPPED & DELIVERED</span>
              <Truck size={16} color="#4ade80" />
            </div>
            <div style={{ fontFamily: "Space Grotesk", fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
              {stats.shippedCount}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontFamily: "Inter" }}>
              Dispatched via express courier
            </div>
          </div>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div>
            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 20,
              }}
            >
              {/* Search & Status Filters */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, flex: 1 }}>
                <div style={{ position: "relative", minWidth: 260, maxWidth: 360, flex: 1 }}>
                  <Search
                    size={16}
                    color="rgba(255,255,255,0.3)"
                    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
                  />
                  <input
                    placeholder="Search Order ID, name, business, UTR..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      padding: "10px 14px 10px 38px",
                      color: "#fff",
                      fontSize: 13,
                      fontFamily: "Inter",
                      outline: "none",
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
                  {[
                    { id: "all", label: "All" },
                    { id: "verification", label: "Verification" },
                    { id: "confirmed", label: "Confirmed" },
                    { id: "shipped", label: "Shipped" },
                    { id: "delivered", label: "Delivered" },
                    { id: "cancelled", label: "Cancelled" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      style={{
                        background: statusFilter === tab.id ? "rgba(201,169,110,0.18)" : "rgba(255,255,255,0.03)",
                        border: statusFilter === tab.id ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.06)",
                        color: statusFilter === tab.id ? "var(--accent)" : "rgba(255,255,255,0.6)",
                        padding: "7px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "Space Grotesk",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={handleAddMockOrder}
                  className="btn-secondary"
                  style={{ fontSize: 13, padding: "9px 14px", display: "inline-flex", gap: 6, alignItems: "center" }}
                  title="Generate a sample new order for testing"
                >
                  <Plus size={15} /> Add Test Order
                </button>
                <button
                  onClick={exportOrdersToCSV}
                  className="btn-secondary"
                  style={{ fontSize: 13, padding: "9px 14px", display: "inline-flex", gap: 6, alignItems: "center" }}
                >
                  <Download size={15} /> Export CSV
                </button>
                <button
                  onClick={handleResetData}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                    padding: "9px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                  title="Reset to demo sample data"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13, fontFamily: "Inter" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>ORDER ID</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>CUSTOMER & BUSINESS</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>PACK & AMOUNT</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>UPI REF / UTR</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>STATUS</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1, textAlign: "right" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: "48px 24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                          No orders found matching your search and filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => {
                        const whatsappCustomerMsg = encodeURIComponent(
                          `Hi ${o.customerName}, regarding your NFC review cards order (${o.id}) for ${o.businessName}: your order status is ${o.status.toUpperCase()}.`
                        );
                        return (
                          <tr
                            key={o.id}
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,0.05)",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            {/* Order ID & Date */}
                            <td style={{ padding: "16px 18px" }}>
                              <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, color: "var(--accent)", letterSpacing: 0.5 }}>
                                {o.id}
                              </div>
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                                {new Date(o.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </td>

                            {/* Customer & Business */}
                            <td style={{ padding: "16px 18px" }}>
                              <div style={{ fontWeight: 600, color: "#fff" }}>{o.customerName}</div>
                              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                                {o.businessName}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{o.city}</span>
                                <a
                                  href={`https://wa.me/91${o.phone.replace(/\D/g, "")}?text=${whatsappCustomerMsg}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 3,
                                    fontSize: 11,
                                    color: "#25D366",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                  }}
                                  title="Chat with customer on WhatsApp"
                                >
                                  <MessageCircle size={11} /> {o.phone}
                                </a>
                              </div>
                            </td>

                            {/* Pack & Amount */}
                            <td style={{ padding: "16px 18px" }}>
                              <div style={{ fontWeight: 600, color: "#fff" }}>{o.packName}</div>
                              <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 2, fontWeight: 700, fontFamily: "Space Grotesk" }}>
                                ₹{o.amount.toLocaleString("en-IN")}
                              </div>
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{o.cardsCount} cards</div>
                            </td>

                            {/* UTR */}
                            <td style={{ padding: "16px 18px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontFamily: "Space Grotesk", fontSize: 13, color: "#fff", letterSpacing: 0.5 }}>
                                  {o.utr || "—"}
                                </span>
                                {o.utr && (
                                  <button
                                    onClick={() => copyText(o.utr, o.id)}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: copiedUtr === o.id ? "#4ade80" : "rgba(255,255,255,0.35)",
                                      cursor: "pointer",
                                      padding: 2,
                                    }}
                                    title="Copy UTR reference"
                                  >
                                    {copiedUtr === o.id ? <Check size={13} /> : <Copy size={13} />}
                                  </button>
                                )}
                              </div>
                            </td>

                            {/* Status Selector */}
                            <td style={{ padding: "16px 18px" }}>
                              <select
                                value={o.status}
                                onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                                style={{
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.12)",
                                  borderRadius: 8,
                                  color: STATUS_CONFIG[o.status]?.color || "#fff",
                                  padding: "6px 10px",
                                  fontSize: 12,
                                  fontWeight: 600,
                                  fontFamily: "Space Grotesk",
                                  outline: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <option value="verification">Verification</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td style={{ padding: "16px 18px", textAlign: "right" }}>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                <button
                                  onClick={() => {
                                    setSelectedOrder(o);
                                    setEditingNotes(o.notes || "");
                                  }}
                                  style={{
                                    background: "rgba(201,169,110,0.1)",
                                    border: "1px solid rgba(201,169,110,0.25)",
                                    color: "var(--accent)",
                                    padding: "6px 10px",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                  }}
                                  title="View full delivery & order details"
                                >
                                  <Eye size={13} /> Details
                                </button>
                                <button
                                  onClick={() => handleDelete(o.id)}
                                  style={{
                                    background: "rgba(239,68,68,0.08)",
                                    border: "1px solid rgba(239,68,68,0.2)",
                                    color: "#f87171",
                                    padding: "6px 8px",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                  }}
                                  title="Delete order"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: "Space Grotesk", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                Custom Pack Inquiries & Leads
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                Leads captured from the website contact and custom card quantity form.
              </p>
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13, fontFamily: "Inter" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>ENQUIRY ID</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>LEAD / BUSINESS</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>INTERESTED PACK</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>MESSAGE / REQUIREMENT</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>STATUS</th>
                      <th style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 11, letterSpacing: 1, textAlign: "right" }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: "48px 24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                          No enquiries yet. Leads submitted through the enquiry modal will appear here.
                        </td>
                      </tr>
                    ) : (
                      enquiries.map((enq) => {
                        const whatsappLeadMsg = encodeURIComponent(
                          `Hi ${enq.name}, thanks for reaching out regarding NFC Review Cards for ${enq.businessName}. We received your enquiry for ${enq.packName}.`
                        );
                        return (
                          <tr key={enq.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <td style={{ padding: "16px 18px", fontFamily: "Space Grotesk", fontWeight: 700, color: "var(--accent)" }}>
                              {enq.id}
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 400, marginTop: 2 }}>
                                {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </div>
                            </td>
                            <td style={{ padding: "16px 18px" }}>
                              <div style={{ fontWeight: 600, color: "#fff" }}>{enq.name}</div>
                              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{enq.businessName}</div>
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{enq.city} · {enq.phone}</div>
                            </td>
                            <td style={{ padding: "16px 18px", fontWeight: 600, color: "#fff" }}>
                              {enq.packName}
                            </td>
                            <td style={{ padding: "16px 18px", color: "rgba(255,255,255,0.7)", maxWidth: 280 }}>
                              {enq.message || "—"}
                            </td>
                            <td style={{ padding: "16px 18px" }}>
                              <select
                                value={enq.status}
                                onChange={(e) => handleEnquiryStatus(enq.id, e.target.value as Enquiry["status"])}
                                style={{
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: 8,
                                  color: enq.status === "new" ? "#eab308" : enq.status === "converted" ? "#4ade80" : "#fff",
                                  padding: "6px 10px",
                                  fontSize: 12,
                                  fontWeight: 600,
                                  outline: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="converted">Converted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td style={{ padding: "16px 18px", textAlign: "right" }}>
                              <a
                                href={`https://wa.me/91${enq.phone.replace(/\D/g, "")}?text=${whatsappLeadMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  background: "#25D366",
                                  color: "#fff",
                                  padding: "6px 12px",
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  textDecoration: "none",
                                }}
                              >
                                <MessageCircle size={13} /> Chat WhatsApp
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UPI & SETTINGS */}
        {activeTab === "settings" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {/* Payment Configuration */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "28px",
              }}
            >
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: 18, fontWeight: 700, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <QrCode size={18} color="var(--accent)" /> Active UPI Configuration
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 4 }}>UPI VPA ID</div>
                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Space Grotesk", fontSize: 15, fontWeight: 700, color: "var(--accent)" }}>
                    {UPI_ID}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 4 }}>PAYEE NAME (REGISTERED)</div>
                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Inter", fontSize: 14, color: "#fff" }}>
                    {UPI_PAYEE_NAME}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 4 }}>SUPPORT WHATSAPP NUMBER</div>
                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Inter", fontSize: 14, color: "#fff" }}>
                    +{WHATSAPP_NUMBER}
                  </div>
                </div>

                <div style={{ paddingTop: 8 }}>
                  <Link
                    href="/order"
                    target="_blank"
                    className="btn-primary"
                    style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", width: "100%", fontSize: 13 }}
                  >
                    Test Customer Checkout Flow →
                  </Link>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "28px",
              }}
            >
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: 18, fontWeight: 700, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck size={18} color="var(--accent)" /> Active Review Card Packs
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PACKS.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      padding: "14px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{p.quantity} NFC Cards</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "Space Grotesk", fontWeight: 800, color: "var(--accent)", fontSize: 16 }}>
                        {p.price}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Includes pan-India courier</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Order Details Slide-over / Modal ─────────────────── */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              height: "100%",
              background: "#111113",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              padding: "32px 28px",
              overflowY: "auto",
              boxShadow: "-12px 0 40px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, fontFamily: "Inter" }}>
                  ORDER DETAILS
                </span>
                <h2 style={{ fontFamily: "Space Grotesk", fontSize: 24, fontWeight: 800, color: "var(--accent)", marginTop: 2 }}>
                  {selectedOrder.id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  padding: 8,
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Status Changer in Modal */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "16px 18px",
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 8 }}>
                CURRENT ORDER STATUS
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <StatusPill status={selectedOrder.status} />
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    color: "#fff",
                    padding: "8px 10px",
                    fontSize: 13,
                    fontFamily: "Space Grotesk",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="verification">Verification</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer & Business Info */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 12 }}>
                CUSTOMER & BUSINESS
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <User size={16} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Customer Name</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{selectedOrder.customerName}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Building size={16} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Business Name</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{selectedOrder.businessName}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Phone size={16} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Phone Number</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>+91 {selectedOrder.phone}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <MapPin size={16} color="var(--accent)" style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Delivery Address</div>
                    <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.5 }}>
                      {selectedOrder.address}, {selectedOrder.city} — {selectedOrder.pincode}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Pack Breakdown */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 12 }}>
                PAYMENT & PACK
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Pack:</span>
                  <span style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{selectedOrder.packName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Cards Count:</span>
                  <span style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{selectedOrder.cardsCount} NFC Cards</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Total Amount:</span>
                  <span style={{ fontWeight: 800, color: "var(--accent)", fontFamily: "Space Grotesk", fontSize: 16 }}>
                    ₹{selectedOrder.amount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Submitted UTR:</span>
                  <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>
                    {selectedOrder.utr}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Notes & Courier Tracking ID */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 8 }}>
                TRACKING NOTES / COURIER AWB (VISIBLE TO CUSTOMER ON TRACKING PAGE)
              </div>
              <textarea
                rows={3}
                placeholder="e.g. Dispatched via BlueDart AWB: BD82910283IN"
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "Inter",
                  outline: "none",
                  resize: "vertical",
                  marginBottom: 8,
                }}
              />
              <button
                onClick={handleSaveNotes}
                className="btn-secondary"
                style={{ fontSize: 12, padding: "7px 14px", display: "inline-flex", gap: 6, alignItems: "center" }}
              >
                <Save size={13} /> Save Tracking Notes
              </button>
            </div>

            {/* WhatsApp Quick Link */}
            <div>
              <a
                href={`https://wa.me/91${selectedOrder.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Hi ${selectedOrder.customerName}, regarding your NFC review cards order (${selectedOrder.id}): your status has been updated to ${selectedOrder.status.toUpperCase()}. ${editingNotes || ""}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#fff",
                  padding: "14px 20px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                <MessageCircle size={17} /> Notify Customer on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        select option {
          background: #18181b;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
