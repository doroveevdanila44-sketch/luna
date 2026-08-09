import type { Config } from 'tailwindcss'

/**
 * Токены зеркалят docs/DESIGN.md.
 * Значения цветов живут в app/globals.css как CSS-переменные,
 * сюда пробрасываются через var() — один источник правды.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        line: 'var(--line)',
        green: 'var(--green)',
        'green-dim': 'var(--green-dim)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: ['var(--font-unbounded)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-onest)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // docs/DESIGN.md — типографическая шкала
        h1: ['clamp(30px, 4.6vw, 52px)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        h2: ['clamp(20px, 2.6vw, 28px)', { lineHeight: '1.2', letterSpacing: '0.06em' }],
        h3: ['clamp(14px, 1.1vw, 16px)', { lineHeight: '1.25', letterSpacing: '0.02em' }],
        lead: ['16px', { lineHeight: '1.62' }],
        body: ['15px', { lineHeight: '1.6' }],
        caption: ['13px', { lineHeight: '1.55' }],
        eyebrow: ['12px', { lineHeight: '1.4', letterSpacing: '0.3em' }],
        btn: ['13px', { lineHeight: '1', letterSpacing: '0.14em' }],
        price: ['clamp(26px, 2.6vw, 34px)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        card: '10px',
        block: '14px',
        btn: '6px',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        'section-sm': '48px',
        'section-md': '64px',
        'section-lg': '96px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
