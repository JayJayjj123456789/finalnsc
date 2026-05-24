import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { RouteResult } from '../../types';

interface CostBreakdownProps { route: RouteResult; }

const COLORS = ['#006767', '#008282', '#6fd7d6', '#bcc9c8', '#3d4949'];

export function CostBreakdown({ route }: CostBreakdownProps) {
  const typeMap: Record<string, number> = {};
  route.days_detail.forEach(day => {
    day.activities.forEach(stop => {
      typeMap[stop.type] = (typeMap[stop.type] || 0) + stop.cost_baht;
    });
  });
  const data = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '20px 16px' }}>
      <h4 style={{ fontSize: 16, fontWeight: 700, color: '#006767', marginBottom: 16, fontFamily: "'Noto Serif Thai', serif" }}>
        สรุปค่าใช้จ่าย
      </h4>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 120, height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={3} dataKey="value">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(val: number) => val + ' บาท'} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1 }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i % COLORS.length] }} />
                <span style={{ fontSize: 12, color: '#3d4949' }}>{d.name}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#191c1d' }}>
                {d.value} บาท ({((d.value / total) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 8, marginTop: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#191c1d' }}>รวม</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#006767' }}>{total} บาท</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
