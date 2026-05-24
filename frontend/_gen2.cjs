// Auto-generated file creator
var fs2 = require("fs");
var path = require("path");
var BASE = path.resolve(__dirname, "src");
function w(rel, body) {
  var full = path.join(BASE, rel);
  fs2.mkdirSync(path.dirname(full), {recursive:true});
  fs2.writeFileSync(full, body);
  console.log("OK", rel);
}

// CommunityBar
w("components/results/CommunityBar.tsx",
  "import React from "react";
" +
  "
" +
  "interface CommunityBarProps { percentage: number; }
" +
  "
" +
  "export function CommunityBar({ percentage }: CommunityBarProps) {
" +
  "  return (
" +
  "    <div style={{display:"inline-flex",alignItems:"center",gap:6}}>
" +
  "      <span style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:6,
" +
  "        background:"rgba(184,134,11,0.1)",color:"#b8860b",
" +
  "        display:"inline-flex",alignItems:"center",gap:4}}>
" +
  "        <span className=\"material-symbols-outlined\" style={{fontSize:14}}>diversity_3</span>
" +
  "        {"ชุมชน "+percentage+"%"}
" +
  "      </span>
" +
  "      <div style={{width:48,height:4,background:"rgba(184,134,11,0.15)",borderRadius:2,overflow:"hidden"}}>
" +
  "        <div style={{width:percentage+"%",height:"100%",background:"#b8860b",borderRadius:2}} />
" +
  "      </div>
" +
  "    </div>
" +
  "  );
" +
  "}
"
);

console.log("CommunityBar done");