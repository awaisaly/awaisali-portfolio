export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net';

  const text = [
    '# Awais Ali — Senior Full Stack & GenAI Developer',
    '',
    `Website: ${siteUrl}/`,
    'Location: Islamabad, Pakistan',
    'Email: awaisaly93@gmail.com',
    'LinkedIn: https://www.linkedin.com/in/awaisaly',
    'GitHub: https://github.com/awaisaly',
    `Resume (PDF): ${siteUrl}/CV-Awais-Ali.pdf`,
    '',
    '## Summary',
    'Senior Software Engineer with 10+ years of experience building scalable web applications, API-driven platforms, POS/payment systems, and AI-powered developer and knowledge tools.',
    'Experienced collaborating with distributed teams across time zones and owning features end-to-end.',
    'Practical GenAI experience through Knowvio, Explain My Error, and Mini Coding Agent.',
    '',
    '## Current role',
    '- Software Engineer at HATO (Jul 2026 – Present): HLM Pro Electron application, real-time customer dashboard, and GIS-powered internal dashboards for intelligent lighting management',
    '- Creator at Knowvio (Mar 2026 – Present): GenAI knowledge workspace for citation-backed answers and semantic recall',
    '',
    '## Core skills',
    '- React, TypeScript, Next.js, Redux, Node.js',
    '- Full-stack product engineering: APIs, data flows, admin tools, integrations',
    '- GenAI: grounded answers, semantic recall, AI developer tools, agent workflows',
    '- Architecture, performance, accessibility',
    '- Payments & POS: Stripe, Adyen',
    '- APIs & data: REST, PostgreSQL, MongoDB, SQL Server/MySQL',
    '',
    '## Selected work (high-level)',
    '- HATO — HLM Pro intelligent lighting management, real-time monitoring dashboard, and GIS-powered sales/support dashboards',
    '- Knowvio — GenAI knowledge workspace for connected sources, grounded chat, and reusable insights',
    '- Restaurant Ordering & POS Systems — payments, POS flows, admin/reporting',
    '- Polarr Photo Editor — UI components + performance at scale',
    '- ZTNA Security Application — security-focused UX (Web + Electron)',
    `- Data Workbench (Aera Technology): ${'https://www.aeratechnology.com/data-workbench/'}`,
    '',
    '## Open source',
    '- Explain My Error — https://github.com/awaisaly/explain-my-error',
    '- Mini Coding Agent — https://github.com/awaisaly/mini-coding-agent',
    '- lumidot contribution (x×y dot-grid support) — https://github.com/awaisaly/lumidot',
    '',
    '## Preferred roles',
    '- Senior Full Stack Developer / Senior Software Engineer / GenAI Developer',
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
