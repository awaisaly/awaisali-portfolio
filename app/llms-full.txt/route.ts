export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net';

  const text = [
    '# Awais Ali — Portfolio (LLM context)',
    '',
    `Canonical: ${siteUrl}/`,
    `Resume (PDF): ${siteUrl}/CV-Awais-Ali.pdf`,
    'Email: awaisaly93@gmail.com',
    'LinkedIn: https://www.linkedin.com/in/awaisaly',
    'GitHub: https://github.com/awaisaly',
    '',
    '## Short bio',
    'Senior Software Engineer with 10+ years of experience building scalable web applications, API-driven platforms, POS/payment systems, and AI-powered developer and knowledge tools.',
    'Remote-first; experienced with distributed teams, async collaboration, and end-to-end feature ownership across UI, APIs, integrations, and data flows.',
    '',
    '## Current role',
    '- Creator — Knowvio (Mar 2026 – Present)',
    '- Built and launched a GenAI knowledge workspace for connected sources, citation-backed chat, and semantic recall',
    '- Product focus: context-first workflows, visual board UX, grounded outputs, and reusable knowledge workflows',
    '',
    '## Expertise',
    '- Frontend: React, TypeScript, Next.js, Redux, Hooks, Context API',
    '- Backend/API: Node.js, REST APIs, Python Flask, ASP.NET working knowledge',
    '- Data: PostgreSQL, MongoDB, MySQL, SQL Server, API-backed reporting/admin workflows',
    '- GenAI: grounded knowledge products, citation-backed answers, semantic recall, AI developer tools, agent workflows',
    '- Architecture: maintainable component systems, API contracts, predictable state, clean patterns at scale',
    '- Performance & UX: smooth interactions, profiling, iterative refinement',
    '- Payments/POS: Stripe, Adyen; complex ordering flows and split payments',
    '- Security UX: ZTNA, auth flows, production hardening',
    '',
    '## Experience (high level)',
    '- Knowvio (Mar 2026 – Present): creator role; product direction + AI UX + full-stack execution for a GenAI knowledge workspace',
    '- Next Order (Feb 2022 – Present): customer ordering platforms + POS systems; payments; API-driven admin tooling',
    '- Emumba (Jan 2020 – Feb 2022): ZTNA (Web + Electron), Polarr (20M+ users), enterprise ETL/data tooling',
    '- Incline AI (Jun 2018 – Jan 2020): full-stack surveillance/ERP/LMS/drone-management platforms',
    '- Burqstream (Apr 2017 – May 2018): desktop/web tools; reporting portals',
    '',
    '## Projects (selected)',
    '- Knowvio — GenAI context-first knowledge workspace; linked sources, grounded answers, and recall',
    `  Link: https://knowvio.awaisali.net/`,
    '- Restaurant Ordering & POS Systems — React/TypeScript; Stripe/Adyen; kiosks; reporting/admin',
    '- Polarr Photo Editor — React/Redux/WebGL basics; UI component work + performance',
    '- ZTNA Security Application — React/TypeScript; security-focused UX; web + desktop',
    '- Data Workbench for Aera Technologies — ETL + analytics UI; multi-source extraction',
    `  Link: https://www.aeratechnology.com/data-workbench/`,
    '- I-Resource Management System — HR/Finance modules; leave management; REST APIs (.NET) + PostgreSQL',
    '- Surveillance System (IAI) — monitoring/attendance; Flask APIs + MongoDB',
    '- Drone Configurator — autonomous drone configuration + controls; Flask APIs + MongoDB',
    '- ERP for Recruitment — end-to-end recruitment lifecycle; Flask APIs + PostgreSQL',
    '- IntelliSky Studio — C# WPF desktop indices/imagery tooling',
    '- VASI Web Portal — PHP (CodeIgniter) reporting portal; JS/jQuery',
    '- Reports Tool — Crystal Reports management utility; WinForms + SQL',
    '- Maintenance Reminder System — service reminders; SAP DI API integration; WinForms',
    '',
    '## Open source',
    '- Explain My Error (AI debugging CLI with practical fix plans): https://github.com/awaisaly/explain-my-error',
    '  npm: https://www.npmjs.com/package/explain-my-error',
    '- Mini Coding Agent (AI coding-agent CLI implementing Agent Skills): https://github.com/awaisaly/mini-coding-agent',
    '- lumidot contribution: upgraded from fixed 3×3 to configurable x×y dot-grid animations',
    '  Repo: https://github.com/awaisaly/lumidot',
    '',
  ].join('\n');

  return new Response(text, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control':
        'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
