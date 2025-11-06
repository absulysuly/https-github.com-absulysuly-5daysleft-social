const teamMembers = [
  {
    name: "Hiba Kareem",
    role: "Product Lead",
    bio: "Former IEC strategist coordinating data governance, partnerships, and end-to-end rollout of the Digital Diwan platform.",
  },
  {
    name: "Ali al-Rubaie",
    role: "Head of Field Research",
    bio: "Leads a network of provincial correspondents capturing candidate movements, town hall insights, and security advisories.",
  },
  {
    name: "Sara Barwari",
    role: "AI Systems Architect",
    bio: "Builds the AI-assisted briefing tools, real-time translation workflows, and ethical guardrails that power civic storytelling.",
  },
];

const partners = [
  "Iraqi High Electoral Commission (IEC)",
  "Open Governance Network",
  "University of Baghdad – Policy Innovation Lab",
  "Basra Civil Society Observatory",
  "Kurdistan Civic Media Forum",
];

export default function AboutPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3 text-balance">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-foreground/70">About</p>
        <h1 className="text-3xl font-semibold text-neutral-50">Our mission</h1>
        <p className="max-w-3xl text-sm text-neutral-400">
          Digital Diwan is a civic technology collective providing transparent election intelligence across Iraq. We blend open
          government data, field reporting, and AI tooling to help voters, journalists, and campaign teams make informed decisions.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.name} className="flex flex-col gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-6">
            <h2 className="text-lg font-semibold text-neutral-50">{member.name}</h2>
            <p className="text-sm text-brand-foreground/80">{member.role}</p>
            <p className="text-sm text-neutral-300">{member.bio}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6">
        <h2 className="text-2xl font-semibold text-neutral-50">Partners & verification network</h2>
        <p className="text-sm text-neutral-400">
          Data accuracy is paramount. Our partners share verified bulletins, finance disclosures, and geotagged multimedia to keep
          the platform trustworthy.
        </p>
        <ul className="grid gap-2 text-sm text-neutral-300 md:grid-cols-2">
          {partners.map((partner) => (
            <li key={partner} className="rounded-xl border border-neutral-800/60 bg-neutral-950/60 px-4 py-3">
              {partner}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-neutral-50">Contact</h2>
        <p className="text-sm text-neutral-300">
          We welcome collaborations, data contributions, and volunteer support. Email <a className="text-brand" href="mailto:civic@digitaldiwan.io">civic@digitaldiwan.io</a>
          or reach us on secure messaging channels shared with partner organizations.
        </p>
      </section>
    </div>
  );
}
