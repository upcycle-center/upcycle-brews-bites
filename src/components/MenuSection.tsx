import { useState } from 'react';
import { COLORS, DIETARY_LABELS, MENU, type DietaryTag, type MenuCategory } from '../data';
import { imageUrl } from '../imageUrl';

type CategoryFilter = 'all' | MenuCategory;

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'All',
  small: 'Small Bites',
  big: 'Big Bites',
  latenight: 'Late Nite Bites',
};

const BADGE_STYLE: Record<DietaryTag, { bg: string; color: string }> = {
  GF: { bg: 'oklch(90% 0.04 220)', color: COLORS.skyDeep },
  V: { bg: 'oklch(90% 0.04 150)', color: 'oklch(38% 0.05 150)' },
  VN: { bg: 'oklch(92% 0.06 85)', color: COLORS.goldDeep },
  SP: { bg: 'oklch(92% 0.06 40)', color: 'oklch(52% 0.16 40)' },
};

export default function MenuSection() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [filters, setFilters] = useState<DietaryTag[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFilter = (code: DietaryTag) => {
    setFilters((prev) => (prev.includes(code) ? prev.filter((f) => f !== code) : [...prev, code]));
  };

  const visibleItems = MENU.filter((item) => {
    const catOk = category === 'all' || item.category === category;
    const filtOk = filters.length === 0 || item.tags.some((t) => filters.includes(t));
    return catOk && filtOk;
  });

  return (
    <section id="menu-section" style={{ padding: '64px 32px', background: COLORS.green }}>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <span style={{ font: "700 12px 'Inter'", letterSpacing: '.12em', color: COLORS.gold }}>THE MENU</span>
        <h2 style={{ font: "400 40px 'Anton', sans-serif", textTransform: 'uppercase', margin: '6px 0 0', color: 'oklch(97% 0.01 95)' }}>
          LOVE AT FIRST BITE
        </h2>
        <p style={{ font: "400 14px 'Inter'", color: 'oklch(78% 0.01 95)', maxWidth: '56ch', margin: '10px auto 0' }}>
          Tap a dish to see our bartender's best cocktail and beer pairing.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, margin: '28px 0 14px' }}>
        {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '9px 18px',
                borderRadius: 999,
                border: `1.5px solid ${active ? COLORS.gold : 'oklch(96% 0.01 95 / 0.3)'}`,
                background: active ? COLORS.gold : 'transparent',
                color: active ? 'oklch(20% 0.03 90)' : 'oklch(94% 0.01 95)',
                font: "700 13px 'Inter'",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
        {(Object.keys(DIETARY_LABELS) as DietaryTag[]).map((code) => {
          const active = filters.includes(code);
          return (
            <button
              key={code}
              onClick={() => toggleFilter(code)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                border: `1px solid ${active ? COLORS.sky : 'oklch(96% 0.01 95 / 0.25)'}`,
                background: active ? 'oklch(78% 0.08 220 / 0.25)' : 'transparent',
                color: active ? 'oklch(90% 0.03 220)' : 'oklch(80% 0.01 95)',
                font: "600 12px 'Inter'",
              }}
            >
              {DIETARY_LABELS[code]}
            </button>
          );
        })}
      </div>

      {visibleItems.length === 0 && (
        <p style={{ textAlign: 'center', color: 'oklch(80% 0.01 95)', font: "400 15px 'Inter'" }}>
          No dishes match that filter right now — ask us about a custom plate for your dietary need!
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          maxWidth: 1180,
          margin: '0 auto 48px',
        }}
      >
        {visibleItems.map((item) => {
          const expanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              style={{
                background: 'oklch(98% 0.006 95)',
                borderRadius: 14,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 18px oklch(0% 0 0 / 0.18)',
              }}
            >
              <img
                src={imageUrl(`images/menu/${item.id}.jpg`)}
                alt={item.name}
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                  <h3 style={{ font: "800 17px 'Inter'", margin: 0, color: 'oklch(22% 0.02 150)' }}>{item.name}</h3>
                  <span style={{ font: "800 16px 'Inter'", color: COLORS.goldDeep, whiteSpace: 'nowrap' }}>${item.price}</span>
                </div>
                <p style={{ font: "400 13.5px/1.55 'Inter'", color: 'oklch(42% 0.02 150)', margin: 0 }}>{item.desc}</p>
                {item.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '3px 9px',
                          borderRadius: 999,
                          background: BADGE_STYLE[tag].bg,
                          color: BADGE_STYLE[tag].color,
                          font: '800 10.5px Inter',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  style={{
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    padding: '8px 14px',
                    borderRadius: 7,
                    border: `1.5px solid ${COLORS.skyDeep}`,
                    background: 'transparent',
                    color: COLORS.skyDeep,
                    font: "700 12px 'Inter'",
                    letterSpacing: '.02em',
                  }}
                >
                  {expanded ? 'Hide Pairings' : 'View Pairings'}
                </button>
                {expanded && (
                  <div
                    style={{
                      marginTop: 6,
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'oklch(94% 0.03 220 / 0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div>
                      <div style={{ font: "700 11px 'Inter'", letterSpacing: '.06em', color: COLORS.skyDeep }}>
                        BEST COCKTAIL PAIRING
                      </div>
                      <div style={{ font: "700 14px 'Inter'", color: 'oklch(22% 0.02 150)' }}>{item.cocktail}</div>
                      <div style={{ font: "400 12.5px/1.5 'Inter'", color: 'oklch(42% 0.02 150)' }}>{item.cocktailNote}</div>
                    </div>
                    <div>
                      <div style={{ font: "700 11px 'Inter'", letterSpacing: '.06em', color: COLORS.goldDeep }}>
                        BEST BEER PAIRING
                      </div>
                      <div style={{ font: "700 14px 'Inter'", color: 'oklch(22% 0.02 150)' }}>{item.beer}</div>
                      <div style={{ font: "400 12.5px/1.5 'Inter'", color: 'oklch(42% 0.02 150)' }}>{item.beerNote}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
