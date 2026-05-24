import React from 'react';
import type { RouteDay, RouteStop } from '../../types';

interface ItineraryDayProps { day: RouteDay; }

function StopItem({ stop, isLast }: { stop: RouteStop; isLast: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 12, height: 12, borderRadius: '50%', background: '#006767',
          border: '3px solid rgba(0,103,103,0.2)', flexShrink: 0,
        }} />
        {!isLast && <div style={{ width: 2, flexGrow: 1, background: 'rgba(0,103,103,0.15)', margin: '4px 0' }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 16, flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#191c1d' }}>{stop.name}</span>
          <span style={{ fontSize: 11, color: '#3d4949', background: 'rgba(0,103,103,0.08)', padding: '2px 8px', borderRadius: 4 }}>
            {stop.duration_min} นาที
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#006767', marginTop: 2 }}>
          ประเภท: {stop.type} • ค่าใช้จ่าย: {stop.cost_baht} บาท
        </div>
      </div>
    </div>
  );
}

export function ItineraryDay({ day }: ItineraryDayProps) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: '#006767', fontFamily: "'Noto Serif Thai', serif" }}>
          {'วันที่ ' + day.day}
        </h4>
        <span style={{ fontSize: 12, color: '#3d4949', background: 'rgba(0,103,103,0.08)', padding: '4px 12px', borderRadius: 6 }}>
          {day.day_cost} บาท
        </span>
      </div>
      {day.activities.map((stop, i) => (
        <StopItem key={i} stop={stop} isLast={i === day.activities.length - 1} />
      ))}
    </div>
  );
}
