import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 72,
          backgroundColor: "#0b0b0b",
          backgroundImage:
            "radial-gradient(900px circle at 10% 0%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(900px circle at 100% 40%, rgba(14,165,233,0.22), transparent 60%)",
          color: "white",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>
            Awais Ali
          </div>
          <div style={{ fontSize: 32, opacity: 0.92 }}>
            Senior Software Engineer • Remote-first
          </div>
          <div style={{ fontSize: 20, opacity: 0.85 }}>
            React • TypeScript • Next.js • POS & Payments (Stripe, Adyen)
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

