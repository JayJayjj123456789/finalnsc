import React from 'react';

const HERO_TEXT = 'วางแผนท่องเที่ยวอัจฉริยะ นครราชสีมา';
const SUB_TEXT = 'Multi-Agent AI คำนวณงบประมาณ คาร์บอน และชุมชนให้อัตโนมัติ';

function heroSpans() {
  return HERO_TEXT.split('').map((ch, i) => ({
    ch: ch === ' ' ? ' ' : ch,
    delay: (i * 0.06).toFixed(2),
  }));
}

interface HeroSectionProps {
  children?: React.ReactNode;
}

export function HeroSection({ children }: HeroSectionProps) {
  const spans = heroSpans();
  return (
    <section style={{
      position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280,
      margin: '0 auto', padding: '56px 24px 16px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    }}>
      <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <h1
          className="hero-animated-title"
          aria-label={HERO_TEXT}
          style={{
            fontWeight: 800, letterSpacing: '-0.02em',
            fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.1,
            fontFamily: "'Noto Serif Thai', serif",
          }}
        >
          {spans.map((s, i) => (
            <span key={i} style={{
              display: 'inline', animationDelay: s.delay + 's',
              background: 'linear-gradient(135deg, #006767 0%, #191c1d 40%, #3d4949 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {s.ch}
            </span>
          ))}
        </h1>
        <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <p className="subtitle-typewriter" style={{
            color: '#3d4949', fontSize: 'clamp(14px, 2vw, 22px)', fontWeight: 500,
            fontFamily: "'Noto Serif Thai', serif", letterSpacing: '0.02em',
            whiteSpace: 'nowrap', overflow: 'hidden', borderRight: '2px solid #006767',
          }}>
            {SUB_TEXT}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}
