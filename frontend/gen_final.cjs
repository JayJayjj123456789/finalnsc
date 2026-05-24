const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const BASE = "E:/finalnsc/smart-travel-planner/frontend/src";
const TMP = "E:/finalnsc/smart-travel-planner/frontend/_tmp.txt";
const WRITER = "E:/finalnsc/smart-travel-planner/frontend/_write2.cjs";
function w(r,b){fs.writeFileSync(TMP,b);execSync("node ""+WRITER+"" ""+r+""",{stdio:"inherit"});}

// EcoBadge
w("components/results/EcoBadge.tsx",[
  "import React from "react";",
  "",
  "interface EcoBadgeProps { carbonSaved: number; }",
  "",
  "export function EcoBadge({ carbonSaved }: EcoBadgeProps) {",
  "  return (",
  "    <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,background:"rgba(0,103,103,0.1)",color:"#006767"}}>",
  "      <span className="material-symbols-outlined" style={{fontSize:14}}>energy_savings_leaf</span>",
  "      {carbonSaved+"% ลด CO₂"}",
  "    </span>",
  "  );",
  "}",
].join("
"));

console.log("EcoBadge done");