import { useState } from 'react';
import logo from '../assets/logo.png';
import { COLORS } from '../data';

const NAV_LINKS = [
  { label: 'love at first bite', href: '#menu-section' },
  { label: 'sips & cans', href: '#sips-section' },
  { label: 'happening at the garden', href: '#happening-section' },
  { label: 'casual catering', href: '#catering-section' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '14px 32px',
        background: 'oklch(99% 0.003 95)',
        borderBottom: `3px solid ${COLORS.gold}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img src={logo} alt="UPCYCLE Brews & Bites" style={{ height: 76, width: 'auto', borderRadius: 6 }} />
      </div>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 32, padding: 0, background: 'transparent', border: 'none' }}
        >
          <span
            style={{
              height: 2.5,
              borderRadius: 2,
              background: 'oklch(24% 0.045 152)',
              transform: menuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
              transition: 'transform .2s',
            }}
          />
          <span
            style={{
              height: 2.5,
              borderRadius: 2,
              background: 'oklch(24% 0.045 152)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity .2s',
            }}
          />
          <span
            style={{
              height: 2.5,
              borderRadius: 2,
              background: 'oklch(24% 0.045 152)',
              transform: menuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
              transition: 'transform .2s',
            }}
          />
        </button>
        {menuOpen && (
          <nav
            style={{
              position: 'absolute',
              top: 52,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 220,
              background: 'oklch(99% 0.003 95)',
              border: '1px solid oklch(90% 0.01 95)',
              borderRadius: 10,
              boxShadow: '0 12px 28px oklch(0% 0 0 / 0.14)',
              overflow: 'hidden',
              zIndex: 60,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '14px 20px',
                  font: "600 14px 'Inter'",
                  color: 'oklch(24% 0.045 152)',
                  letterSpacing: '.03em',
                  borderBottom: i === NAV_LINKS.length - 1 ? 'none' : '1px solid oklch(92% 0.01 95)',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
