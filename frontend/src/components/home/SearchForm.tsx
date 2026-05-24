import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function SearchForm({ onSearch, loading = false }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{
      width: '100%', maxWidth: 580, marginTop: 16, marginBottom: 20, position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 16, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
        <span className="material-symbols-outlined" style={{ color: '#3d4949', fontSize: 20 }}>search</span>
      </div>
      <input
        className="glass-input"
        style={{
          width: '100%', padding: '12px 130px 12px 44px', borderRadius: 12, fontSize: 14,
          color: '#191c1d', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
        }}
        placeholder="วางแผนทริปแบบอัจฉริยะ... เช่น ไปเที่ยวนครราชสีมา 3 วัน งบ 5000"
        type="text" value={query} onChange={e => setQuery(e.target.value)} disabled={loading}
      />
      <div style={{ position: 'absolute', top: 5, bottom: 5, right: 5, display: 'flex', alignItems: 'center' }}>
        <button type="submit" disabled={loading || !query.trim()} className="glass-button-primary" style={{
          border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 6, height: '100%', cursor: 'pointer',
          transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(0,103,103,0.2)',
          opacity: loading || !query.trim() ? 0.6 : 1,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>auto_awesome</span>
          {'สร้างทริป'}
        </button>
      </div>
    </form>
  );
}
