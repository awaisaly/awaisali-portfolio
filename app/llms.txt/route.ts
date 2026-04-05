export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net';

  const text = [
    '# Awais Ali — Senior Software Engineer (Remote-first)',
    '',
    `Website: ${siteUrl}/`,
    'Location: Islamabad, Pakistan (open to remote opportunities)',
    'Email: awaisaly93@gmail.com',
    'LinkedIn: https://www.linkedin.com/in/awaisaly',
    'GitHub: https://github.com/awaisaly',
    `Resume (PDF): ${siteUrl}/CV-Awais-Ali.pdf`,
    '',
    '## Summary',
    'Senior Software Engineer with 8+ years of experience building scalable web applications.',
    'Remote-first with extensive experience collaborating with distributed teams across time zones.',
    'Experienced working in a full stack role, including Node.js backend work.',
    '',
    '## Core skills',
    '- React, TypeScript, Next.js, Redux, Node.js',
    '- UI architecture, performance, accessibility',
    '- Payments & POS: Stripe, Adyen',
    '- APIs & data: REST, PostgreSQL, MongoDB, SQL Server/MySQL',
    '',
    '## Selected work (high-level)',
    '- Restaurant Ordering & POS Systems — payments, POS flows, admin/reporting',
    '- Polarr Photo Editor — UI components + performance at scale',
    '- ZTNA Security Application — security-focused UX (Web + Electron)',
    `- Data Workbench (Aera Technology): ${'https://www.aeratechnology.com/data-workbench/'}`,
    '',
    '## Open source',
    '- Mini Coding Agent — https://github.com/awaisaly/mini-coding-agent',
    '- lumidot contribution (x×y dot-grid support) — https://github.com/awaisaly/lumidot',
    '',
    '## Preferred roles',
    '- Senior Software Engineer / Senior Frontend Engineer',
    '- Remote-first / distributed teams',
    '',
  ].join('\n');

  return new Response(text, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      // Cache in CDNs; keep reasonably fresh.
      'cache-control':
        'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
