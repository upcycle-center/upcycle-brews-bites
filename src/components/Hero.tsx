import { COLORS } from '../data';

export default function Hero() {
  return (
    <section
      style={{
        display: 'flex',
        background: COLORS.green,
        color: 'oklch(97% 0.01 95)',
      }}
    >
      <div
        className="hero-content"
        style={{
          padding: '64px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
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
          WE'RE OPEN!
        </span>
        <h1
          className="hero-heading"
          style={{
            font: "400 64px/1.02 'Anton', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '.01em',
            margin: 0,
            color: 'oklch(96% 0.01 95)',
          }}
        >
          Craft cocktails. Local bites.
          <br />
          <span style={{ color: COLORS.gold }}>The perfect pairing.</span>
        </h1>
        <p style={{ font: "400 17px/1.6 'Inter'", color: 'oklch(88% 0.01 95)', maxWidth: '46ch', margin: 0 }}>
          Discover the best of Upstate New York with UPCYCLE Brews &amp; Bites and The Baldwin Speakeasy by Liquid
          Mercantile. Together, we're bringing handcrafted food, signature cocktails, local brews, and unforgettable
          experiences to one destination.
        </p>
        <p style={{ font: "400 17px/1.6 'Inter'", color: 'oklch(88% 0.01 95)', maxWidth: '46ch', margin: 0 }}>
          Featuring chef-inspired menus, rotating guest chefs, regional vendors, and community events, every visit
          offers something new to enjoy. Come hungry, stay for the cocktails, and gather with friends for the perfect
          pairing of great food, great drinks, and great company.
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
    </section>
  );
}
