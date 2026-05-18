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
  { id: 'impact', label: 'Impact' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
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
      setVisible(window.scrollY > 160);
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
      <div className="rounded-2xl border border-border/70 bg-background/82 backdrop-blur-xl shadow-[0_12px_60px_-30px_var(--foreground)]">
        <div className="flex items-center gap-2 p-2">
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
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  ].join(' ')}>
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
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
