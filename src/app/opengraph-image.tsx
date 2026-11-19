import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";

export const dynamic = "force-static";

export const alt = `${personal.name} — ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 60% at 15% 0%, #d6e6fb, #eef4fb 70%)",
          color: "#0D1B2E",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg,#3B82F6,#22D3EE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {personal.initials}
          </div>
          <div style={{ fontSize: 24, color: "#475569" }}>{personal.identity}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, textTransform: "uppercase" }}>{personal.name}</div>
          <div style={{ fontSize: 38, marginTop: 12, color: "#2563EB" }}>{personal.hero.headline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#475569" }}>
          {personal.tagline}
        </div>
      </div>
    ),
    size,
  );
}
