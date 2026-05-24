import React, { useState } from 'react';
import type { PlanResponse } from '../types';
import { RouteCard } from '../components/results/RouteCard';
import { ItineraryDay } from '../components/results/ItineraryDay';
import { CostBreakdown } from '../components/results/CostBreakdown';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

interface ResultPageProps {
  result: PlanResponse;
  onBack: () => void;
}

export function ResultPage({ result, onBack }: ResultPageProps) {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const route = result.routes[selectedRoute];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: 'radial-gradient(circle at 50% -20%, #ffffff 0%, #f8f9fa 70%)',
      color: '#191c1d',
    }}>
      <Navbar onHomeClick={onBack} />
      <main style={{
        flexGrow: 1, padding: '64px 24px 40px',
        maxWidth: 1280, margin: '0 auto', width: '100%',
      }}>
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={onBack}
            className="glass-button-secondary"
            style={{
              padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
            ค้นหาใหม่
          </button>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#191c1d', marginTop: 16 }}>
            {'ผลลัพธ์สำหรับ: ' + result.query}
          </h2>
          <p style={{ color: '#3d4949', marginTop: 4 }}>
            พบ {result.routes.length} เส้นทาง
          </p>
        </div>

        {/* Route Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 32 }}>
          {result.routes.map((r, i) => (
            <RouteCard
              key={i}
              route={r}
              rank={i + 1}
              selected={i === selectedRoute}
              onClick={() => setSelectedRoute(i)}
            />
          ))}
        </div>

        {/* Detail Section */}
        {route && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#006767', marginBottom: 16, fontFamily: "'Noto Serif Thai', serif" }}>
                แผนการเดินทาง
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {route.days_detail.map((day, i) => (
                  <ItineraryDay key={i} day={day} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <CostBreakdown route={route} />
              <div style={{
                background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)',
                border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: 20,
              }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#006767', marginBottom: 12 }}>
                  รายละเอียดคะแนน
                </h4>
                <div style={{ fontSize: 13, color: '#3d4949', lineHeight: 2 }}>
                  ค่าใช้จ่าย: {route.total_cost.toLocaleString()} บาท
                  <br />CO₂: {route.co2_kg.toFixed(1)} kg
                  <br />ชุมชน: {route.community_percentage}%
                  <br />ลดคาร์บอน: {route.carbon_saved_pct}%
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
