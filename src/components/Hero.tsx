import ImagePlaceholder from './ImagePlaceholder';
import { COLORS } from '../data';

export default function Hero() {
  return (
    <section
      className="hero-grid"
      style={{
        display: 'grid',
        gap: 0,
        background: COLORS.green,
        color: 'oklch(97% 0.01 95)',
      }}
    >
      <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '6px 14px',
            borderRadius: 999,
            background: 'oklch(78% 0.08 220 / 0.18)',
            border: '1px solid oklch(78% 0.08 220 / 0.5)',
            font: "600 12px 'Inter'",
            letterSpacing: '.06em',
            color: 'oklch(86% 0.06 220)',
          }}
        >
          PARKED AT SPEAKEASY MOTORS
        </span>
        <h1
          style={{
            font: "400 64px/1.02 'Anton', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '.01em',
            margin: 0,
            color: 'oklch(96% 0.01 95)',
          }}
        >
          Second life.
          <br />
          <span style={{ color: COLORS.gold }}>First bite.</span>
        </h1>
        <p style={{ font: "400 17px/1.6 'Inter'", color: 'oklch(88% 0.01 95)', maxWidth: '46ch', margin: 0 }}>
          A rotating-vendor food truck built on the same idea as our home base: give things a second purpose. UPCYCLE
          Brews &amp; Bites resides at Speakeasy Motors, a craft distillery inside a newly renovated 19th-century
          winery house — pallet-wood counters, wine-bottle lighting, and a menu that changes with our guest chefs.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <a
            href="#menu-section"
            style={{
              display: 'inline-flex',
              padding: '13px 26px',
              borderRadius: 8,
              background: COLORS.gold,
              color: 'oklch(20% 0.03 90)',
              font: "700 14px 'Inter'",
              letterSpacing: '.02em',
            }}
          >
            View the Menu
          </a>
          <a
            href="#catering-section"
            style={{
              display: 'inline-flex',
              padding: '13px 26px',
              borderRadius: 8,
              background: 'transparent',
              border: '1.5px solid oklch(96% 0.01 95 / 0.4)',
              color: 'oklch(96% 0.01 95)',
              font: "700 14px 'Inter'",
              letterSpacing: '.02em',
            }}
          >
            Plan Catering
          </a>
        </div>
      </div>
      <div style={{ position: 'relative', height: 520 }}>
        <ImagePlaceholder label="Drop truck / distillery photo" style={{ width: '100%', height: 520 }} />
      </div>
    </section>
  );
}
