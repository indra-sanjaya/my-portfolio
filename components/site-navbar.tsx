'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, Home, User, TrendingUp, FolderKanban, Lightbulb, Layers, Award, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'impact', label: 'Impact', icon: TrendingUp },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'philosophy', label: 'Approach', icon: Lightbulb },
  { id: 'tech-stack', label: 'Stack', icon: Layers },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
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
    if (scrollPosition >= sectionTop) current = item.id;
  }

  return current;
}

export function SiteNavbar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setVisible(window.scrollY > 10);
      setActiveSection(getActiveSection());
    };

    const onResize = () => setActiveSection(getActiveSection());

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const media = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };
    closeOnDesktop();
    media.addEventListener('change', closeOnDesktop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      media.removeEventListener('change', closeOnDesktop);
    };
  }, []);

  const isLight = mounted && theme === 'light';

  return (
    <div
      className={[
        'fixed bottom-3 sm:bottom-4 left-1/2 z-50 w-[min(96vw,1100px)] -translate-x-1/2 transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none',
      ].join(' ')}>
      {/* Glass card */}
      <div
        className="rounded-2xl relative"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: `
            0 -12px 60px -30px rgba(0,0,0,0.4),
            0 0 0 0.5px rgba(255,255,255,0.12) inset,
            0 1.5px 0 rgba(255,255,255,0.55) inset,
            0 -1px 0 rgba(255,255,255,0.08) inset,
            2px 0 0 rgba(255,255,255,0.1) inset
          `,
        }}>
        {/* Decorative highlights (unchanged) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-2xl z-0 overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 60%, transparent 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute -top-10 -left-10 w-[60%] h-[55%] -rotate-[30deg] opacity-20 z-0 overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 40%, rgba(200,230,255,0.6) 55%, transparent)',
            filter: 'blur(6px)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px z-0"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 70%, transparent)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2 p-2">
          {/* Desktop nav — full width, evenly spaced including theme button */}
          <nav className="hidden md:flex w-full items-center justify-around">
            {NAV_ITEMS.map((item) => {
              const active = item.id === activeSection;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  aria-label={item.label}
                  className={[
                    'group relative flex items-center justify-center rounded-xl p-2.5 transition-colors',
                    active ?
                      'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-white/10 hover:text-foreground',
                  ].join(' ')}>
                  <Icon className="h-[18px] w-[18px]" />

                  {/* Floating label */}
                  <span
                    className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide invisible group-hover:visible"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
                      backdropFilter: 'blur(16px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.4) inset',
                      color: 'var(--foreground)',
                    }}>
                    {item.label}
                    {/* small arrow pointing down */}
                    <span
                      className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 block h-2.5 w-2.5 rotate-45"
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderTop: 'none',
                        borderLeft: 'none',
                        backdropFilter: 'blur(16px)',
                      }}
                    />
                  </span>
                </button>
              );
            })}

            {/* Theme toggle — part of the evenly spaced row */}
            <button
              type="button"
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className="group relative flex items-center justify-center rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              aria-label="Toggle color theme">
              {isLight ?
                <Moon className="h-[18px] w-[18px]" />
              : <Sun className="h-[18px] w-[18px]" />}

              <span
                className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide opacity-0 transition-none group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.4) inset',
                  color: 'var(--foreground)',
                }}>
                {isLight ? 'Light Mode' : 'Dark Mode'}
                <span
                  className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 block h-2.5 w-2.5 rotate-45"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderTop: 'none',
                    borderLeft: 'none',
                    backdropFilter: 'blur(16px)',
                  }}
                />
              </span>
            </button>
          </nav>

          {/* Mobile: hamburger on the right */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-white/10 md:hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.08)',
            }}>
            <span className="relative block h-4 w-4">
              <span
                className={[
                  'absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition-transform duration-300',
                  menuOpen ? 'translate-y-2 rotate-45' : 'translate-y-0',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-current transition-opacity duration-300',
                  menuOpen ? 'opacity-0' : 'opacity-100',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-3 h-0.5 w-4 rounded-full bg-current transition-transform duration-300',
                  menuOpen ? '-translate-y-1.5 -rotate-45' : 'translate-y-0',
                ].join(' ')}
              />
            </span>
          </button>

          {/* Mobile theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-white/10 md:hidden"
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

        {/* Mobile dropdown — opens upward */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/10 px-3 pb-3">
              <div className="grid gap-2 pt-3">
                {NAV_ITEMS.map((item) => {
                  const active = item.id === activeSection;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        scrollToId(item.id);
                        setMenuOpen(false);
                      }}
                      className={[
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
                        active ?
                          'bg-foreground text-background'
                        : 'text-muted-foreground hover:bg-white/10 hover:text-foreground',
                      ].join(' ')}>
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
