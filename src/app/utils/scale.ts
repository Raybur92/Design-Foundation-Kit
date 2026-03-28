export const STEP_NAMES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
export const SEMANTIC_ROLES = ['caption', 'label', 'body', 'subhead', 'heading', 'title', 'display'];

export const RATIOS = [
  { label: 'Minor Second', value: 1.067 },
  { label: 'Major Second', value: 1.125 },
  { label: 'Minor Third', value: 1.200 },
  { label: 'Major Third', value: 1.250 },
  { label: 'Perfect Fourth', value: 1.333 },
  { label: 'Augmented Fourth', value: 1.414 },
  { label: 'Perfect Fifth', value: 1.500 },
  { label: 'Golden Ratio', value: 1.618 },
];

export type FontCategory = 'system' | 'sans' | 'serif' | 'mono' | 'display';

export const FONTS: { label: string; value: string; category: FontCategory }[] = [
  // System
  { label: 'System sans-serif', value: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif', category: 'system' },
  { label: 'Georgia', value: 'Georgia, serif', category: 'system' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif', category: 'system' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace', category: 'system' },
  // Sans-serif
  { label: 'Inter', value: "'Inter', sans-serif", category: 'sans' },
  { label: 'DM Sans', value: "'DM Sans', sans-serif", category: 'sans' },
  { label: 'Plus Jakarta Sans', value: "'Plus Jakarta Sans', sans-serif", category: 'sans' },
  { label: 'Outfit', value: "'Outfit', sans-serif", category: 'sans' },
  { label: 'Manrope', value: "'Manrope', sans-serif", category: 'sans' },
  { label: 'Nunito', value: "'Nunito', sans-serif", category: 'sans' },
  { label: 'Work Sans', value: "'Work Sans', sans-serif", category: 'sans' },
  { label: 'Rubik', value: "'Rubik', sans-serif", category: 'sans' },
  { label: 'Geist', value: "'Geist', sans-serif", category: 'sans' },
  // Serif
  { label: 'Playfair Display', value: "'Playfair Display', serif", category: 'serif' },
  { label: 'Lora', value: "'Lora', serif", category: 'serif' },
  { label: 'Merriweather', value: "'Merriweather', serif", category: 'serif' },
  { label: 'DM Serif Display', value: "'DM Serif Display', serif", category: 'serif' },
  { label: 'Libre Baskerville', value: "'Libre Baskerville', serif", category: 'serif' },
  // Monospace
  { label: 'JetBrains Mono', value: "'JetBrains Mono', monospace", category: 'mono' },
  { label: 'Fira Code', value: "'Fira Code', monospace", category: 'mono' },
  { label: 'IBM Plex Mono', value: "'IBM Plex Mono', monospace", category: 'mono' },
  { label: 'Roboto Mono', value: "'Roboto Mono', monospace", category: 'mono' },
  // Display
  { label: 'Syne', value: "'Syne', sans-serif", category: 'display' },
  { label: 'Space Grotesk', value: "'Space Grotesk', sans-serif", category: 'display' },
  { label: 'Bricolage Grotesque', value: "'Bricolage Grotesque', sans-serif", category: 'display' },
];

export type Unit = 'px' | 'rem' | 'fluid';
export type ExportFormat = 'css' | 'scss' | 'json';

export interface ScaleStep {
  name: string;
  stepIndex: number;
  pxValue: number;
  formattedValue: string;
  semanticRole: string;
  isBase: boolean;
  lineHeight: number;
  a11y: { pass: boolean; reason?: string };
}

export interface Settings {
  baseSize: number;
  ratio: number;
  stepsUp: number;
  stepsDown: number;
  unit: Unit;
  font: string;
  previewText: string;
  mobileBase: number;
  tabletBase: number;
  desktopBase: number;
}

export const DEFAULT_SETTINGS: Settings = {
  baseSize: 16,
  ratio: 1.250,
  stepsUp: 5,
  stepsDown: 2,
  unit: 'px',
  font: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  previewText: 'The quick brown fox',
  mobileBase: 14,
  tabletBase: 16,
  desktopBase: 16,
};

export function formatValue(pxValue: number, unit: Unit, baseSize: number = 16): string {
  if (unit === 'px') {
    const rounded = Math.round(pxValue * 10) / 10;
    return `${rounded}px`;
  } else if (unit === 'rem') {
    return `${(pxValue / baseSize).toFixed(4)}rem`;
  } else {
    const min = (pxValue * 0.875).toFixed(2);
    const max = (pxValue * 1.125).toFixed(2);
    const vw = (pxValue / (baseSize * 0.75)).toFixed(4);
    return `clamp(${min}px, ${vw}vw, ${max}px)`;
  }
}

export function generateScale(
  baseSize: number,
  ratio: number,
  stepsUp: number,
  stepsDown: number,
  unit: Unit
): ScaleStep[] {
  const totalSteps = stepsDown + 1 + stepsUp;
  const steps: ScaleStep[] = [];

  for (let i = -stepsDown; i <= stepsUp; i++) {
    const pxValue = baseSize * Math.pow(ratio, i);
    const positionFromBottom = i + stepsDown;

    const nameIdx = Math.min(positionFromBottom, STEP_NAMES.length - 1);
    const name = STEP_NAMES[nameIdx];

    const roleIdx =
      totalSteps === 1
        ? Math.floor(SEMANTIC_ROLES.length / 2)
        : Math.round(
            (positionFromBottom / (totalSteps - 1)) * (SEMANTIC_ROLES.length - 1)
          );
    const semanticRole = SEMANTIC_ROLES[Math.min(roleIdx, SEMANTIC_ROLES.length - 1)];

    const lineHeight =
      pxValue >= 48 ? 1.1 :
      pxValue >= 32 ? 1.2 :
      pxValue >= 24 ? 1.3 :
      pxValue >= 18 ? 1.4 : 1.5;

    const a11y: { pass: boolean; reason?: string } =
      pxValue < 11
        ? { pass: false, reason: 'Too small (below 11px minimum)' }
        : pxValue < 16 && i === 0
        ? { pass: false, reason: 'Body text below 16px recommended minimum' }
        : pxValue < 14
        ? { pass: false, reason: 'Below 14px; use only for non-essential labels' }
        : { pass: true };

    steps.push({
      name,
      stepIndex: i,
      pxValue,
      formattedValue: formatValue(pxValue, unit, baseSize),
      semanticRole,
      isBase: i === 0,
      lineHeight,
      a11y,
    });
  }

  return steps;
}

export function exportTokens(
  steps: ScaleStep[],
  format: ExportFormat,
  prefix?: string
): string {
  const p = prefix ? `${prefix}-` : '';
  if (format === 'css') {
    const lines = steps.map((s) => `  --${p}text-${s.name}: ${s.formattedValue};`).join('\n');
    return `:root {\n${lines}\n}`;
  } else if (format === 'scss') {
    return steps.map((s) => `$${p}text-${s.name}: ${s.formattedValue};`).join('\n');
  } else {
    const sizes: Record<string, string> = {};
    steps.forEach((s) => {
      sizes[s.name] = s.formattedValue;
    });
    return JSON.stringify({ typography: { fontSize: sizes } }, null, 2);
  }
}

export function exportAllDevices(
  mobileSteps: ScaleStep[],
  desktopSteps: ScaleStep[],
  format: ExportFormat
): string {
  if (format === 'css') {
    const sections = [
      { label: 'Mobile', steps: mobileSteps, prefix: 'mobile' },
      { label: 'Desktop', steps: desktopSteps, prefix: 'desktop' },
    ];
    return sections
      .map(({ label, steps, prefix }) => {
        const lines = steps.map((s) => `  --${prefix}-text-${s.name}: ${s.formattedValue};`).join('\n');
        return `/* ${label} */\n:root {\n${lines}\n}`;
      })
      .join('\n\n');
  } else if (format === 'scss') {
    const sections = [
      { label: 'Mobile', steps: mobileSteps, prefix: 'mobile' },
      { label: 'Desktop', steps: desktopSteps, prefix: 'desktop' },
    ];
    return sections
      .map(({ label, steps, prefix }) => {
        const lines = steps.map((s) => `$${prefix}-text-${s.name}: ${s.formattedValue};`).join('\n');
        return `// ${label}\n${lines}`;
      })
      .join('\n\n');
  } else {
    const toObj = (steps: ScaleStep[]) => {
      const sizes: Record<string, string> = {};
      steps.forEach((s) => {
        sizes[s.name] = s.formattedValue;
      });
      return sizes;
    };
    return JSON.stringify(
      {
        typography: {
          fontSize: {
            mobile: toObj(mobileSteps),
            desktop: toObj(desktopSteps),
          },
        },
      },
      null,
      2
    );
  }
}