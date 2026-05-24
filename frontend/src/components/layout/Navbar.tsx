import React from "react";

interface NavbarProps {
  onHomeClick?: () => void;
}

export function Navbar({ onHomeClick }: NavbarProps) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "6px 24px", height: 48, zIndex: 50,
      background: "rgba(248,249,250,0.85)", backdropFilter: "blur(40px)",
      borderBottom: "1px solid rgba(188,201,200,0.3)",
    }}>
      <div style={{
        fontSize: 18, fontWeight: 700, color: "#006767",
        fontFamily: "'Noto Serif Thai', serif", cursor: "pointer",
      }} onClick={onHomeClick}>
        NSC 2025
      </div>
      <div style={{ display: "none", gap: 32, alignItems: "center" }} className="md-nav">
        <a href="#" style={{ color: "#3d4949", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>ปลายทาง</a>
        <a href="#" style={{ color: "#3d4949", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>แผนการเดินทาง</a>
        <a href="#" style={{ color: "#3d4949", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>ข้อมูลเชิงลึก</a>
        <a href="#" style={{ color: "#3d4949", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>ราคา</a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button style={{ color: "#3d4949", fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>เข้าสู่ระบบ</button>
        <button className="glass-button-primary" style={{ border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>เริ่มต้น</button>
      </div>
    </nav>
  );
}