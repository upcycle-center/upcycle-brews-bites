import { CONTACT_EMAIL } from '../data';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '36px 32px',
        background: 'oklch(20% 0.04 152)',
        color: 'oklch(80% 0.01 95)',
        textAlign: 'center',
        font: "400 13px 'Inter'",
      }}
    >
      <div style={{ font: "400 20px 'Anton', sans-serif", textTransform: 'uppercase', color: 'oklch(96% 0.01 95)', marginBottom: 8 }}>
        UPCYCLE Brews &amp; Bites
      </div>
      <div>
        At the beer garden at The Baldwin Speakeasy by Liquid Mercantile
        <br />
        174 Hardenburg Rd, Pine Bush, NY 12566
      </div>
      <div style={{ marginTop: 8 }}>
        {CONTACT_EMAIL} · 845.428.2687
      </div>
    </footer>
  );
}
