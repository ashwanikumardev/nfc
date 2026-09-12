"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/9625");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#080808",
        color: "#fff",
        fontFamily: "Space Grotesk, sans-serif",
        gap: 16,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700 }}>Redirecting to secure admin panel...</div>
      <a
        href="/9625"
        style={{
          color: "var(--accent, #c9a96e)",
          fontSize: 14,
          textDecoration: "underline",
        }}
      >
        Click here if not redirected automatically
      </a>
    </div>
  );
}
