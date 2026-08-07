import { useCallback, useEffect, useRef, useState } from 'react';
import { BANNER_ITEMS, COLORS, RSVP_URL } from '../data';
import { imageUrl } from '../imageUrl';

const ROTATE_MS = 5000;

export default function PromoBanner() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % BANNER_ITEMS.length);
    }, ROTATE_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const jumpTo = (i: number) => {
    setIndex(i);
    startTimer();
  };

  const item = BANNER_ITEMS[index];

  return (
    <div className="promo-banner" style={{ position: 'relative', height: 330, overflow: 'hidden', background: COLORS.gold }}>
      <div className="banner-grid" style={{ display: 'grid', height: '100%', maxWidth: 1280, margin: '0 auto' }}>
        <div className="banner-image-col" style={{ position: 'relative' }}>
          {BANNER_ITEMS.map((slide, i) => (
            <img
              key={slide.id}
              src={imageUrl(`images/events/${slide.id}.jpg`)}
              alt={slide.headline}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: i === index ? 'block' : 'none',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, padding: '0 40px' }}>
          <span style={{ font: "700 11px 'Inter'", letterSpacing: '.14em', color: 'oklch(98% 0.005 95)' }}>{item.eyebrow}</span>
          <div style={{ font: "400 40px/1.05 'Anton', sans-serif", textTransform: 'uppercase', color: 'oklch(24% 0.045 152)' }}>
            {item.headline}
          </div>
          <div style={{ font: "400 15px/1.5 'Inter'", color: 'oklch(10% 0 0)', maxWidth: '52ch' }}>{item.sub}</div>
          <div style={{ font: "700 14px/1.4 'Inter'", color: 'oklch(10% 0 0)', maxWidth: '52ch' }}>{item.schedule}</div>
          <a
            href={RSVP_URL}
            target="_blank"
            rel="noopener"
            style={{
              alignSelf: 'flex-start',
              marginTop: 6,
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              font: "700 13px 'Inter'",
              textDecoration: 'none',
              background: 'oklch(10% 0 0)',
              color: 'oklch(98% 0.01 95)',
            }}
          >
            RSVP
          </a>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {BANNER_ITEMS.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => jumpTo(i)}
            aria-label={`Show slide ${i + 1}`}
            style={{
              width: i === index ? 22 : 8,
              height: 8,
              borderRadius: 999,
              border: 'none',
              background: i === index ? 'oklch(24% 0.045 152)' : 'oklch(24% 0.045 152 / 0.35)',
              transition: 'width .2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
