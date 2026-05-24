const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const BASE = path.resolve(__dirname, "src");
const TMP = path.join(__dirname, "_tmp.txt");
const WRITER = path.join(__dirname, "_write2.cjs");
function w(r,b) { fs.writeFileSync(TMP, b); execSync("node " + JSON.stringify(WRITER) + " " + JSON.stringify(r), {stdio:"inherit"}); }

w("components/results/EcoBadge.tsx", [
  "import React from "+String.fromCharCode(39)+"react"+String.fromCharCode(39)+";",
  "",
  "interface EcoBadgeProps { carbonSaved: number; }",
  "",
  "export function EcoBadge({ carbonSaved }: EcoBadgeProps) {",
  "  return (",
  "    <span style={{display:"+String.fromCharCode(39)+"inline-flex"+String.fromCharCode(39)+",alignItems:"+String.fromCharCode(39)+"center"+String.fromCharCode(39)+",gap:4,fontSize:11,fontWeight:600,padding:"+String.fromCharCode(39)+"4px 10px"+String.fromCharCode(39)+",borderRadius:6,background:"+String.fromCharCode(39)+"rgba(0,103,103,0.1)"+String.fromCharCode(39)+",color:"+String.fromCharCode(39)+"#006767"+String.fromCharCode(39)+"}}>",
  "      <span className=\"material-symbols-outlined\" style={{fontSize:14}}>energy_savings_leaf</span>",
  "      {carbonSaved+"+String.fromCharCode(39)+"% "+String.fromCharCode(39)+"+"+String.fromCharCode(39)+"ลด CO₂"+String.fromCharCode(39)+"}",
  "    </span>",
  "  );",
  "}",
].join("
"));

console.log("done");