import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <img
          src={`${siteUrl}/Awais-Ali.png`}
          alt='Awais Ali'
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.14)',
            objectFit: 'cover',
            backgroundColor: 'rgba(255,255,255,0.07)',
          }}
        />
        <div style={{ fontSize: 20, opacity: 0.9 }}>awaisali.net</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: -1 }}>
          Awais Ali
        </div>
        <div style={{ fontSize: 34, opacity: 0.92 }}>
          Senior Software Engineer
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 8,
          }}
        >
          {['Remote-first', 'React', 'TypeScript', 'Next.js', 'Node.js'].map(
            (t) => (
              <div
                key={t}
                style={{
                  fontSize: 18,
                  padding: '10px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: 'rgba(255,255,255,0.08)',
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>

      <div style={{ fontSize: 18, opacity: 0.85 }}>
        Islamabad, Pakistan • Open to remote opportunities
      </div>
    </div>,
    { ...size }
  );
}
