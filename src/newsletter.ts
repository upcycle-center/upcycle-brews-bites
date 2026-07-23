import { QUOTE_ENDPOINT_SECRET, QUOTE_ENDPOINT_URL } from './data';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

/**
 * POSTs a newsletter signup to the same Apps Script backend used for
 * catering quotes (see quote.ts's submitQuotePdf for why `mode: 'no-cors'`
 * means this can't reliably distinguish "sent" from a server-side error —
 * only that the request reached Google at all).
 */
export async function submitNewsletterSignup(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!QUOTE_ENDPOINT_URL.trim()) {
    return { ok: false, error: 'not_configured' };
  }

  const payload = {
    type: 'newsletter',
    email: email.trim(),
    ...(QUOTE_ENDPOINT_SECRET ? { secret: QUOTE_ENDPOINT_SECRET } : {}),
  };

  try {
    await fetch(QUOTE_ENDPOINT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}
