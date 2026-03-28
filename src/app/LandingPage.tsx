import { useNavigate } from 'react-router';
import pluginScreenshot from '../assets/plugin-screenshot.png';

// ── Constants ─────────────────────────────────────────────────────────────────
const FIGMA_URL = 'https://www.figma.com/community';
const LEMONSQUEEZY_URL = '#';

const ACCENT = 'linear-gradient(135deg, #7B6EE8, #9B3B6E)';   // filled buttons & dots
const ACCENT_H = 'linear-gradient(90deg, #7B6EE8, #9B3B6E)';  // horizontal top lines
const SOLID = '#7B6EE8';                                        // text, borders, badges
const WHITE = '#FFFFFF';
const DIM = 'rgba(255,255,255,0.5)';
const DIMMER = 'rgba(255,255,255,0.12)';
const DIVIDER = 'rgba(255,255,255,0.08)';


// ── Token line ────────────────────────────────────────────────────────────────
function TokenLine({ prop, value }: { prop: string; value: string }) {
  return (
    <div className="flex items-center gap-1 leading-relaxed">
      <span style={{ color: '#7dd3fc' }}>{prop}</span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>:</span>
      <span style={{ color: '#86efac' }}> {value}</span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>;</span>
    </div>
  );
}

// ── Plugin card ───────────────────────────────────────────────────────────────
function PluginCard({
  name,
  description,
  status,
  index,
}: {
  name: string;
  description: string;
  status: 'available' | 'soon';
  index: number;
}) {
  const isAvailable = status === 'available';
  return (
    <div
      className="flex flex-col gap-5 p-6 relative overflow-hidden"
      style={{
        background: isAvailable ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: `1px solid ${isAvailable ? 'rgba(255,255,255,0.12)' : DIVIDER}`,
        borderRadius: 2,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 16,
          right: 20,
          fontFamily: 'monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.1)',
          letterSpacing: '0.1em',
        }}
      >
        {String(index).padStart(2, '0')}
      </span>

      <div className="flex items-start justify-between gap-3">
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: isAvailable ? WHITE : 'rgba(255,255,255,0.3)',
            letterSpacing: '-0.01em',
          }}
        >
          {name}
        </span>
        {isAvailable ? (
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: SOLID,
              border: `1px solid ${SOLID}`,
              padding: '2px 7px',
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            live
          </span>
        ) : (
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '2px 7px',
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            soon
          </span>
        )}
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: isAvailable ? DIM : 'rgba(255,255,255,0.35)',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {description}
      </p>

      {isAvailable && (
        <a
          href={FIGMA_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: SOLID,
            textDecoration: 'none',
            marginTop: 4,
          }}
        >
          install →
        </a>
      )}
    </div>
  );
}

// ── Featured plugin card ───────────────────────────────────────────────────────
function FeaturedPluginCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div
      className="flex flex-col gap-6 p-7 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.14)`,
        borderRadius: 2,
        gridRow: 'span 2',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: ACCENT_H,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 36,
              fontWeight: 400,
              color: WHITE,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {name}
          </p>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: SOLID,
              border: `1px solid ${SOLID}`,
              padding: '2px 7px',
              borderRadius: 2,
              flexShrink: 0,
              marginTop: 6,
            }}
          >
            available now
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {['variables', 'text styles', 'responsive'].map((tag, i) => (
            <span key={tag} style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                {tag}
              </span>
              {i < 2 && (
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.1)', margin: '0 8px' }}>
                  /
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: DIM,
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {description}
      </p>

      <a
        href={FIGMA_URL}
        target="_blank"
        rel="noreferrer"
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: '0.08em',
          color: SOLID,
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        install →
      </a>

      <span
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          fontFamily: 'monospace',
          fontSize: 80,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        01
      </span>
    </div>
  );
}

// ── Step ──────────────────────────────────────────────────────────────────────
function Step({ n, title, description }: { n: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          color: SOLID,
          letterSpacing: '0.1em',
        }}
      >
        {n.padStart(2, '0')} /
      </div>
      <div>
        <p
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 20,
            fontWeight: 400,
            color: WHITE,
            marginBottom: 10,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: DIM,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Pricing card ──────────────────────────────────────────────────────────────
function PricingCard({
  tier,
  price,
  sub,
  features,
  cta,
  href,
  highlight,
}: {
  tier: string;
  price: string;
  sub?: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-7 p-7"
      style={{
        background: highlight ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: highlight ? '1px solid rgba(255,255,255,0.16)' : `1px solid ${DIVIDER}`,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {highlight && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: ACCENT_H,
          }}
        />
      )}

      <div>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: highlight ? SOLID : 'rgba(255,255,255,0.3)',
            marginBottom: 16,
          }}
        >
          {tier}
        </p>
        <p
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 32,
            fontWeight: 400,
            color: WHITE,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: sub ? 6 : 0,
          }}
        >
          {price}
        </p>
        {sub && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: DIM, margin: 0 }}>
            {sub}
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: DIM,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: highlight ? SOLID : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600, marginTop: 1, flexShrink: 0 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={href}
        target={href === '#' ? undefined : '_blank'}
        rel="noreferrer"
        style={{
          marginTop: 'auto',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          textAlign: 'center' as const,
          padding: '11px 24px',
          borderRadius: 2,
          textDecoration: 'none',
          background: highlight ? ACCENT : 'transparent',
          color: highlight ? WHITE : DIM,
          border: highlight ? 'none' : `1px solid ${DIMMER}`,
          letterSpacing: '0.01em',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {cta}
      </a>
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'monospace',
        fontSize: 10,
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
        color: 'rgba(255,255,255,0.25)',
        marginBottom: 16,
        margin: '0 0 16px',
      }}
    >
      {children}
    </p>
  );
}

// ── Landing page ──────────────────────────────────────────────────────────────
export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{
      color: WHITE,
      background: 'linear-gradient(180deg, #120810 0%, #080812 50%, #060810 100%)',
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(180deg, #120810 0%, #080812 50%, #060810 100%)',
      backgroundSize: '24px 24px, 100% 100%',
      backgroundAttachment: 'fixed, fixed',
    }}>

      {/* Nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px',
          borderBottom: `1px solid ${DIVIDER}`,
          position: 'sticky',
          top: 0,
          background: 'rgba(12,8,16,0.92)',
          backdropFilter: 'blur(12px)',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: SOLID }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: WHITE,
              letterSpacing: '-0.01em',
            }}
          >
            design foundations kit
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => navigate('/app')}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: DIM,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '7px 14px',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = WHITE)}
            onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}
          >
            open app
          </button>
          <a
            href={LEMONSQUEEZY_URL}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: WHITE,
              background: ACCENT,
              textDecoration: 'none',
              padding: '7px 16px',
              borderRadius: 2,
              letterSpacing: '0.01em',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            get pro
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '96px 40px 64px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <SectionLabel>figma plugin suite by bed karma</SectionLabel>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: WHITE,
                margin: 0,
              }}
            >
              design foundations,{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>
                in seconds.
              </em>
            </h1>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: DIM,
              lineHeight: 1.7,
              maxWidth: '40ch',
              margin: 0,
            }}
          >
            A suite of Figma plugins that turns type scales, color ramps, and spacing systems
            into production-ready variables, without the manual grind.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: WHITE,
                background: ACCENT,
                textDecoration: 'none',
                padding: '11px 22px',
                borderRadius: 2,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              try free on figma
            </a>
            <a
              href={LEMONSQUEEZY_URL}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: DIM,
                background: 'transparent',
                textDecoration: 'none',
                padding: '11px 22px',
                border: `1px solid ${DIMMER}`,
                borderRadius: 2,
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.color = WHITE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = DIMMER;
                e.currentTarget.style.color = DIM;
              }}
            >
              get pro · €9/mo
            </a>
          </div>

          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            free tier available · no account required
          </p>
        </div>


        {/* Plugin screenshot + suite pills */}
        <div>
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
          >
            <img
              src={pluginScreenshot}
              alt="Type Scale Generator plugin screenshot"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          {/* Suite pills */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'nowrap' as const }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(123,110,232,0.12)', border: '1px solid rgba(123,110,232,0.3)', borderRadius: 100, padding: '4px 10px', flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7B6EE8', flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: WHITE }}>Type Scale Generator</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '4px 10px', flexShrink: 0 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Color Scale Generator, coming soon</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '4px 10px', flexShrink: 0 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Surface Foundations, coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${DIVIDER}` }} />

      {/* Plugin suite */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 40px' }}>
        <SectionLabel>the suite</SectionLabel>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 48,
          }}
        >
          three plugins,{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>one system.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 1, background: DIVIDER }}>
          <FeaturedPluginCard
            name="Type Scale Generator"
            description="Generate typography scales as Figma text styles and variables. Supports responsive multi-mode output."
          />
          <PluginCard index={2} name="Color Scale Generator" description="Build perceptually uniform color ramps from a single seed color, with automatic light and dark mode variables." status="soon" />
          <PluginCard index={3} name="Surface Foundations" description="Define spacing, radius and elevation tokens in one place. The structural layer of any robust design system." status="soon" />
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${DIVIDER}` }} />

      {/* How it works */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 40px' }}>
        <SectionLabel>workflow</SectionLabel>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 56,
          }}
        >
          configure, preview, apply.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          <Step n="1" title="Configure" description="Set your base size, scale ratio and preview font. Adjust per-device breakpoints if you need responsive tokens." />
          <Step n="2" title="Preview" description="See every step live before committing, with accessibility flags, line-height values and semantic role hints." />
          <Step n="3" title="Apply" description="Push the entire scale to Figma as text styles and variables in one click. Ready for handoff." />
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${DIVIDER}` }} />

      {/* Pricing */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 40px' }}>
        <SectionLabel>pricing</SectionLabel>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 48,
          }}
        >
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>start free,</em>{' '}go pro when ready.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: DIVIDER }}>
          <PricingCard
            tier="Free"
            price="€0"
            sub="forever"
            features={['Core scale generation', 'Text styles export', 'Single-mode variables', 'Style guide preview', 'CSS / SCSS / JSON export']}
            cta="try on figma"
            href={FIGMA_URL}
          />
          <PricingCard
            tier="Pro"
            price="€9"
            sub="per month · or €79/year"
            features={['Everything in free', 'Multi-device variables', 'Responsive variable binding', 'Per-step overrides', 'All future plugins']}
            cta="get pro"
            href={LEMONSQUEEZY_URL}
            highlight
          />
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${DIVIDER}` }} />

      {/* Footer */}
      <footer
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '32px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: SOLID }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            design foundations kit
          </span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0, textAlign: 'center' }}>
          made with love by <span style={{ color: 'rgba(255,255,255,0.4)' }}>bed karma</span>
        </p>
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em', textAlign: 'right' }}>
          v1.0
        </span>
      </footer>

    </div>
  );
}
