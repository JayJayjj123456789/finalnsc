
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const BASE = path.resolve(__dirname, "src");
const TMP = path.join(__dirname, "_tmp.txt");
const WRITER = path.join(__dirname, "_write2.cjs");
function w(r,b) { fs.writeFileSync(TMP, b); execSync("node " + JSON.stringify(WRITER) + " " + JSON.stringify(r), {stdio:"inherit"}); }

// 1. EcoBadge
w("components/results/EcoBadge.tsx", "import React from 'react';

interface EcoBadgeProps { carbonSaved: number; }

export function EcoBadge({ carbonSaved }: EcoBadgeProps) {
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:6,background:'rgba(0,103,103,0.1)',color:'#006767'}}>
      <span className=\"material-symbols-outlined\" style={{fontSize:14}}>energy_savings_leaf</span>
      {carbonSaved+'% '+\" ลด CO₂\"}
    </span>
  );
}");

console.log("EcoBadge done");
