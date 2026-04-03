import React from 'react';
import { Settings, RATIOS, FONTS, FontCategory, Unit } from '../utils/scale';

interface ControlPanelProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
}

const BORDER = 'rgba(255,255,255,0.08)';
const DIM = 'rgba(255,255,255,0.35)';
const DIMMEST = 'rgba(255,255,255,0.12)';
const ACCENT = 'linear-gradient(135deg, #7B6EE8, #9B3B6E)';
const SOLID = '#7B6EE8';
const WHITE = '#FFFFFF';
const MONO = "'IBM Plex Mono', monospace";
const SANS = "'IBM Plex Sans', sans-serif";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 10.1,
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
        letterSpacing: '0.01em',
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}` }}>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: `1px solid ${DIMMEST}`,
  borderRadius: 4,
  fontFamily: SANS,
  fontSize: 13.5,
  color: WHITE,
  padding: '6px 10px',
  outline: 'none',
  boxSizing: 'border-box',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: `1px solid ${DIMMEST}`,
  borderRadius: 4,
  fontFamily: SANS,
  fontSize: 13.5,
  color: WHITE,
  padding: '6px 10px',
  outline: 'none',
  appearance: 'none',
  cursor: 'pointer',
  boxSizing: 'border-box',
};

export function ControlPanel({ settings, onChange }: ControlPanelProps) {
  const set = (partial: Partial<Settings>) => onChange({ ...settings, ...partial });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', color: WHITE }}>

      {/* Header */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${BORDER}` }}>
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginBottom: 14,
            textDecoration: 'none',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7 2L3 6l4 4" stroke={DIM} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: MONO, fontSize: 10.1, color: DIM, letterSpacing: '0.01em' }}>back to home</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{ width: 16, height: 16, background: ACCENT, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 8, color: WHITE, fontWeight: 700, lineHeight: 1 }}>T</span>
          </div>
          <span style={{ fontFamily: SANS, fontSize: 24, fontWeight: 500, color: WHITE, letterSpacing: '0' }}>Type Scale</span>
        </div>
        <p style={{ fontFamily: MONO, fontSize: 10.1, color: 'rgba(255,255,255,0.5)', margin: 0, paddingLeft: 24, letterSpacing: '0.01em' }}>Generator & Token Exporter</p>
      </div>

      {/* Base Font Size */}
      <Section>
        <SectionLabel>Base Font Size</SectionLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="range"
            min={12}
            max={24}
            step={1}
            value={settings.baseSize}
            onChange={(e) => set({ baseSize: Number(e.target.value) })}
            style={{ flex: 1, height: 4, cursor: 'pointer', accentColor: SOLID }}
          />
          <div style={{ width: 52, border: `1px solid ${DIMMEST}`, borderRadius: 4, padding: '4px 8px', textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
            <span style={{ fontFamily: MONO, fontSize: 13.5, letterSpacing: '0.01em', color: WHITE }}>{settings.baseSize}px</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontFamily: MONO, fontSize: 10.1, letterSpacing: '0.01em', color: DIMMEST }}>12px</span>
          <span style={{ fontFamily: MONO, fontSize: 10.1, letterSpacing: '0.01em', color: DIMMEST }}>24px</span>
        </div>
      </Section>

      {/* Scale Ratio */}
      <Section>
        <SectionLabel>Scale Ratio</SectionLabel>
        <div style={{ position: 'relative' }}>
          <select
            value={settings.ratio}
            onChange={(e) => set({ ratio: Number(e.target.value) })}
            style={selectStyle}
          >
            {RATIOS.map((r) => (
              <option key={r.value} value={r.value} style={{ background: '#1a0f1e' }}>{r.label} · {r.value}</option>
            ))}
          </select>
          <div style={{ pointerEvents: 'none', position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke={DIM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Section>

      {/* Steps */}
      <Section>
        <SectionLabel>Steps</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10.1, letterSpacing: '0.01em', color: DIM, marginBottom: 6 }}>Steps up</div>
            <input
              type="number"
              min={1}
              max={8}
              value={settings.stepsUp}
              onChange={(e) => set({ stepsUp: Math.max(1, Math.min(8, Number(e.target.value))) })}
              style={{ ...inputStyle, textAlign: 'center', colorScheme: 'dark' }}
            />
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10.1, letterSpacing: '0.01em', color: DIM, marginBottom: 6 }}>Steps down</div>
            <input
              type="number"
              min={0}
              max={4}
              value={settings.stepsDown}
              onChange={(e) => set({ stepsDown: Math.max(0, Math.min(4, Number(e.target.value))) })}
              style={{ ...inputStyle, textAlign: 'center', colorScheme: 'dark' }}
            />
          </div>
        </div>
      </Section>

      {/* Unit Output */}
      <Section>
        <SectionLabel>Unit Output</SectionLabel>
        <div style={{ display: 'flex', border: `1px solid ${DIMMEST}`, borderRadius: 4, overflow: 'hidden' }}>
          {(['px', 'rem', 'fluid'] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => set({ unit: u })}
              style={{
                flex: 1,
                padding: '7px 0',
                fontFamily: MONO,
                fontSize: 13.5,
                fontWeight: 400,
                letterSpacing: '0.01em',
                cursor: 'pointer',
                border: 'none',
                background: settings.unit === u ? SOLID : 'transparent',
                color: settings.unit === u ? WHITE : DIM,
                transition: 'color 0.1s',
              }}
            >
              {u}
            </button>
          ))}
        </div>
      </Section>

      {/* Preview Font */}
      <Section>
        <SectionLabel>Preview Font</SectionLabel>
        <div style={{ position: 'relative' }}>
          <select
            value={settings.font}
            onChange={(e) => set({ font: e.target.value })}
            style={selectStyle}
          >
            {(
              [
                { id: 'system' as FontCategory, label: 'System' },
                { id: 'sans' as FontCategory, label: 'Sans-serif' },
                { id: 'serif' as FontCategory, label: 'Serif' },
                { id: 'mono' as FontCategory, label: 'Monospace' },
                { id: 'display' as FontCategory, label: 'Display' },
              ] as { id: FontCategory; label: string }[]
            ).map(({ id, label }) => (
              <optgroup key={id} label={label} style={{ background: '#1a0f1e', color: 'rgba(255,255,255,0.4)' }}>
                {FONTS.filter((f) => f.category === id).map((f) => (
                  <option key={f.value} value={f.value} style={{ background: '#1a0f1e', color: '#ffffff' }}>{f.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <div style={{ pointerEvents: 'none', position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke={DIM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            padding: '8px 12px',
            borderRadius: 4,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${BORDER}`,
            fontFamily: settings.font,
            fontSize: 13,
            color: DIM,
          }}
        >
          The quick brown fox jumps
        </div>
      </Section>

      {/* Preview Text */}
      <Section>
        <SectionLabel>Preview Text</SectionLabel>
        <input
          type="text"
          value={settings.previewText ?? ''}
          onChange={(e) => set({ previewText: e.target.value })}
          placeholder="Type preview text…"
          style={inputStyle}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8 }}>
          {[
            'The quick brown fox',
            'Sphinx of black quartz',
            'AaBbCcDd 0123',
            'Gg Pp Qq',
          ].map((preset) => (
            <button
              key={preset}
              onClick={() => set({ previewText: preset })}
              style={{
                padding: '6px 8px',
                borderRadius: 3,
                fontFamily: SANS,
                fontSize: 10.1,
                textAlign: 'left',
                cursor: 'pointer',
                border: 'none',
                lineHeight: 1.3,
                background: settings.previewText === preset ? SOLID : 'rgba(255,255,255,0.05)',
                color: settings.previewText === preset ? WHITE : DIM,
                transition: 'color 0.1s',
              }}
            >
              {preset}
            </button>
          ))}
        </div>
      </Section>

      {/* Per-Device Base Size */}
      <Section>
        <SectionLabel>Per-Device Base Size</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { key: 'mobileBase' as keyof Settings, label: 'Mobile' },
            { key: 'desktopBase' as keyof Settings, label: 'Desktop' },
          ].map(({ key, label }) => (
            <div key={key}>
              <div style={{ fontFamily: MONO, fontSize: 10.1, letterSpacing: '0.01em', color: DIM, marginBottom: 6 }}>{label}</div>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  min={8}
                  max={32}
                  value={settings[key] as number}
                  onChange={(e) => set({ [key]: Number(e.target.value) } as Partial<Settings>)}
                  style={{ ...inputStyle, textAlign: 'center', paddingRight: 20, colorScheme: 'dark' }}
                />
                <span style={{ pointerEvents: 'none', position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', fontFamily: MONO, fontSize: 10.1, letterSpacing: '0.01em', color: DIMMEST }}>
                  px
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer hint */}
      <div style={{ padding: '16px 20px', marginTop: 'auto' }}>
        <p style={{ fontFamily: MONO, fontSize: 10.1, letterSpacing: '0.01em', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>
          Scale formula: size = base × ratio^n<br />
          n = 0 is the base step <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22c55e', verticalAlign: 'middle' }} />
        </p>
      </div>

    </div>
  );
}
