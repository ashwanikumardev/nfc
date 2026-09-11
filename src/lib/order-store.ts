// Order and Enquiry storage utility backed by browser localStorage

export type OrderStatus =
  | "verification"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  businessName: string;
  packId: string;
  packName: string;
  cardsCount: number;
  amount: number;
  pincode: string;
  city: string;
  address: string;
  utr: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  city: string;
  message: string;
  packName: string;
  status: "new" | "contacted" | "converted" | "closed";
  createdAt: string;
}

const ORDERS_STORAGE_KEY = "npc_orders_v1";
const ENQUIRIES_STORAGE_KEY = "npc_enquiries_v1";

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: "NFC-748921",
    customerName: "Rajesh Sharma",
    phone: "9876543210",
    businessName: "Royal Spice Restaurant & Cafe",
    packId: "business",
    packName: "Business Pack",
    cardsCount: 5,
    amount: 5000,
    pincode: "110001",
    city: "New Delhi",
    address: "Shop 14, Connaught Place, Inner Circle",
    utr: "428391028392",
    status: "verification",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    notes: "Customer confirmed payment via PhonePe. Needs card logo on front.",
  },
  {
    id: "NFC-619284",
    customerName: "Pooja Verma",
    phone: "9811223344",
    businessName: "Glamour Unisex Salon",
    packId: "starter",
    packName: "Starter Pack",
    cardsCount: 2,
    amount: 2500,
    pincode: "400050",
    city: "Mumbai",
    address: "Bandra West, Hill Road, Opposite Marks & Spencer",
    utr: "419382019485",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    notes: "Payment verified against bank statement. In printing queue.",
  },
  {
    id: "NFC-528401",
    customerName: "Vikram Malhotra",
    phone: "9920192837",
    businessName: "DentCare Multispeciality Clinic",
    packId: "bulk",
    packName: "Bulk / Agency Pack",
    cardsCount: 15,
    amount: 12500,
    pincode: "560034",
    city: "Bengaluru",
    address: "3rd Floor, Koramangala 4th Block, 80 Feet Road",
    utr: "409281746281",
    status: "shipped",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    notes: "Shipped via BlueDart Tracking: BD982736192IN",
  },
  {
    id: "NFC-394821",
    customerName: "Amitabh Sen",
    phone: "9830495821",
    businessName: "Heritage Sweet House",
    packId: "business",
    packName: "Business Pack",
    cardsCount: 5,
    amount: 5000,
    pincode: "700016",
    city: "Kolkata",
    address: "Park Street, Near Flurys Bakery",
    utr: "392018274910",
    status: "delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    notes: "Delivered. Customer confirmed cards work with Google Maps link.",
  },
  {
    id: "NFC-204918",
    customerName: "Siddharth Rao",
    phone: "9741029384",
    businessName: "FitZone Crossfit Studio",
    packId: "starter",
    packName: "Starter Pack",
    cardsCount: 2,
    amount: 2500,
    pincode: "500081",
    city: "Hyderabad",
    address: "Hitech City, Madhapur Main Road",
    utr: "419827364512",
    status: "verification",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

const INITIAL_DEMO_ENQUIRIES: Enquiry[] = [
  {
    id: "ENQ-101",
    name: "Dr. Ananya Desai",
    phone: "9820394851",
    businessName: "Skin & Smile Clinic Chain (4 branches)",
    city: "Ahmedabad",
    message: "Need 25 cards across 4 clinic branches with custom clinic branding.",
    packName: "Bulk / Agency Pack",
    status: "new",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "ENQ-102",
    name: "Karan Johar Group (Rohit)",
    phone: "9819283746",
    businessName: "Cloud Kitchens Collective",
    city: "Pune",
    message: "Can we get cards with QR on back side and NFC tap on front?",
    packName: "Business Pack",
    status: "contacted",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

/* ─── Orders API ─────────────────────────────────────────── */

export function getOrders(): Order[] {
  if (typeof window === "undefined") return INITIAL_DEMO_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      return INITIAL_DEMO_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_ORDERS;
  } catch (err) {
    console.error("Failed to load orders from localStorage", err);
    return INITIAL_DEMO_ORDERS;
  }
}

export function getOrderById(id: string): Order | null {
  const orders = getOrders();
  const cleanId = id.trim().toUpperCase();
  return (
    orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.id.replace("NFC-", "").toUpperCase() === cleanId
    ) || null
  );
}

export function saveOrder(orderData: Omit<Order, "createdAt" | "updatedAt">): Order {
  const now = new Date().toISOString();
  const newOrder: Order = {
    ...orderData,
    createdAt: now,
    updatedAt: now,
  };

  if (typeof window !== "undefined") {
    try {
      const orders = getOrders();
      // If already exists, update it, otherwise prepend
      const existingIndex = orders.findIndex((o) => o.id === newOrder.id);
      let updated: Order[];
      if (existingIndex >= 0) {
        updated = [...orders];
        updated[existingIndex] = { ...orders[existingIndex], ...newOrder, updatedAt: now };
      } else {
        updated = [newOrder, ...orders];
      }
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save order", err);
    }
  }

  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  notes?: string
): Order | null {
  if (typeof window === "undefined") return null;
  try {
    const orders = getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const updatedOrder: Order = {
      ...orders[index],
      status: newStatus,
      updatedAt: new Date().toISOString(),
      ...(notes !== undefined ? { notes } : {}),
    };

    orders[index] = updatedOrder;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return updatedOrder;
  } catch (err) {
    console.error("Failed to update order status", err);
    return null;
  }
}

export function deleteOrder(orderId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const orders = getOrders();
    const filtered = orders.filter((o) => o.id !== orderId);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error("Failed to delete order", err);
    return false;
  }
}

export function resetToDemoData(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
  localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ENQUIRIES));
}

/* ─── Enquiries API ──────────────────────────────────────── */

export function getEnquiries(): Enquiry[] {
  if (typeof window === "undefined") return INITIAL_DEMO_ENQUIRIES;
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ENQUIRIES));
      return INITIAL_DEMO_ENQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_ENQUIRIES;
  } catch (err) {
    console.error("Failed to load enquiries", err);
    return INITIAL_DEMO_ENQUIRIES;
  }
}

export function saveEnquiry(
  enquiryData: Omit<Enquiry, "id" | "createdAt" | "status">
): Enquiry {
  const id = "ENQ-" + Math.floor(100 + Math.random() * 900);
  const newEnq: Enquiry = {
    ...enquiryData,
    id,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const enquiries = getEnquiries();
      const updated = [newEnq, ...enquiries];
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save enquiry", err);
    }
  }

  return newEnq;
}

export function updateEnquiryStatus(
  enquiryId: string,
  status: Enquiry["status"]
): boolean {
  if (typeof window === "undefined") return false;
  try {
    const list = getEnquiries();
    const idx = list.findIndex((e) => e.id === enquiryId);
    if (idx === -1) return false;
    list[idx].status = status;
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (err) {
    console.error("Failed to update enquiry status", err);
    return false;
  }
}

/* ─── Export CSV Helper ──────────────────────────────────── */

export function exportOrdersToCSV(): void {
  const orders = getOrders();
  if (orders.length === 0) {
    alert("No orders to export.");
    return;
  }

  const headers = [
    "Order ID",
    "Customer Name",
    "Phone",
    "Business Name",
    "Pack",
    "Cards",
    "Amount (INR)",
    "Status",
    "UTR Reference",
    "City",
    "PIN Code",
    "Address",
    "Notes",
    "Created Date",
  ];

  const escapeCSV = (str: string | number | undefined) => {
    if (str === undefined || str === null) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = orders.map((o) => [
    escapeCSV(o.id),
    escapeCSV(o.customerName),
    escapeCSV(o.phone),
    escapeCSV(o.businessName),
    escapeCSV(o.packName),
    escapeCSV(o.cardsCount),
    escapeCSV(o.amount),
    escapeCSV(o.status),
    escapeCSV(o.utr),
    escapeCSV(o.city),
    escapeCSV(o.pincode),
    escapeCSV(o.address),
    escapeCSV(o.notes || ""),
    escapeCSV(new Date(o.createdAt).toLocaleString("en-IN")),
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `nfc_orders_${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
