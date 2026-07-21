import type { CSSProperties } from 'react';

interface ImagePlaceholderProps {
  label: string;
  style?: CSSProperties;
  className?: string;
}

export default function ImagePlaceholder({ label, style, className }: ImagePlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8px',
        background:
          'repeating-linear-gradient(45deg, oklch(92% 0.01 95), oklch(92% 0.01 95) 10px, oklch(89% 0.01 95) 10px, oklch(89% 0.01 95) 20px)',
        color: 'oklch(45% 0.02 150)',
        font: '600 12px Inter, sans-serif',
        ...style,
      }}
    >
      {label}
    </div>
  );
}
