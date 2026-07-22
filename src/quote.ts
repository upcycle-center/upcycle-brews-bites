import {
  ADD_ONS,
  ALCOHOL_TIERS,
  CATERING_PACKAGES,
  CONTACT_EMAIL,
  QUOTE_ENDPOINT_SECRET,
  QUOTE_ENDPOINT_URL,
  TIP_RATE,
  calcBookingFee,
  type CateringPackage,
} from './data';

export interface PackageBreakdown {
  id: string;
  name: string;
  bookingFee: number;
  bookingNote: string;
  perPerson: number;
  childPerPerson: number;
  adultsCost: number;
  childrenCost: number;
  total: number;
}

export interface SummaryLine {
  label: string;
  value: number;
  note?: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Tentative event date, ISO yyyy-mm-dd (from a native date input). */
  eventDate: string;
  /** Optional alternative event date, same format. */
  altDate: string;
}

export const EMPTY_CONTACT: ContactInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  eventDate: '',
  altDate: '',
};

export function isContactComplete(contact: ContactInfo): boolean {
  return (
    contact.firstName.trim().length > 0 &&
    contact.lastName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()) &&
    contact.phone.trim().length > 0 &&
    contact.eventDate.trim().length > 0
  );
}

export interface QuoteResult {
  packageBreakdowns: PackageBreakdown[];
  foodTotal: number;
  barGuestCount: number;
  barPerPersonCost: number;
  barTotal: number;
  subtotalBeforeFees: number;
  addOnsTotal: number;
  tipAmount: number;
  grandTotal: number;
  summaryLines: SummaryLine[];
  mailtoHref: string;
}

export function computeQuote(
  selectedPackageIds: string[],
  adults: number,
  children: number,
  barServiceId: string,
  addOnSelections: Record<string, boolean>,
  contact: ContactInfo = EMPTY_CONTACT,
): QuoteResult {
  const totalGuests = adults + children;
  const chosenPackages: CateringPackage[] = CATERING_PACKAGES.filter((p) => selectedPackageIds.includes(p.id));

  const packageBreakdowns: PackageBreakdown[] = chosenPackages.map((pkg) => {
    const childPerPerson = pkg.perPerson * 0.5;
    const adultsCost = pkg.perPerson * adults;
    const childrenCost = childPerPerson * children;
    const { fee: bookingFee, note: bookingNote } = calcBookingFee(pkg.group, totalGuests);
    return {
      id: pkg.id,
      name: pkg.name,
      bookingFee,
      bookingNote,
      perPerson: pkg.perPerson,
      childPerPerson,
      adultsCost,
      childrenCost,
      total: bookingFee + adultsCost + childrenCost,
    };
  });

  const foodTotal = packageBreakdowns.reduce((sum, p) => sum + p.total, 0);

  const barTier = ALCOHOL_TIERS.find((t) => t.id === barServiceId) ?? ALCOHOL_TIERS[0];
  const barSelected = barTier.id !== 'none';
  const barGuestCount = barTier.countsChildren ? totalGuests : adults;
  const barPerPersonCost = barGuestCount * barTier.perPerson;
  const barTotal = barSelected ? barTier.base + barPerPersonCost : 0;

  const subtotalBeforeFees = foodTotal + barTotal;

  const selectedAddOns = ADD_ONS.filter((a) => addOnSelections[a.id]);
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);

  const tipAmount = subtotalBeforeFees * TIP_RATE;
  const grandTotal = Math.round(foodTotal + barTotal + addOnsTotal + tipAmount);

  const summaryLines: SummaryLine[] = [
    ...packageBreakdowns.flatMap((p): SummaryLine[] => [
      { label: `${p.name} — Booking Fee`, value: p.bookingFee, note: p.bookingNote },
      { label: `${p.name} — Adults: ${adults} × $${p.perPerson}/guest`, value: Math.round(p.adultsCost) },
      ...(children > 0
        ? [{ label: `${p.name} — Children: ${children} × $${p.childPerPerson}/guest`, value: Math.round(p.childrenCost) }]
        : []),
    ]),
    ...(barSelected
      ? [
          { label: `${barTier.name} — Booking Fee`, value: barTier.base },
          {
            label: `${barTier.name} — ${barTier.countsChildren ? 'Guests' : 'Adults'}: ${barGuestCount} × $${barTier.perPerson}/guest`,
            value: Math.round(barPerPersonCost),
          },
        ]
      : []),
    ...selectedAddOns.map((a) => ({ label: a.label, value: a.price })),
    ...(subtotalBeforeFees > 0 ? [{ label: 'Tip Jar (18%)', value: Math.round(tipAmount) }] : []),
  ];

  const fullName = `${contact.firstName} ${contact.lastName}`.trim();
  const quoteBodyLines = [
    ...(fullName ? [`Name: ${fullName}`] : []),
    ...(contact.email ? [`Email: ${contact.email}`] : []),
    ...(contact.phone ? [`Phone: ${contact.phone}`] : []),
    ...(contact.eventDate ? [`Event Date: ${contact.eventDate}`] : []),
    ...(contact.altDate ? [`Alternative Date: ${contact.altDate}`] : []),
    ...packageBreakdowns.map((p) => `Package: ${p.name} ($${Math.round(p.bookingFee)} booking fee + $${p.perPerson}/guest)`),
    `Adults: ${adults}`,
    `Children: ${children}`,
    `Bar Service: ${barTier.name}`,
    ...selectedAddOns.map((a) => `Add-On: ${a.label} (+$${a.price})`),
    ...(subtotalBeforeFees > 0 ? [`Tip Jar (18%): $${Math.round(tipAmount)}`] : []),
    `Estimated Total: $${grandTotal}`,
  ];
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    'Catering Quote Request — UPCYCLE Brews & Bites',
  )}&body=${encodeURIComponent(quoteBodyLines.join('\n'))}`;

  return {
    packageBreakdowns,
    foodTotal,
    barGuestCount,
    barPerPersonCost,
    barTotal,
    subtotalBeforeFees,
    addOnsTotal,
    tipAmount,
    grandTotal,
    summaryLines,
    mailtoHref,
  };
}

/** True once QUOTE_ENDPOINT_URL has been filled in with a deployed Apps Script Web App URL. */
export function isQuoteEndpointConfigured(): boolean {
  return QUOTE_ENDPOINT_URL.trim().length > 0;
}

/**
 * POSTs the quote breakdown to the Apps Script backend, which sends two
 * emails (each with the PDF attached): an internal notification to the
 * business, and a separate confirmation to the requester with its own
 * customer-facing message.
 *
 * Uses `mode: 'no-cors'` deliberately: Apps Script Web Apps execute on the
 * initial POST to script.google.com, then 302-redirect to a
 * script.googleusercontent.com URL to serve the response body. Both fetch
 * and curl downgrade a POST to a GET when following that redirect, so the
 * JSON `{ok:true}` response is not reliably readable client-side — but the
 * script has already run and sent the email by that point regardless. So
 * this can't distinguish "sent successfully" from "server-side error" the
 * way a normal API call could; a thrown error here means the request never
 * reached Google at all (offline, DNS failure, etc.), not a script failure.
 */
export async function submitQuotePdf(
  quote: QuoteResult,
  adults: number,
  children: number,
  contact: ContactInfo,
): Promise<{ ok: boolean; error?: string }> {
  if (!isQuoteEndpointConfigured()) {
    return { ok: false, error: 'not_configured' };
  }

  const payload = {
    name: `${contact.firstName} ${contact.lastName}`.trim(),
    email: contact.email.trim(),
    phone: contact.phone.trim(),
    eventDate: contact.eventDate.trim(),
    altDate: contact.altDate.trim(),
    adults,
    children,
    grandTotal: quote.grandTotal,
    summaryLines: quote.summaryLines,
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
