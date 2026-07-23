import { useEffect, useMemo, useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';
import { buildCalendarCells, type CalendarCell } from '../calendar';
import { CHEFS, COLORS, RECURRING_EVENTS, RSVP_URL } from '../data';
import { imageUrl } from '../imageUrl';

type EventDay = Extract<CalendarCell, { hasDay: true }>;

const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

function isPastDate(year: number, month: number, day: number): boolean {
  return new Date(year, month, day) < todayStart;
}

export default function ChefSection() {
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [detailsModalEvent, setDetailsModalEvent] = useState<string | null>(null);
  const [detailsModalChefId, setDetailsModalChefId] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsModalEvent && !detailsModalChefId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDetailsModalEvent(null);
        setDetailsModalChefId(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [detailsModalEvent, detailsModalChefId]);

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

  // List view only: skip closed/retail-only days entirely, keep days with at least one RSVP-able event.
  const eventDays = useMemo(
    () =>
      calendarCells.filter(
        (cell): cell is EventDay => cell.hasDay && cell.eventTiles.some((tile) => tile.canRsvp),
      ),
    [calendarCells],
  );

  return (
    <section id="chef-section" style={{ padding: '64px 32px', background: COLORS.green }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span style={{ font: "700 12px 'Inter'", letterSpacing: '.12em', color: COLORS.gold }}>ROTATING VENDORS</span>
        <h2 style={{ font: "400 40px 'Anton', sans-serif", textTransform: 'uppercase', margin: '6px 0 0', color: 'oklch(97% 0.01 95)' }}>
          Guest Chef Spotlight
        </h2>
        <p style={{ font: "400 14px 'Inter'", color: 'oklch(78% 0.01 95)', maxWidth: '60ch', margin: '10px auto 0' }}>
          Our rotating vendors serve tasting platters featuring their signature items — a mixed plate built for
          sampling, so you can experiment with new flavors alongside our core menu.
        </p>
      </div>

      <div
        className="two-col-grid"
        style={{
          maxWidth: 920,
          margin: '0 auto',
          display: 'grid',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {CHEFS.map((chef) => (
          <div
            key={chef.id}
            style={{
              borderRadius: 14,
              overflow: 'hidden',
              background: 'oklch(100% 0 0)',
              boxShadow: '0 1px 3px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={imageUrl(`images/chefs/${chef.id}.jpg`)}
              alt={chef.name}
              style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ font: "800 16px 'Inter'", color: 'oklch(22% 0.02 150)', minHeight: 40 }}>{chef.name}</div>
              <div
                style={{
                  font: "400 13px/1.5 'Inter'",
                  color: 'oklch(42% 0.02 150)',
                  minHeight: 39,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {chef.bio}
              </div>
              <div style={{ font: "700 11.5px 'Inter'", letterSpacing: '.04em', color: COLORS.skyDeep, marginTop: 4 }}>
                {chef.dates} — {chef.specialty}
              </div>
              <div style={{ font: "700 11px 'Inter'", letterSpacing: '.03em', color: COLORS.goldDeep }}>{chef.cta}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <button
                  onClick={() => setDetailsModalChefId(chef.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 7,
                    border: '1.5px solid oklch(85% 0.01 150)',
                    background: 'transparent',
                    color: 'oklch(35% 0.02 150)',
                    font: "700 11.5px 'Inter'",
                  }}
                >
                  Details
                </button>
                <a
                  href={RSVP_URL}
                  target="_blank"
                  rel="noopener"
                  style={{
                    padding: '6px 14px',
                    borderRadius: 7,
                    border: 'none',
                    font: "700 11.5px 'Inter'",
                    textDecoration: 'none',
                    background: COLORS.skyDeep,
                    color: 'oklch(98% 0.01 90)',
                  }}
                >
                  RSVP
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        id="happening-section"
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

        <div className="happening-grid" style={{ display: 'grid' }}>
          {eventDays.length === 0 && (
            <p style={{ textAlign: 'center', font: "400 13px 'Inter'", color: 'oklch(50% 0.02 150)', margin: 0 }}>
              No events scheduled this month.
            </p>
          )}
          {eventDays.map((cell, i) => {
            const dateLabel = new Date(calendarYear, calendarMonth, cell.day).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            });
            const isPast = isPastDate(calendarYear, calendarMonth, cell.day);
            return (
              <div
                key={cell.day}
                style={{
                  padding: '16px 4px',
                  borderBottom: i === eventDays.length - 1 ? 'none' : '1px solid oklch(90% 0.01 95)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ font: "700 14px 'Inter'", color: isPast ? 'oklch(78% 0.005 95)' : COLORS.burntOrange }}>
                    {dateLabel}
                  </div>
                  {cell.holidayLabel && (
                    <span
                      style={{
                        font: "700 9.5px 'Inter'",
                        letterSpacing: '.03em',
                        color: 'oklch(45% 0.14 25)',
                        padding: '3px 8px',
                        borderRadius: 999,
                        background: 'oklch(95% 0.03 25)',
                        border: '1px solid oklch(75% 0.1 25)',
                      }}
                    >
                      {cell.holidayLabel}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cell.eventTiles
                    .filter((tile) => tile.canRsvp)
                    .map((tile) => (
                      <div key={tile.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ font: "600 12.5px 'Inter'", color: isPast ? 'oklch(78% 0.005 95)' : 'oklch(22% 0.02 150)' }}>
                          {tile.label}
                        </div>
                        {isPast ? (
                          <span
                            aria-disabled="true"
                            style={{
                              padding: '5px 12px',
                              borderRadius: 6,
                              font: "700 11px 'Inter'",
                              whiteSpace: 'nowrap',
                              background: 'oklch(93% 0.005 95)',
                              color: 'oklch(72% 0.005 95)',
                              cursor: 'not-allowed',
                            }}
                          >
                            RSVP
                          </span>
                        ) : (
                          <a
                            href={RSVP_URL}
                            target="_blank"
                            rel="noopener"
                            style={{
                              padding: '5px 12px',
                              borderRadius: 6,
                              border: 'none',
                              font: "700 11px 'Inter'",
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              background: COLORS.skyDeep,
                              color: 'oklch(98% 0.01 90)',
                            }}
                          >
                            RSVP
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="two-col-grid"
        style={{
          maxWidth: 920,
          margin: '32px auto 0',
          display: 'grid',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {RECURRING_EVENTS.map((ev) => {
          const hasMore = Boolean(ev.paragraphs || ev.ctaLine || ev.details);
          return (
            <div
              key={ev.title}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                background: 'oklch(100% 0 0)',
                boxShadow: '0 1px 3px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ImagePlaceholder label="Drop event photo" style={{ width: '100%', height: 140 }} />
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ font: "800 16px 'Inter'", color: 'oklch(22% 0.02 150)', minHeight: 40 }}>{ev.title}</div>
                <div
                  style={{
                    font: "400 13px/1.5 'Inter'",
                    color: 'oklch(42% 0.02 150)',
                    minHeight: 39,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {ev.desc}
                </div>
                <div style={{ font: "700 11.5px 'Inter'", letterSpacing: '.04em', color: COLORS.skyDeep, marginTop: 4 }}>
                  {ev.schedule}
                </div>
                <div style={{ font: "700 11px 'Inter'", letterSpacing: '.03em', color: COLORS.goldDeep }}>{ev.cta}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <button
                    onClick={() => hasMore && setDetailsModalEvent(ev.title)}
                    aria-hidden={!hasMore}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 7,
                      border: '1.5px solid oklch(85% 0.01 150)',
                      background: 'transparent',
                      color: 'oklch(35% 0.02 150)',
                      font: "700 11.5px 'Inter'",
                      visibility: hasMore ? 'visible' : 'hidden',
                      pointerEvents: hasMore ? 'auto' : 'none',
                    }}
                  >
                    Details
                  </button>
                  <a
                    href={RSVP_URL}
                    target="_blank"
                    rel="noopener"
                    style={{
                      padding: '6px 14px',
                      borderRadius: 7,
                      border: 'none',
                      font: "700 11.5px 'Inter'",
                      textDecoration: 'none',
                      background: COLORS.skyDeep,
                      color: 'oklch(98% 0.01 90)',
                    }}
                  >
                    RSVP
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {detailsModalEvent &&
        (() => {
          const ev = RECURRING_EVENTS.find((e) => e.title === detailsModalEvent);
          if (!ev) return null;
          return (
            <div
              onClick={() => setDetailsModalEvent(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'oklch(0% 0 0 / 0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                zIndex: 100,
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: 480,
                  width: '100%',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  background: 'oklch(100% 0 0)',
                  borderRadius: 14,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <button
                  onClick={() => setDetailsModalEvent(null)}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    border: '1px solid oklch(85% 0.01 150)',
                    background: 'oklch(98% 0.005 95)',
                    color: 'oklch(30% 0.02 150)',
                    font: "700 15px 'Inter'",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
                <div style={{ font: "800 18px 'Inter'", color: 'oklch(22% 0.02 150)', paddingRight: 24 }}>{ev.title}</div>
                {(ev.paragraphs ?? [ev.desc]).map((p, i) => (
                  <div key={i} style={{ font: "400 13.5px/1.6 'Inter'", color: 'oklch(42% 0.02 150)' }}>
                    {p}
                  </div>
                ))}
                {ev.ctaLine && (
                  <div style={{ font: "700 13px/1.4 'Inter'", color: 'oklch(22% 0.02 150)' }}>{ev.ctaLine}</div>
                )}
                {ev.details && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                    {ev.details.map((d) => (
                      <div key={d} style={{ font: "400 13px/1.5 'Inter'", color: 'oklch(42% 0.02 150)' }}>
                        • {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

      {detailsModalChefId &&
        (() => {
          const chef = CHEFS.find((c) => c.id === detailsModalChefId);
          if (!chef) return null;
          return (
            <div
              onClick={() => setDetailsModalChefId(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'oklch(0% 0 0 / 0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                zIndex: 100,
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: 480,
                  width: '100%',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  background: 'oklch(100% 0 0)',
                  borderRadius: 14,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <button
                  onClick={() => setDetailsModalChefId(null)}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    border: '1px solid oklch(85% 0.01 150)',
                    background: 'oklch(98% 0.005 95)',
                    color: 'oklch(30% 0.02 150)',
                    font: "700 15px 'Inter'",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
                <div style={{ font: "800 18px 'Inter'", color: 'oklch(22% 0.02 150)', paddingRight: 24 }}>{chef.name}</div>
                <div style={{ font: "700 12.5px 'Inter'", color: COLORS.skyDeep }}>
                  {chef.dates} — {chef.specialty}
                </div>
                {chef.paragraphs.map((p, i) => (
                  <div key={i} style={{ font: "400 13.5px/1.6 'Inter'", color: 'oklch(42% 0.02 150)' }}>
                    {p}
                  </div>
                ))}
                <div style={{ font: "700 13px/1.4 'Inter'", color: 'oklch(22% 0.02 150)' }}>{chef.ctaLine}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                  {chef.details.map((d) => (
                    <div key={d} style={{ font: "400 13px/1.5 'Inter'", color: 'oklch(42% 0.02 150)' }}>
                      • {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
    </section>
  );
}
