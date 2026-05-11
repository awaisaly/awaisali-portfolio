import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 72,
        backgroundColor: '#0b0b0b',
        color: 'white',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 70,
          right: 70,
          height: 2,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.22)',
        }}
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
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
          React • Node.js • Next.js • GenAI • POS & Payments
        </div>
      </div>
    </div>,
    { ...size }
  );
}
