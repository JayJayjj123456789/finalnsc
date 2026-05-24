import React from 'react';

export function LoadingPage() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 40,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        border: '3px solid rgba(0,103,103,0.1)', borderTop: '3px solid #006767',
        animation: 'spin 1s linear infinite',
      }} />
      <p style={{ marginTop: 24, fontSize: 16, color: '#3d4949', fontWeight: 500 }}>
        กำลังวิเคราะห์แผนทริป...
      </p>
      <p style={{ marginTop: 8, fontSize: 13, color: '#bcc9c8' }}>
        AI กำลังคำนวณเส้นทาง คาร์บอน และผลกระทบชุมชน
      </p>
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  );
}
