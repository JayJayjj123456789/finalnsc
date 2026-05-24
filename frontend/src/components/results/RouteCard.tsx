import React from 'react';
import type { RouteResult } from '../../types';
import { EcoBadge } from './EcoBadge';
import { CommunityBar } from './CommunityBar';

interface RouteCardProps {
  route: RouteResult;
  rank: number;
  selected?: boolean;
  onClick?: () => void;
}

export function RouteCard({ route, rank, selected = false, onClick }: RouteCardProps) {
  const scoreColor = route.score >= 80 ? '#006767' : route.score >= 60 ? '#b8860b' : '#3d4949';
  return (
    <div onClick={onClick} style={{
      background: selected ? 'rgba(0,103,103,0.06)' : 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(24px)',
      border: selected ? '2px solid #006767' : '1px solid rgba(0,0,0,0.08)',
      borderRadius: 16, padding: '24px 20px', cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: selected ? '0 4px 24px rgba(0,103,103,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#3d4949', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {'เส้นทางที่ ' + rank}
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#191c1d', marginTop: 2, fontFamily: "'Noto Serif Thai', serif" }}>
            {route.name}
          </h3>
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, ' + scoreColor + '22, ' + scoreColor + '11)',
          border: '2px solid ' + scoreColor + '44',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{route.score}</span>
          <span style={{ fontSize: 8, color: scoreColor }}>คะแนน</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        <div style={{ textAlign: 'center', padding: '8px 4px', background: 'rgba(0,103,103,0.04)', borderRadius: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#006767' }}>{(route.total_cost / 1000).toFixed(1)}k</div>
          <div style={{ fontSize: 10, color: '#3d4949', textTransform: 'uppercase', letterSpacing: '0.05em' }}>บาท</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px 4px', background: 'rgba(0,103,103,0.04)', borderRadius: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#006767' }}>{route.days}</div>
          <div style={{ fontSize: 10, color: '#3d4949', textTransform: 'uppercase', letterSpacing: '0.05em' }}>วัน</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px 4px', background: 'rgba(0,103,103,0.04)', borderRadius: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#006767' }}>{route.co2_kg.toFixed(1)}</div>
          <div style={{ fontSize: 10, color: '#3d4949', textTransform: 'uppercase', letterSpacing: '0.05em' }}>kg CO₂</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <EcoBadge carbonSaved={route.carbon_saved_pct} />
        <CommunityBar percentage={route.community_percentage} />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {route.highlights.map((h, i) => (
          <span key={i} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, background: 'rgba(0,103,103,0.08)', color: '#006767' }}>{h}</span>
        ))}
      </div>
    </div>
  );
}
