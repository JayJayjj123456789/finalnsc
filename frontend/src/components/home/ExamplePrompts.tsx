import React from 'react';

const EXAMPLES = [
  'ไปเที่ยวราชสีมา 3 วัน งบ 5000 บาท',
  'เที่ยวเชียงใหม่ 2 วัน ราคาท่อนั้นต่ำที่สุด',
  'ทริปเกาะลพบุรี 4 วันหรือยาวละพุ่ง',
];

interface ExamplePromptsProps {
  onSelect: (query: string) => void;
}

export function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
      {EXAMPLES.map((ex, i) => (
        <button key={i} onClick={() => onSelect(ex)} className="glass-button-secondary" style={{
          fontSize: 12, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', border: '1px solid #bcc9c8',
        }}>
          {ex}
        </button>
      ))}
    </div>
  );
}
