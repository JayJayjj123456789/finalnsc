import React from "react";

export function Footer() {
  return (
    <footer style={{
      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 24px", maxWidth: 1280, margin: "0 auto", zIndex: 10, position: "relative",
      background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)",
      borderTop: "1px solid rgba(188,201,200,0.2)",
    }}>
      <div style={{ fontSize: 11, color: "#3d4949" }}>© 2025 NSC Travel Intelligence. All rights reserved.</div>
      <div style={{ display: "flex", gap: 16 }}>
        <a href="#" style={{ color: "#3d4949", fontSize: 11, textDecoration: "none" }}>Privacy Policy</a>
        <a href="#" style={{ color: "#3d4949", fontSize: 11, textDecoration: "none" }}>Terms of Service</a>
        <a href="#" style={{ color: "#3d4949", fontSize: 11, textDecoration: "none" }}>System Status</a>
      </div>
    </footer>
  );
}