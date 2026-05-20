'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'projects', label: 'Projects' },
  { id: 'philosophy', label: 'Approach' },
  { id: 'tech-stack', label: 'Stack' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: 'smooth' });
}

function getActiveSection() {
  const scrollPosition = window.scrollY + 180;
  let current = NAV_ITEMS[0]?.id ?? 'hero';

  for (const item of NAV_ITEMS) {
    const section = document.getElementById(item.id);
    if (!section) continue;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    if (scrollPosition >= sectionTop) {
      current = item.id;
    }
  }

  return current;
}

export function SiteNavbar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setVisible(window.scrollY > 10);
      setActiveSection(getActiveSection());
    };

    const onResize = () => {
      setActiveSection(getActiveSection());
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const isLight = mounted && theme === 'light';

  return (
    <div
      className={[
        'fixed top-4 left-1/2 z-50 w-[min(95vw,980px)] -translate-x-1/2 transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0 pointer-events-none',
      ].join(' ')}>
      {/* Glass card */}
      <div
        className="rounded-2xl relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: `
        0 12px 60px -30px rgba(0,0,0,0.4),
        0 0 0 0.5px rgba(255,255,255,0.12) inset,
        0 1.5px 0 rgba(255,255,255,0.55) inset,
        0 -1px 0 rgba(255,255,255,0.08) inset,
        2px 0 0 rgba(255,255,255,0.1) inset
      `,
        }}>
        {/* Top specular highlight */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-2xl z-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 60%, transparent 100%)',
          }}
        />

        {/* Prismatic shimmer streak */}
        <div
          className="pointer-events-none absolute -top-10 -left-10 w-[60%] h-[55%] -rotate-[30deg] opacity-20 z-0"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 40%, rgba(200,230,255,0.6) 55%, transparent)',
            filter: 'blur(6px)',
          }}
        />

        {/* Bottom inner reflection line */}
        <div
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px z-0"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 70%, transparent)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2 p-2">
          <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {NAV_ITEMS.map((item) => {
              const active = item.id === activeSection;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={[
                    'whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium tracking-wide transition-colors',
                    active ?
                      'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-white/10 hover:text-foreground',
                  ].join(' ')}>
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-white/10"
            style={{
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.08)',
            }}
            aria-label="Toggle color theme">
            {isLight ?
              <Moon className="h-4 w-4" />
            : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
