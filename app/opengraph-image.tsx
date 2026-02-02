import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background:
            "radial-gradient(900px circle at 15% 0%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(900px circle at 95% 20%, rgba(34,197,94,0.25), transparent 60%), radial-gradient(900px circle at 60% 110%, rgba(14,165,233,0.22), transparent 60%), #0b0b0b",
          color: "white",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          />
          <div style={{ fontSize: 20, opacity: 0.9 }}>
            awaisali-portfolio.vercel.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: -1 }}>
            Awais Ali
          </div>
          <div style={{ fontSize: 34, opacity: 0.92 }}>
            Senior Software Engineer
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            {["Remote-first", "React", "TypeScript", "Next.js"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 18,
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 18, opacity: 0.85 }}>
          Islamabad, Pakistan • Open to remote opportunities
        </div>
      </div>
    ),
    { ...size },
  );
}

