"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Pause, Maximize2, ExternalLink, ShieldCheck, Truck, Sparkles, X } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  tag: string;
  src: string;
  desc: string;
}

const PHOTOS: MediaItem[] = [
  {
    id: "photo-1",
    title: "Eco-Secure Box Packaging",
    tag: "DISPATCH READY",
    src: "/media/raw-product-1.png",
    desc: "Every batch is sealed in protective sleeves and boxed securely to ensure zero transit damage across all pin codes in India.",
  },
  {
    id: "photo-2",
    title: "Handheld Build & Finish",
    tag: "PREMIUM PVC",
    src: "/media/raw-product-2.png",
    desc: "Rigid, waterproof PVC cards with precision embedded NTAG chips and vibrant high-contrast Google review artwork.",
  },
  {
    id: "photo-3",
    title: "Front Face Close-Up",
    tag: "TAP TO REVIEW",
    src: "/media/raw-product-3.png",
    desc: "Clear visual cues with the universal NFC wave icon, 5 golden stars, and iconic Google G symbol so customers know instantly what to do.",
  },
];

export default function ProductShowcaseSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section
      id="showcase"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(18,18,18,0.8) 50%, rgba(8,8,8,0) 100%)",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(201,169,110,0.1)",
              border: "1px solid rgba(201,169,110,0.25)",
              borderRadius: 99,
              padding: "6px 16px",
              marginBottom: 20,
            }}
          >
            <Sparkles size={14} color="var(--accent, #c9a96e)" />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--accent, #c9a96e)",
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: 1,
              }}
            >
              100% AUTHENTIC WORK · ZERO MOCKUPS
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(30px, 4.5vw, 54px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            SEE OUR CARDS & PRODUCTION <br />
            <span className="gradient-text">IN REAL LIFE</span>
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(15px, 1.8vw, 17px)",
              fontFamily: "Inter, sans-serif",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Real raw unedited photos and packaging footage straight from our workshop. Touch, durability, and instant NFC response you can rely on.
          </p>
        </div>

        {/* Video Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {/* Video 1: Packing & Shipping */}
          <div
            style={{
              background: "var(--surface, #121212)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    boxShadow: "0 0 10px #22c55e",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#fff",
                  }}
                >
                  How We Pack & Ship
                </span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  color: "var(--accent, #c9a96e)",
                  background: "rgba(201,169,110,0.12)",
                  padding: "4px 10px",
                  borderRadius: 6,
                  letterSpacing: 0.5,
                }}
              >
                LIVE FULFILLMENT
              </span>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "9/16",
                maxHeight: 520,
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <video
                src="/media/pack-and-ship.mp4"
                controls
                playsInline
                autoPlay
                muted
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div style={{ padding: "18px 20px" }}>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Each card order is verified, programmed, sealed, and packed with bubble wrap and sturdy outer boxes before being handed to express courier partners.
              </p>
            </div>
          </div>

          {/* Video 2: Project Demo (Instagram Reel) */}
          <div
            style={{
              background: "var(--surface, #121212)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#e1306c",
                    display: "inline-block",
                    boxShadow: "0 0 10px #e1306c",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#fff",
                  }}
                >
                  Project Showcase & Demo
                </span>
              </div>
              <a
                href="https://www.instagram.com/reel/DdLnsR8zcgP/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent, #c9a96e)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
              >
                <span>Instagram Reel</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: 520,
                background: "#050505",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                src="https://www.instagram.com/reel/DdLnsR8zcgP/embed"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  overflow: "hidden",
                }}
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
                title="Instagram Project Showcase Reel"
              />
            </div>

            <div style={{ padding: "18px 20px" }}>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Watch real in-person customer taps and fast phone redirects in everyday retail settings. Immediate, frictionless Google Reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Product Photo Gallery */}
        <div style={{ marginTop: 60 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h3
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 6px",
                }}
              >
                Raw Product Photos
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.45)",
                  margin: 0,
                }}
              >
                Click any photo to inspect close-up card material, box packaging, and print sharpness.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12,
                  fontFamily: "Space Grotesk",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <ShieldCheck size={14} color="var(--accent, #c9a96e)" />
                <span>NTAG215 Embedded</span>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12,
                  fontFamily: "Space Grotesk",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Truck size={14} color="var(--accent, #c9a96e)" />
                <span>Express Boxed</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  background: "var(--surface, #141414)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 260,
                    background: "#0a0a0a",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(0,0,0,0.65)",
                      backdropFilter: "blur(6px)",
                      borderRadius: 99,
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "Space Grotesk",
                      color: "#fff",
                    }}
                  >
                    <Maximize2 size={12} />
                    <span>Zoom</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      background: "rgba(201,169,110,0.9)",
                      borderRadius: 6,
                      padding: "3px 8px",
                      fontSize: 10,
                      fontWeight: 800,
                      fontFamily: "Space Grotesk",
                      color: "#000",
                      letterSpacing: 0.5,
                    }}
                  >
                    {photo.tag}
                  </div>
                </div>

                <div style={{ padding: "18px 20px" }}>
                  <h4
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 6px",
                    }}
                  >
                    {photo.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {photo.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: 720,
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              background: "var(--surface, #141414)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            {/* Header bar */}
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    color: "var(--accent, #c9a96e)",
                    letterSpacing: 1,
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {selectedPhoto.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
                aria-label="Close image modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image viewer */}
            <div
              style={{
                background: "#080808",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "65vh",
                overflow: "hidden",
              }}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "65vh",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Footer caption */}
            <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.02)" }}>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {selectedPhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
