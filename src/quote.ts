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

  const quoteBodyLines = [
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
 * POSTs the quote breakdown to the Apps Script backend, which emails a PDF
 * to the business. Uses a text/plain body (not application/json) so the
 * browser sends it as a CORS "simple request" — Apps Script Web Apps don't
 * handle the preflight OPTIONS request a JSON content-type would trigger.
 */
export async function submitQuotePdf(
  quote: QuoteResult,
  adults: number,
  children: number,
): Promise<{ ok: boolean; error?: string }> {
  if (!isQuoteEndpointConfigured()) {
    return { ok: false, error: 'not_configured' };
  }

  const payload = {
    adults,
    children,
    grandTotal: quote.grandTotal,
    summaryLines: quote.summaryLines,
    ...(QUOTE_ENDPOINT_SECRET ? { secret: QUOTE_ENDPOINT_SECRET } : {}),
  };

  try {
    const res = await fetch(QUOTE_ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { ok: boolean; error?: string };
    return json;
  } catch {
    return { ok: false, error: 'network_error' };
  }
}
