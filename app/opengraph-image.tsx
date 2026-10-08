import { ImageResponse } from "next/og";
import { RING_CENTER, RING_SEGMENTS, segmentDash } from "@/lib/geometry";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#050505", color: "#fff", position: "relative", padding: 72, flexDirection: "column", justifyContent: "space-between" }}>
        <svg width="760" height="760" viewBox="0 0 200 200" style={{ position: "absolute", right: -170, top: -70 }}>
          {RING_SEGMENTS.map((seg, i) => (
            <path key={i} d={RING_CENTER} pathLength={100} fill="none" strokeWidth={22} stroke={seg.kind === "block" ? "#FFFFFF" : "#AEC4E2"} strokeOpacity={seg.kind === "block" ? 0.9 : 0.8} {...segmentDash(seg)} />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 40, fontWeight: 800, lineHeight: 1 }}>
          <span>Apple</span>
          <span style={{ fontSize: 26, fontWeight: 500, marginTop: 6 }}>Infotech</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4, textTransform: "uppercase" }}>
          <span>We build</span>
          <span>technology</span>
          <span style={{ color: "#AEC4E2" }}>that moves</span>
          <span>business.</span>
        </div>
        <div style={{ fontSize: 26, color: "#AEC4E2", letterSpacing: 6, textTransform: "uppercase" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
