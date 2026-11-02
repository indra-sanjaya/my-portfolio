import Link from 'next/link';

const LINKS = [
  { label: 'Articles', href: '/articles' },
  { label: 'CV', href: '/Indra_Sanjaya_CV.pdf', external: true },
  { label: 'GitHub', href: 'https://github.com/indra-sanjaya', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/indra-sanjaya-dev', external: true },
];

export function Footer() {
  return (
    <footer className="py-8 pb-28 section-padding border-t border-border">
      <div className="content-container flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Indra Sanjaya</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {LINKS.map((link) =>
            link.external ?
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            : <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
          )}
        </nav>
        <p className="text-sm text-muted-foreground">Built with Next.js</p>
      </div>
    </footer>
  );
}
