import { useState, type ChangeEvent, type FormEvent } from 'react';
import { COLORS, CONTACT_EMAIL } from '../data';
import { isValidEmail, submitNewsletterSignup } from '../newsletter';

type SignupStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SignupStatus>('idle');

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === 'error') setStatus('idle');
  };

  const submitSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email) || status === 'sending') return;
    setStatus('sending');
    const result = await submitNewsletterSignup(email);
    if (result.ok) {
      setStatus('sent');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

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
        {status === 'sent' ? (
          <p style={{ font: "700 13px 'Inter'", color: COLORS.gold, margin: 0 }}>You're on the list — welcome aboard!</p>
        ) : (
          <form onSubmit={submitSignup} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={updateEmail}
              style={{
                flex: '1 1 220px',
                padding: '10px 12px',
                borderRadius: 7,
                border: '1px solid oklch(96% 0.01 95 / 0.3)',
                background: 'oklch(97% 0.01 95 / 0.08)',
                color: 'oklch(97% 0.01 95)',
                font: "400 13px 'Inter'",
              }}
            />
            <button
              type="submit"
              disabled={!isValidEmail(email) || status === 'sending'}
              style={{
                padding: '10px 18px',
                borderRadius: 7,
                border: 'none',
                background: COLORS.gold,
                color: 'oklch(20% 0.03 90)',
                font: "700 13px 'Inter'",
                opacity: !isValidEmail(email) || status === 'sending' ? 0.6 : 1,
                cursor: !isValidEmail(email) || status === 'sending' ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'sending' ? 'Signing up…' : 'Sign Up'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p style={{ font: "400 11.5px 'Inter'", color: 'oklch(72% 0.18 30)', margin: '8px 0 0' }}>
            Something went wrong — please try again in a moment.
          </p>
        )}
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
