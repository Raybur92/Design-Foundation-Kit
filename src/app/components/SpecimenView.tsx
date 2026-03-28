import React, { useState } from 'react';
import {
  Settings,
  ScaleStep,
  generateScale,
  exportTokens,
  exportAllDevices,
  ExportFormat,
} from '../utils/scale';

type DeviceTab = 'mobile' | 'desktop' | 'compare';

interface SpecimenViewProps {
  settings: Settings;
}

const BORDER = 'rgba(255,255,255,0.08)';
const ROW_BORDER = 'rgba(255,255,255,0.06)';
const DIM = 'rgba(255,255,255,0.35)';
const MID = 'rgba(255,255,255,0.5)';
const DIMMEST = 'rgba(255,255,255,0.12)';
const ACCENT = 'linear-gradient(135deg, #7B6EE8, #9B3B6E)';
const SOLID = '#7B6EE8';
const WHITE = '#FFFFFF';

// ── Scale Table ──────────────────────────────────────────────────────────────

interface ScaleTableProps {
  steps: ScaleStep[];
  font: string;
  compact?: boolean;
  previewText: string;
}

function ScaleTable({ steps, font, compact = false, previewText }: ScaleTableProps) {
  const thStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 10,
    color: DIM,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    fontWeight: 400,
    textAlign: 'left',
    paddingBottom: 10,
    paddingRight: 16,
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
          <th style={{ ...thStyle, width: compact ? 42 : 52 }}>Step</th>
          <th style={{ ...thStyle, width: compact ? 90 : 120 }}>Size</th>
          {!compact && <th style={{ ...thStyle, width: 80 }}>Role</th>}
          {!compact && <th style={{ ...thStyle, width: 40 }}>LH</th>}
          {!compact && <th style={{ ...thStyle, width: 40 }}>A11y</th>}
          <th style={{ ...thStyle, paddingRight: 0 }}>Preview</th>
        </tr>
      </thead>
      <tbody>
        {[...steps].reverse().map((step) => {
          const isA11yFail = !compact && !step.a11y.pass && !step.isBase;
          return (
            <tr
              key={step.stepIndex}
              style={{
                background: step.isBase
                  ? 'rgba(255,255,255,0.04)'
                  : isA11yFail
                  ? 'rgba(164,107,250,0.05)'
                  : 'transparent',
                borderBottom: `1px solid ${ROW_BORDER}`,
                borderLeft: isA11yFail ? `2px solid ${SOLID}` : '2px solid transparent',
              }}
            >
              {/* Step name */}
              <td style={{ padding: '10px 16px 10px 0', verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {step.isBase ? (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 6, flexShrink: 0 }} />
                  )}
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: step.isBase ? WHITE : MID }}>
                    {step.name}
                  </span>
                </div>
              </td>

              {/* Size value */}
              <td style={{ padding: '10px 16px 10px 0', verticalAlign: 'middle' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: step.isBase ? WHITE : MID }}>
                  {step.formattedValue}
                </span>
              </td>

              {/* Semantic role */}
              {!compact && (
                <td style={{ padding: '10px 16px 10px 0', verticalAlign: 'middle' }}>
                  <span style={{ fontSize: 11, color: MID }}>{step.semanticRole}</span>
                </td>
              )}

              {/* Line height */}
              {!compact && (
                <td style={{ padding: '10px 16px 10px 0', verticalAlign: 'middle' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: MID }}>{step.lineHeight}</span>
                </td>
              )}

              {/* A11y */}
              {!compact && (
                <td style={{ padding: '10px 16px 10px 0', verticalAlign: 'middle' }}>
                  {step.a11y.pass ? (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
                  ) : (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: SOLID }} title={step.a11y.reason} />
                  )}
                </td>
              )}

              {/* Preview */}
              <td style={{ padding: '10px 0', verticalAlign: 'middle', overflow: 'hidden', maxWidth: 0, width: '100%' }}>
                <span
                  style={{
                    fontFamily: font,
                    fontSize: `${compact ? Math.min(step.pxValue, 28) : step.pxValue}px`,
                    lineHeight: step.lineHeight,
                    color: 'rgba(255,255,255,0.9)',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {previewText}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ── Specimen View ────────────────────────────────────────────────────────────

export function SpecimenView({ settings }: SpecimenViewProps) {
  const [activeTab, setActiveTab] = useState<DeviceTab>('desktop');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const tabs: { id: DeviceTab; label: string }[] = [
    { id: 'mobile', label: 'Mobile' },
    { id: 'desktop', label: 'Desktop' },
    { id: 'compare', label: 'Compare all' },
  ];

  const mobileScale = generateScale(settings.mobileBase, settings.ratio, settings.stepsUp, settings.stepsDown, settings.unit);
  const desktopScale = generateScale(settings.desktopBase, settings.ratio, settings.stepsUp, settings.stepsDown, settings.unit);

  const activeScale = activeTab === 'mobile' ? mobileScale : desktopScale;

  const activeBase = activeTab === 'mobile' ? settings.mobileBase : settings.desktopBase;

  const getExportText = () => {
    if (activeTab === 'compare') return exportAllDevices(mobileScale, desktopScale, exportFormat);
    return exportTokens(activeScale, exportFormat);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getExportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = getExportText();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportPreview = getExportText().split('\n').slice(0, 2).join(' ');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', color: WHITE }}>

      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${BORDER}`,
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          background: 'transparent',
          zIndex: 10,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 12px',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? `2px solid ${SOLID}` : '2px solid transparent',
              marginBottom: -1,
              marginRight: 4,
              color: activeTab === tab.id ? WHITE : DIM,
              transition: 'color 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}

        {/* Ratio + steps badges */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, borderRadius: 3 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: DIM }}>×{settings.ratio}</span>
          </div>
          <div style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, borderRadius: 3 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: DIM }}>{settings.stepsDown + 1 + settings.stepsUp} steps</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'compare' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100%' }}>
            {[
              { label: 'Mobile', scale: mobileScale, base: settings.mobileBase },
              { label: 'Desktop', scale: desktopScale, base: settings.desktopBase },
            ].map(({ label, scale, base }, i) => (
              <div
                key={label}
                style={{
                  padding: 20,
                  borderRight: i < 1 ? `1px solid ${BORDER}` : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: DIM, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{base}px base</span>
                </div>
                <ScaleTable steps={scale} font={settings.font} compact previewText={settings.previewText ?? ''} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '20px 24px' }}>
            {/* Info bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              {[
                { label: 'Base', value: `${activeBase}px` },
                { label: 'Ratio', value: String(settings.ratio) },
                { label: 'Unit', value: settings.unit },
              ].map(({ label, value }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div style={{ width: 1, height: 12, background: BORDER }} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: DIM }}>{label}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: DIM }}>{value}</span>
                  </div>
                </React.Fragment>
              ))}
              <div style={{ width: 1, height: 12, background: BORDER }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: DIM }}>= base step</span>
              </div>
            </div>

            <ScaleTable steps={activeScale} font={settings.font} previewText={settings.previewText ?? ''} />
          </div>
        )}
      </div>

      {/* Export row */}
      <div
        style={{
          borderTop: `1px solid ${BORDER}`,
          padding: '14px 24px',
          background: 'transparent',
          position: 'sticky',
          bottom: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Format selector */}
          <div style={{ position: 'relative' }}>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${DIMMEST}`,
                borderRadius: 4,
                fontSize: 12,
                color: WHITE,
                padding: '6px 28px 6px 10px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="css" style={{ background: '#1a0f1e' }}>CSS custom properties</option>
              <option value="scss" style={{ background: '#1a0f1e' }}>SCSS variables</option>
              <option value="json" style={{ background: '#1a0f1e' }}>JSON tokens</option>
            </select>
            <div style={{ pointerEvents: 'none', position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M1 1l3 3 3-3" stroke={DIM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              border: 'none',
              borderRadius: 4,
              background: copied ? '#22c55e' : ACCENT,
              color: WHITE,
              transition: 'background 0.15s',
            }}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="4" y="4" width="7" height="7" rx="1" stroke="white" strokeWidth="1.2" />
                  <path d="M8 4V2.5A.5.5 0 007.5 2h-6a.5.5 0 00-.5.5v6a.5.5 0 00.5.5H3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Copy tokens
              </>
            )}
          </button>

          {/* Preview snippet */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              padding: '6px 12px',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${BORDER}`,
              overflow: 'hidden',
            }}
          >
            <code style={{ fontFamily: 'monospace', fontSize: 10, color: DIM, whiteSpace: 'nowrap', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {exportPreview}{getExportText().split('\n').length > 2 ? ' …' : ''}
            </code>
          </div>

          {activeTab === 'compare' && (
            <div style={{ flexShrink: 0, fontFamily: 'monospace', fontSize: 10, color: DIM }}>
              Exports all 3 devices
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
