import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Settings, DEFAULT_SETTINGS } from './utils/scale';
import { ControlPanel } from './components/ControlPanel';
import { SpecimenView } from './components/SpecimenView';
import { LandingPage } from './LandingPage';

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

function TypeScaleApp() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const prevBaseSize = useRef(DEFAULT_SETTINGS.baseSize);

  const handleChange = (next: Settings) => {
    const baseSizeChanged = next.baseSize !== settings.baseSize;
    const deviceBasesChanged =
      next.mobileBase !== settings.mobileBase ||
      next.tabletBase !== settings.tabletBase ||
      next.desktopBase !== settings.desktopBase;

    if (baseSizeChanged) {
      const delta = next.baseSize - prevBaseSize.current;
      prevBaseSize.current = next.baseSize;
      setSettings({
        ...next,
        mobileBase:  clamp(next.mobileBase  + delta, 8, 32),
        tabletBase:  clamp(next.tabletBase  + delta, 8, 32),
        desktopBase: clamp(next.desktopBase + delta, 8, 32),
      });
    } else if (deviceBasesChanged) {
      const avg = Math.round((next.mobileBase + next.tabletBase + next.desktopBase) / 3);
      const synced = clamp(avg, 12, 24);
      prevBaseSize.current = synced;
      setSettings({ ...next, baseSize: synced });
    } else {
      setSettings(next);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #120810 0%, #080812 50%, #060810 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Left column: Control Panel */}
      <div
        style={{
          width: 288,
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          overflowY: 'auto',
          background: '#0D0812',
        }}
      >
        <ControlPanel settings={settings} onChange={handleChange} />
      </div>

      {/* Right column: Specimen View */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundAttachment: 'fixed',
        }}
      >
        <SpecimenView settings={settings} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<TypeScaleApp />} />
      </Routes>
    </BrowserRouter>
  );
}
