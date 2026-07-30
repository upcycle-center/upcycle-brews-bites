import { COLORS, SIPS } from '../data';
import { imageUrl } from '../imageUrl';

export default function SipsSection() {
  return (
    <>
      <section id="sips-section" style={{ padding: '64px 32px', background: 'oklch(98% 0.006 95)' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ font: "700 12px 'Inter'", letterSpacing: '.12em', color: COLORS.goldDeep }}>NON-ALCOHOLIC</span>
          <h2 style={{ font: "400 40px 'Anton', sans-serif", textTransform: 'uppercase', margin: '6px 0 0', color: 'oklch(22% 0.02 150)' }}>
            Sips &amp; Cans
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          {SIPS.map((sip) => (
            <div
              key={sip.id}
              style={{
                background: 'oklch(100% 0 0)',
                borderRadius: 14,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 18px oklch(0% 0 0 / 0.12)',
              }}
            >
              <img
                src={imageUrl(`images/sips/${sip.id}.jpg`)}
                alt={sip.name}
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <h3 style={{ font: "800 17px 'Inter'", margin: 0, color: 'oklch(22% 0.02 150)' }}>{sip.name}</h3>
                <p style={{ font: "400 13.5px/1.55 'Inter'", color: 'oklch(42% 0.02 150)', margin: 0 }}>{sip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 18,
          padding: '20px 32px',
          background: 'oklch(96% 0.008 95)',
          font: "400 12px 'Inter'",
          color: 'oklch(45% 0.02 150)',
        }}
      >
        <span>
          <b style={{ color: COLORS.skyDeep }}>GF</b> Gluten-Free
        </span>
        <span>
          <b style={{ color: 'oklch(38% 0.05 150)' }}>V</b> Vegetarian
        </span>
        <span>
          <b style={{ color: COLORS.goldDeep }}>VN</b> Vegan
        </span>
        <span>
          <b style={{ color: 'oklch(52% 0.16 40)' }}>SP</b> Spicy
        </span>
      </div>
    </>
  );
}
