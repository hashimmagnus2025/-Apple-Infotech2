import { ImageResponse } from "next/og";
import { RING_INNER, RING_OUTER } from "@/lib/geometry";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF", color: "#050505", position: "relative", padding: 72, flexDirection: "column", justifyContent: "space-between" }}>
        <svg width="520" height="520" viewBox="0 0 200 200" style={{ position: "absolute", right: -40, top: 40 }}>
          <path d={RING_OUTER} fill="#B9C6D8" />
          <path d={RING_INNER} fill="#FFFFFF" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 38, fontWeight: 700, lineHeight: 1 }}>
          <span>Apple</span>
          <span style={{ fontSize: 24, fontWeight: 500, marginTop: 6 }}>Infotech</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 132, fontWeight: 700, lineHeight: 0.9, letterSpacing: -6, textTransform: "uppercase" }}>
          <span>We ensure</span>
          <span style={{ color: "#71839A" }}>better ROI.</span>
        </div>
        <div style={{ fontSize: 24, color: "#4E6078", letterSpacing: 5, textTransform: "uppercase" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
