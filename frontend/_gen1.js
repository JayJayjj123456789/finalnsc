var fs = require("fs");
var path = require("path");
var BASE = path.resolve(__dirname, "src");
function w(rel, body) {
  var full = path.join(BASE, rel);
  fs.mkdirSync(path.dirname(full), {recursive:true});
  fs.writeFileSync(full, body);
  console.log("OK", rel);
}

// EcoBadge
w("components/results/EcoBadge.tsx", [
  "import React from "react";",
  "",
  "interface EcoBadgeProps { carbonSaved: number; }",
  "",
  "export function EcoBadge({ carbonSaved }: EcoBadgeProps) {",
  "  return (",
  "    <span style={{display:"inline-flex",alignItems:"center",gap:4,",
  "      fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,",
  "      background:"rgba(0,103,103,0.1)",color:"#006767"}}>",
  "      <span className=\"material-symbols-outlined\" style={{fontSize:14}}>energy_savings_leaf</span>",
  "      {carbonSaved+"% ลด CO₂"}",
  "    </span>",
  "  );",
  "}",
].join("
"));

console.log("EcoBadge done");