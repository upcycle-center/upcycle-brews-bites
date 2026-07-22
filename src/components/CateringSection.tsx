import { useMemo, useState, type ChangeEvent, type CSSProperties } from 'react';
import { ADD_ONS, ALCOHOL_TIERS, CATERING_PACKAGES, COLORS } from '../data';
import {
  computeQuote,
  EMPTY_CONTACT,
  getMinEventDate,
  isContactComplete,
  isQuoteEndpointConfigured,
  submitQuotePdf,
  type ContactInfo,
} from '../quote';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

const CONTACT_INPUT_STYLE: CSSProperties = {
  padding: '10px 12px',
  borderRadius: 7,
  border: '1px solid oklch(96% 0.01 95 / 0.3)',
  background: 'oklch(97% 0.01 95 / 0.08)',
  color: 'oklch(97% 0.01 95)',
  font: "400 13px 'Inter'",
};

const CATERING_INTRO_ALIGN: 'center' | 'left' = 'center';

const MIN_EVENT_DATE = getMinEventDate();

export default function CateringSection() {
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);
  const [adults, setAdults] = useState(10);
  const [children, setChildren] = useState(0);
  const [barServiceId, setBarServiceId] = useState('none');
  const [expandedBarId, setExpandedBarId] = useState<string | null>(null);
  const [addOnSelections, setAddOnSelections] = useState<Record<string, boolean>>({});
  const [expandedAddOnId, setExpandedAddOnId] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const updateContact = (field: keyof ContactInfo) => (e: ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const addOnsLocked = barServiceId === 'none';

  const togglePackage = (id: string) => {
    setSelectedPackageIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const selectBar = (id: string) => {
    setBarServiceId(id);
    if (id === 'none') setAddOnSelections({});
  };

  const toggleAddOn = (id: string) => {
    if (addOnsLocked) return;
    setAddOnSelections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const quote = useMemo(
    () => computeQuote(selectedPackageIds, adults, children, barServiceId, addOnSelections, contact),
    [selectedPackageIds, adults, children, barServiceId, addOnSelections, contact],
  );

  const contactComplete = isContactComplete(contact);

  const requestQuote = async () => {
    if (!contactComplete) return;
    if (!isQuoteEndpointConfigured()) {
      window.open(quote.mailtoHref, '_blank', 'noopener');
      return;
    }
    setSubmitStatus('sending');
    const result = await submitQuotePdf(quote, adults, children, contact);
    if (result.ok) {
      setSubmitStatus('sent');
    } else {
      setSubmitStatus('error');
      window.open(quote.mailtoHref, '_blank', 'noopener');
    }
  };

  return (
    <section id="catering-section" style={{ padding: '64px 32px', background: 'oklch(97% 0.008 95)' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span style={{ font: "700 12px 'Inter'", letterSpacing: '.12em', color: COLORS.skyDeep }}>PARTY PACKAGES</span>
        <h2 style={{ font: "400 40px 'Anton', sans-serif", textTransform: 'uppercase', margin: '6px 0 0', color: 'oklch(22% 0.02 150)' }}>
          Casual Catering
        </h2>
        <div
          style={{
            font: "400 14px 'Inter'",
            color: 'oklch(42% 0.02 150)',
            maxWidth: '60ch',
            margin: '10px auto 0',
            textAlign: CATERING_INTRO_ALIGN,
          }}
        >
          <div>
            Whether you're throwing a backyard get-together, celebrating a milestone, feeding the office, or suddenly
            playing host to unexpected guests, our casual catering makes entertaining easy—and keeps you out of the
            kitchen.
          </div>
          <div>
            <br />
          </div>
          <div>Build your quote below and we'll confirm the final pricing after a quick chat to make sure everything is just right.</div>
        </div>
      </div>

      <div className="two-col-grid" style={{ display: 'grid', gap: 20, maxWidth: 820, margin: '0 auto 36px' }}>
        {CATERING_PACKAGES.map((pkg) => {
          const checked = selectedPackageIds.includes(pkg.id);
          const expanded = expandedPackageId === pkg.id;
          return (
            <div
              key={pkg.id}
              style={{
                padding: 22,
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                background: checked ? COLORS.green : 'oklch(100% 0 0)',
                color: checked ? 'oklch(97% 0.01 95)' : 'oklch(22% 0.02 150)',
                border: `2px solid ${checked ? COLORS.gold : 'oklch(90% 0.01 95)'}`,
                boxShadow: '0 2px 8px oklch(0% 0 0 / 0.06)',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePackage(pkg.id)}
                  style={{ marginTop: 4, accentColor: COLORS.gold }}
                />
                <div>
                  <div style={{ font: "800 18px 'Inter'" }}>{pkg.name}</div>
                  <div style={{ font: "400 12.5px/1.5 'Inter'", opacity: 0.85, margin: '8px 0 0' }}>{pkg.summary}</div>
                </div>
              </label>
              <button
                onClick={() => setExpandedPackageId(expanded ? null : pkg.id)}
                style={{
                  marginTop: 14,
                  alignSelf: 'flex-start',
                  padding: '7px 14px',
                  borderRadius: 7,
                  border: '1.5px solid currentColor',
                  background: 'transparent',
                  color: 'inherit',
                  font: "700 12px 'Inter'",
                }}
              >
                {expanded ? 'Hide Details' : "What's Included"}
              </button>
              {expanded && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {pkg.details.map((d) => (
                    <div key={d} style={{ font: "400 12.5px/1.5 'Inter'", opacity: 0.9 }}>
                      • {d}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="two-col-grid" style={{ maxWidth: 1000, margin: '0 auto 40px', display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ font: "700 13px 'Inter'", color: 'oklch(35% 0.02 150)' }}>Adults: {adults}</label>
          <input
            type="range"
            min={10}
            max={200}
            step={1}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            style={{ width: '100%', accentColor: COLORS.skyDeep }}
          />
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ font: "700 13px 'Inter'", color: 'oklch(35% 0.02 150)' }}>Children: {children}</label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            style={{ width: '100%', accentColor: COLORS.goldDeep }}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ font: "400 28px 'Anton', sans-serif", textTransform: 'uppercase', color: 'oklch(22% 0.02 150)', margin: 0 }}>
          Bar Service
        </h3>
        <p style={{ font: "400 13.5px 'Inter'", color: 'oklch(42% 0.02 150)', margin: '6px 0 0' }}>
          Beer, wine, cider, liquor, hard seltzer, soft drinks, mocktails &amp; non-alcoholic — staffed by our bartenders.
        </p>
      </div>

      <div className="two-col-grid" style={{ display: 'grid', gap: 20, maxWidth: 820, margin: '0 auto 28px' }}>
        {ALCOHOL_TIERS.map((tier) => {
          const isNone = tier.id === 'none';
          const selected = barServiceId === tier.id;
          const expanded = expandedBarId === tier.id;
          return (
            <div
              key={tier.id}
              style={{
                padding: 20,
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                gridColumn: isNone ? '1 / -1' : 'auto',
                background: selected ? COLORS.goldDeep : 'oklch(100% 0 0)',
                color: selected ? 'oklch(98% 0.01 90)' : 'oklch(22% 0.02 150)',
                border: `2px solid ${selected ? COLORS.goldDeep : 'oklch(90% 0.01 95)'}`,
                boxShadow: '0 2px 8px oklch(0% 0 0 / 0.06)',
              }}
            >
              <div onClick={() => selectBar(tier.id)} style={{ cursor: 'pointer' }}>
                <div style={{ font: "800 16px 'Inter'" }}>
                  {tier.emoji ? `${tier.emoji} ${tier.name}` : tier.name}
                </div>
                {tier.tagline && (
                  <>
                    <div style={{ font: "700 12px 'Inter'", fontStyle: 'italic', opacity: 0.9, marginTop: 6 }}>{tier.tagline}</div>
                    <div style={{ font: "400 12.5px/1.55 'Inter'", opacity: 0.85, marginTop: 6 }}>{tier.desc}</div>
                  </>
                )}
              </div>
              {!isNone && (
                <button
                  onClick={() => setExpandedBarId(expanded ? null : tier.id)}
                  style={{
                    marginTop: 12,
                    alignSelf: 'flex-start',
                    padding: '6px 12px',
                    borderRadius: 7,
                    border: '1.5px solid currentColor',
                    background: 'transparent',
                    color: 'inherit',
                    font: "700 11.5px 'Inter'",
                  }}
                >
                  {expanded ? 'Hide Details' : "What's Included"}
                </button>
              )}
              {expanded && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {tier.includes && (
                    <div>
                      <div style={{ font: "700 11px 'Inter'", letterSpacing: '.04em', opacity: 0.9, marginBottom: 4 }}>INCLUDES</div>
                      {tier.includes.map((line) => (
                        <div key={line} style={{ font: "400 12px/1.6 'Inter'", opacity: 0.85 }}>
                          • {line}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ font: "600 11.5px/1.5 'Inter'", opacity: 0.9 }}>Perfect for: {tier.perfectFor}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto 40px' }}>
        <div style={{ font: "700 13px 'Inter'", color: 'oklch(35% 0.02 150)', marginBottom: 4 }}>Add-Ons</div>
        {addOnsLocked && (
          <p style={{ font: "400 12.5px 'Inter'", color: 'oklch(45% 0.02 150)', margin: '0 0 10px' }}>
            Select a Bar Service package above to unlock add-ons.
          </p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {ADD_ONS.map((addOn) => {
            const checked = !!addOnSelections[addOn.id];
            const expanded = expandedAddOnId === addOn.id;
            return (
              <div
                key={addOn.id}
                style={{
                  borderRadius: 9,
                  border: '1px solid oklch(90% 0.01 95)',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  background: checked ? 'oklch(95% 0.03 85)' : 'oklch(100% 0 0)',
                  opacity: addOnsLocked ? 0.5 : 1,
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={addOnsLocked}
                    onChange={() => toggleAddOn(addOn.id)}
                    style={{ accentColor: COLORS.goldDeep }}
                  />
                  <span style={{ flex: 1, font: "600 13px 'Inter'" }}>{addOn.label}</span>
                </label>
                <button
                  onClick={() => setExpandedAddOnId(expanded ? null : addOn.id)}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '5px 11px',
                    borderRadius: 6,
                    border: '1px solid oklch(80% 0.01 150)',
                    background: 'transparent',
                    color: 'oklch(35% 0.02 150)',
                    font: "700 11px 'Inter'",
                  }}
                >
                  {expanded ? 'Hide Details' : 'Details'}
                </button>
                {expanded && <div style={{ font: "400 12px/1.5 'Inter'", color: 'oklch(42% 0.02 150)' }}>{addOn.detail}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '28px 32px', borderRadius: 16, background: COLORS.green, color: 'oklch(97% 0.01 95)' }}>
        <div style={{ font: "400 22px 'Anton', sans-serif", textTransform: 'uppercase', color: COLORS.gold, marginBottom: 14 }}>
          Your Quote Estimate
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', font: "800 20px 'Inter'" }}>
          <span>Estimated Total</span>
          <span style={{ color: COLORS.gold }}>${quote.grandTotal}</span>
        </div>
        <p style={{ font: "400 11.5px/1.5 'Inter'", opacity: 0.7, margin: '14px 0 0' }}>
          A $250 non-refundable deposit secures your date. All packages include insurance liability. Travel fees for
          Off-Site/Private events beyond 30 miles discussed upon consultation.
        </p>

        <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px dotted oklch(96% 0.01 95 / 0.2)' }}>
          <div style={{ font: "700 13px 'Inter'", marginBottom: 10 }}>Your Info</div>
          <div className="two-col-grid" style={{ display: 'grid', gap: 10, marginBottom: 10 }}>
            <input
              type="text"
              placeholder="First Name"
              value={contact.firstName}
              onChange={updateContact('firstName')}
              style={CONTACT_INPUT_STYLE}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={contact.lastName}
              onChange={updateContact('lastName')}
              style={CONTACT_INPUT_STYLE}
            />
          </div>
          <div className="two-col-grid" style={{ display: 'grid', gap: 10 }}>
            <input
              type="email"
              placeholder="Email"
              value={contact.email}
              onChange={updateContact('email')}
              style={CONTACT_INPUT_STYLE}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={contact.phone}
              onChange={updateContact('phone')}
              style={CONTACT_INPUT_STYLE}
            />
          </div>
          <div className="two-col-grid" style={{ display: 'grid', gap: 10, marginTop: 10 }}>
            <div style={{ display: 'grid', gap: 4 }}>
              <label style={{ font: "600 11px 'Inter'", opacity: 0.75 }}>Tentative Event Date</label>
              <input
                type="date"
                min={MIN_EVENT_DATE}
                value={contact.eventDate}
                onChange={updateContact('eventDate')}
                style={CONTACT_INPUT_STYLE}
              />
            </div>
            <div style={{ display: 'grid', gap: 4 }}>
              <label style={{ font: "600 11px 'Inter'", opacity: 0.75 }}>Alternative Date (optional)</label>
              <input
                type="date"
                min={MIN_EVENT_DATE}
                value={contact.altDate}
                onChange={updateContact('altDate')}
                style={CONTACT_INPUT_STYLE}
              />
            </div>
          </div>
          <p style={{ font: "400 11px 'Inter'", opacity: 0.6, margin: '6px 0 0' }}>
            We require at least 7 days' notice to book an event.
          </p>
        </div>

        <button
          onClick={requestQuote}
          disabled={submitStatus === 'sending' || !contactComplete}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 16,
            padding: '13px 0',
            borderRadius: 9,
            border: 'none',
            background: COLORS.gold,
            color: 'oklch(20% 0.03 90)',
            font: "800 14px 'Inter'",
            opacity: submitStatus === 'sending' || !contactComplete ? 0.5 : 1,
            cursor: submitStatus === 'sending' || !contactComplete ? 'not-allowed' : 'pointer',
          }}
        >
          {submitStatus === 'sending' ? 'Sending…' : 'Request This Quote'}
        </button>
        {!contactComplete && (
          <p style={{ font: "400 11.5px 'Inter'", opacity: 0.7, textAlign: 'center', margin: '10px 0 0' }}>
            Fill in your name, email, phone, and event date above so we can follow up.
          </p>
        )}
        {submitStatus === 'sent' && (
          <p style={{ font: "600 12.5px 'Inter'", color: COLORS.gold, textAlign: 'center', margin: '10px 0 0' }}>
            Quote sent! We'll be in touch soon — check your email for a copy.
          </p>
        )}
        {submitStatus === 'error' && (
          <p style={{ font: "600 12.5px 'Inter'", color: 'oklch(80% 0.12 40)', textAlign: 'center', margin: '10px 0 0' }}>
            Something went wrong sending automatically — opening your email client instead.
          </p>
        )}
      </div>
    </section>
  );
}
