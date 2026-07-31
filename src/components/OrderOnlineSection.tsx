import { COLORS, ORDER_CHANNELS, type OrderChannel } from '../data';

function ChannelCard({ channel }: { channel: OrderChannel }) {
  const cardStyle = {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    padding: '24px 16px',
    borderRadius: 14,
    background: 'oklch(100% 0 0)',
    boxShadow: '0 1px 3px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)',
    textDecoration: 'none',
    opacity: channel.url ? 1 : 0.65,
  };

  const content = (
    <>
      <div style={{ fontSize: 40, lineHeight: 1 }}>{channel.icon}</div>
      <div style={{ font: "800 15px 'Inter'", color: 'oklch(22% 0.02 150)', marginTop: 10 }}>{channel.label}</div>
      {channel.url ? (
        <div style={{ font: "700 11px 'Inter'", color: COLORS.skyDeep, marginTop: 6 }}>Order Now →</div>
      ) : (
        <div style={{ font: "700 11px 'Inter'", color: 'oklch(55% 0.02 150)', marginTop: 6 }}>Coming Soon</div>
      )}
    </>
  );

  if (channel.url) {
    return (
      <a href={channel.url} target="_blank" rel="noopener" style={cardStyle}>
        {content}
      </a>
    );
  }
  return <div style={cardStyle}>{content}</div>;
}

export default function OrderOnlineSection() {
  const takeout = ORDER_CHANNELS.filter((c) => c.group === 'Takeout');
  const delivery = ORDER_CHANNELS.filter((c) => c.group === 'Delivery');

  return (
    <section id="order-section" style={{ padding: '64px 32px', background: 'oklch(98% 0.006 95)' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span style={{ font: "700 12px 'Inter'", letterSpacing: '.12em', color: COLORS.skyDeep }}>TAKEOUT &amp; DELIVERY</span>
        <h2 style={{ font: "400 40px 'Anton', sans-serif", textTransform: 'uppercase', margin: '6px 0 0', color: 'oklch(22% 0.02 150)' }}>
          Order Online
        </h2>
        <p style={{ font: "400 14px 'Inter'", color: 'oklch(45% 0.02 150)', maxWidth: '56ch', margin: '10px auto 0' }}>
          4 easy ways to get your UPCYCLE fix.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <div style={{ font: "700 13px 'Inter'", letterSpacing: '.06em', color: COLORS.goldDeep, marginBottom: 4 }}>TAKEOUT</div>
          <p style={{ font: "400 13px 'Inter'", color: 'oklch(45% 0.02 150)', margin: '0 0 16px' }}>
            Direct order for on-site pickup
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {takeout.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
        <div>
          <div style={{ font: "700 13px 'Inter'", letterSpacing: '.06em', color: COLORS.goldDeep, marginBottom: 4 }}>DELIVERY</div>
          <p style={{ font: "400 13px 'Inter'", color: 'oklch(45% 0.02 150)', margin: '0 0 16px' }}>Online channel partners</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {delivery.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
