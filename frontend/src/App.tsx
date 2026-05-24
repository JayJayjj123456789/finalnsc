import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { SearchForm } from './components/home/SearchForm';
import { ExamplePrompts } from './components/home/ExamplePrompts';
import { StatCounter } from './components/ui/StatCounter';
import { LoadingPage } from './pages/LoadingPage';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { ResultPage } from './pages/ResultPage';
import { ThreeMap } from './components/map/ThreeMap';
import { usePlan } from './hooks/usePlan';

function App() {
  const plan = usePlan();

  const handleSearch = (query: string) => plan.submitPlan({ query });

  /* Results view */
  if (plan.result) {
    return <ResultPage result={plan.result} onBack={plan.reset} />;
  }

  /* Loading view */
  if (plan.loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at 50% -20%, #ffffff 0%, #f8f9fa 70%)', color: '#191c1d' }}>
        <Navbar onHomeClick={plan.reset} />
        <main style={{ flexGrow: 1, paddingTop: 48 }}><LoadingPage /></main>
        <Footer />
      </div>
    );
  }

  /* Error view */
  if (plan.error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at 50% -20%, #ffffff 0%, #f8f9fa 70%)', color: '#191c1d' }}>
        <Navbar onHomeClick={plan.reset} />
        <main style={{ flexGrow: 1, paddingTop: 48 }}>
          <ErrorMessage message={plan.error} onRetry={plan.reset} />
        </main>
        <Footer />
      </div>
    );
  }

  /* Home view (default) */
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden',
      background: 'radial-gradient(circle at 50% -20%, #ffffff 0%, #f8f9fa 70%)',
      color: '#191c1d', fontFamily: 'Inter, sans-serif', WebkitFontSmoothing: 'antialiased',
    }}>
      <Navbar />
      <main style={{
        flexGrow: 1, position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        minHeight: '100vh', width: '100%', paddingTop: 48,
      }}>
        <div style={{
          position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -2,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(248,249,250,0.6)', backdropFilter: 'blur(2px)',
          }} />
        </div>

        <HeroSection>
          <SearchForm onSearch={handleSearch} loading={plan.loading} />
          <ExamplePrompts onSelect={handleSearch} />
          <div style={{
            display: 'flex', flexDirection: 'row', gap: 12, marginTop: 16,
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <button
              className="glass-button-primary"
              onClick={() => {
                const input = document.querySelector('.glass-input') as HTMLInputElement;
                if (input?.value.trim()) handleSearch(input.value.trim());
              }}
              style={{
                padding: '10px 22px', borderRadius: 10, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, border: 'none',
                fontSize: 14, fontWeight: 600,
              }}
            >
              เริ่มวางแผนทริป <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
            <button className="glass-button-secondary" style={{
              padding: '10px 22px', borderRadius: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500,
            }}>
              ดูตัวอย่าง
            </button>
          </div>
        </HeroSection>

        {/* Map Section */}
        <section style={{
          position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280,
          height: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 40, padding: '0 16px',
        }}>
          <ThreeMap />
        </section>

        {/* Stats Section */}
        <section style={{
          position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280,
          margin: 'auto 0 0', padding: '0 24px 40px',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)',
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16,
            padding: '28px 24px', width: '100%', maxWidth: 800, margin: '0 auto',
            boxShadow: '0 4px 24px rgba(0,103,103,0.06)',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'center',
            }}>
              <StatCounter target={70} suffix="%" label="ประหยัดเวลา" icon="schedule" />
              <div style={{ borderLeft: '1px solid rgba(188,201,200,0.3)' }}>
                <StatCounter target={35} suffix="%" label="ลดคาร์บอน" icon="energy_savings_leaf" gradient={true} />
              </div>
              <div style={{ borderLeft: '1px solid rgba(188,201,200,0.3)' }}>
                <StatCounter target={100} suffix="%" label="ฟรี" icon="bolt" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
