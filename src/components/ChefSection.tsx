import { useMemo, useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';
import { buildCalendarCells, WEEKDAY_LABELS } from '../calendar';
import { CATEGORY_COLORS, CHEFS, COLORS, RECURRING_EVENTS, RSVP_URL } from '../data';

const today = new Date();

export default function ChefSection() {
  const [chefIndex, setChefIndex] = useState(0);
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());

  const currentChef = CHEFS[chefIndex];

  const prevChef = () => setChefIndex((i) => (i - 1 + CHEFS.length) % CHEFS.length);
  const nextChef = () => setChefIndex((i) => (i + 1) % CHEFS.length);

  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const monthLabel = new Date(calendarYear, calendarMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const calendarCells = useMemo(() => buildCalendarCells(calendarYear, calendarMonth), [calendarYear, calendarMonth]);

  return (
    <section id="chef-section" style={{ padding: '64px 32px', background: 'oklch(98% 0.006 95)' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span style={{ font: "700 12px 'Inter'", letterSpacing: '.12em', color: COLORS.skyDeep }}>ROTATING VENDORS</span>
        <h2 style={{ font: "400 40px 'Anton', sans-serif", textTransform: 'uppercase', margin: '6px 0 0', color: 'oklch(22% 0.02 150)' }}>
          Guest Chef Spotlight
        </h2>
        <p style={{ font: "400 14px 'Inter'", color: 'oklch(42% 0.02 150)', maxWidth: '60ch', margin: '10px auto 0' }}>
          Our rotating vendors serve tasting platters featuring their signature items — a mixed plate built for
          sampling, so you can experiment with new flavors alongside our core menu.
        </p>
      </div>

      <div
        className="chef-spotlight-grid"
        style={{
          display: 'grid',
          gap: 36,
          maxWidth: 920,
          margin: '0 auto',
          background: 'oklch(100% 0 0)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 1px 3px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)',
        }}
      >
        <ImagePlaceholder label="Drop chef photo" style={{ width: '100%', height: '100%', minHeight: 280 }} />
        <div style={{ padding: '32px 32px 32px 0', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              padding: '5px 12px',
              borderRadius: 999,
              background: 'oklch(74% 0.14 85 / 0.25)',
              color: COLORS.goldDeep,
              font: "700 11px 'Inter'",
              letterSpacing: '.06em',
            }}
          >
            {currentChef.dates}
          </span>
          <h3 style={{ font: "800 24px 'Inter'", margin: 0, color: 'oklch(22% 0.02 150)' }}>{currentChef.name}</h3>
          <div style={{ font: "700 14px 'Inter'", color: COLORS.skyDeep }}>{currentChef.specialty}</div>
          <p style={{ font: "400 15px/1.6 'Inter'", color: 'oklch(40% 0.02 150)', margin: 0 }}>{currentChef.bio}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
            <button
              onClick={prevChef}
              aria-label="Previous chef"
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid oklch(85% 0.01 150)',
                background: 'oklch(98% 0.005 95)',
                font: "700 16px 'Inter'",
              }}
            >
              ‹
            </button>
            <span style={{ font: "600 12px 'Inter'", color: 'oklch(50% 0.02 150)' }}>
              {chefIndex + 1} of {CHEFS.length}
            </span>
            <button
              onClick={nextChef}
              aria-label="Next chef"
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid oklch(85% 0.01 150)',
                background: 'oklch(98% 0.005 95)',
                font: "700 16px 'Inter'",
              }}
            >
              ›
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
            <a
              href={RSVP_URL}
              target="_blank"
              rel="noopener"
              style={{
                padding: '11px 20px',
                borderRadius: 8,
                border: 'none',
                font: "700 13px 'Inter'",
                textDecoration: 'none',
                background: COLORS.skyDeep,
                color: 'oklch(98% 0.01 90)',
              }}
            >
              RSVP
            </a>
            <span style={{ font: "400 12px 'Inter'", color: 'oklch(50% 0.02 150)' }}>— includes platter of choice</span>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 920,
          margin: '48px auto 0',
          padding: '28px 32px',
          borderRadius: 16,
          background: 'oklch(100% 0 0)',
          boxShadow: '0 1px 3px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h3 style={{ font: "400 26px 'Anton', sans-serif", textTransform: 'uppercase', color: 'oklch(22% 0.02 150)', margin: 0 }}>
            HAPPENING AT THE GARDEN
          </h3>
          <p style={{ font: "400 13px 'Inter'", color: 'oklch(45% 0.02 150)', margin: '6px 0 12px' }}>
            See who's parked at Speakeasy Motors and RSVP for special nights.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: '1px solid oklch(85% 0.01 150)',
                background: 'oklch(98% 0.005 95)',
                font: "700 15px 'Inter'",
              }}
            >
              ‹
            </button>
            <span style={{ font: "700 15px 'Inter'", color: 'oklch(22% 0.02 150)', minWidth: 160 }}>{monthLabel}</span>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: '1px solid oklch(85% 0.01 150)',
                background: 'oklch(98% 0.005 95)',
                font: "700 15px 'Inter'",
              }}
            >
              ›
            </button>
          </div>
        </div>

        <div className="calendar-scroll">
        <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
          {WEEKDAY_LABELS.map((wd, i) => (
            <div key={i} style={{ textAlign: 'center', font: "700 11px 'Inter'", color: 'oklch(50% 0.02 150)', padding: '4px 0' }}>
              {wd}
            </div>
          ))}
        </div>
        <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {calendarCells.map((cell, i) => {
            if (!cell.hasDay) return <div key={i} />;
            return (
              <div
                key={i}
                style={{
                  minHeight: cell.eventTiles.length > 1 ? 92 : 70,
                  padding: 6,
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  background: cell.holidayLabel ? 'oklch(95% 0.03 25)' : 'oklch(97% 0.006 95)',
                  border: `1px solid ${cell.holidayLabel ? 'oklch(75% 0.1 25)' : 'oklch(90% 0.01 95)'}`,
                }}
              >
                <div style={{ font: "700 12px 'Inter'" }}>{cell.day}</div>
                {cell.holidayLabel && (
                  <div style={{ font: "700 8.5px/1.3 'Inter'", letterSpacing: '.02em', color: 'oklch(45% 0.14 25)', marginTop: 2 }}>
                    {cell.holidayLabel}
                  </div>
                )}
                {cell.eventTiles.map((tile) => {
                  const colors = CATEGORY_COLORS[tile.category];
                  return (
                    <div
                      key={tile.key}
                      style={{
                        borderRadius: 6,
                        padding: '4px 5px',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div style={{ font: "600 9px/1.25 'Inter'" }}>{tile.label}</div>
                      {tile.canRsvp && (
                        <a
                          href={RSVP_URL}
                          target="_blank"
                          rel="noopener"
                          style={{
                            marginTop: 'auto',
                            alignSelf: 'flex-start',
                            padding: '3px 6px',
                            borderRadius: 5,
                            border: 'none',
                            font: "700 9px 'Inter'",
                            textDecoration: 'none',
                            background: COLORS.skyDeep,
                            color: 'oklch(98% 0.01 90)',
                          }}
                        >
                          RSVP
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 920,
          margin: '32px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}
      >
        {RECURRING_EVENTS.map((ev) => (
          <div
            key={ev.title}
            style={{
              padding: 22,
              borderRadius: 14,
              background: 'oklch(100% 0 0)',
              boxShadow: '0 1px 3px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ font: "800 16px 'Inter'", color: 'oklch(22% 0.02 150)' }}>{ev.title}</div>
            <div style={{ font: "400 13px/1.5 'Inter'", color: 'oklch(42% 0.02 150)' }}>{ev.desc}</div>
            <div style={{ font: "700 11.5px 'Inter'", letterSpacing: '.04em', color: COLORS.skyDeep, marginTop: 4 }}>{ev.schedule}</div>
            <div style={{ font: "700 11px 'Inter'", letterSpacing: '.03em', color: COLORS.goldDeep }}>{ev.cta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
