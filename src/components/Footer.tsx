import { CONTACT_EMAIL, NEWSLETTER_FORM_URL } from '../data';

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
      <div style={{ maxWidth: 420, margin: '0 auto 32px' }}>
        <div style={{ font: "800 16px 'Inter'", color: 'oklch(96% 0.01 95)', marginBottom: 4 }}>Join Our Newsletter</div>
        <p style={{ font: "400 12.5px/1.5 'Inter'", margin: '0 0 14px' }}>
          New guest chefs, seasonal menu drops, and event announcements — straight to your inbox.
        </p>
        <iframe
          src={NEWSLETTER_FORM_URL}
          title="Newsletter signup"
          width="100%"
          height="850"
          style={{ border: 'none', borderRadius: 10, background: 'oklch(98% 0.006 95)' }}
        />
      </div>

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
