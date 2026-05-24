import React, { useEffect, useRef } from "react";

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
  icon: string;
  gradient?: boolean;
}

export function StatCounter({ target, suffix = "%", label, icon, gradient = false }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 1800, 1);
            const ep = 1 - Math.pow(1 - p, 4);
            el.innerHTML = Math.floor(ep * target).toString();
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const numStyle: React.CSSProperties = gradient
    ? { fontSize: 40, fontWeight: 800, background: "linear-gradient(135deg, #006767 0%, #008282 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
    : { fontSize: 40, fontWeight: 800, color: "#191c1d" };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 3, marginBottom: 4 }}>
        <span ref={ref} className="glow-num" style={numStyle}>0</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: gradient ? "#006767" : "#3d4949" }}>{suffix}</span>
      </div>
      <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3d4949", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{icon}</span>{label}
      </span>
    </div>
  );
}