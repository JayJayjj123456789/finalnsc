import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SearchForm } from '../components/home/SearchForm';
import { ExamplePrompts } from '../components/home/ExamplePrompts';
import { StatCounter } from '../components/ui/StatCounter';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

interface HomePageProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function HomePage({ onSearch, loading = false }: HomePageProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', background: 'radial-gradient(circle at 50% -20%, #ffffff 0%, #f8f9fa 70%)', color: '#191c1d', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main style={{ flexGrow: 1, position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%', paddingTop: 48 }}>
        <HeroSection>
          <SearchForm onSearch={onSearch} loading={loading} />
          <ExamplePrompts onSelect={onSearch} />
          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, marginTop: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="glass-button-primary" style={{ padding: '10px 22px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, border: 'none', fontSize: 14, fontWeight: 600 }}>
              เริ่มวางแผนทริป <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
            <button className="glass-button-secondary" style={{ padding: '10px 22px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500 }}>
              ดูตัวอย่าง
            </button>
          </div>
        </HeroSection>
        <section style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: 'auto 0 0', padding: '0 24px 40px' }}>
          <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '28px 24px', width: '100%', maxWidth: 800, margin: '0 auto', boxShadow: '0 4px 24px rgba(0,103,103,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'center' }}>
              <StatCounter target={70} suffix="%" label="Save Time" icon="schedule" />
              <div style={{ borderLeft: '1px solid rgba(188,201,200,0.3)' }}>
                <StatCounter target={35} suffix="%" label="Reduce Carbon" icon="energy_savings_leaf" gradient={true} />
              </div>
              <div style={{ borderLeft: '1px solid rgba(188,201,200,0.3)' }}>
                <StatCounter target={100} suffix="%" label="Free" icon="bolt" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
