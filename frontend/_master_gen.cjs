var fs2 = require("fs");
var path = require("path");
var BASE = path.resolve(__dirname, "src");
function w(rel, body) {
  var full = path.join(BASE, rel);
  fs2.mkdirSync(path.dirname(full), {recursive:true});
  fs2.writeFileSync(full, body);
  console.log("OK", rel);
}

var SQ = String.fromCharCode(39);
var DQ = String.fromCharCode(34);
var NL = String.fromCharCode(10);

w("components/results/RouteCard.tsx", [
  "import React from "+SQ+"react"+SQ+";",
  "import type { RouteResult } from "+SQ+"../../types"+SQ+";",
  "import { EcoBadge } from "+SQ+"./EcoBadge"+SQ+";",
  "import { CommunityBar } from "+SQ+"./CommunityBar"+SQ+";",
  "",
  "interface RouteCardProps {",
  "  route: RouteResult;",
  "  rank: number;",
  "  selected?: boolean;",
  "  onClick?: () => void;",
  "}",
  "",
  "export function RouteCard({ route, rank, selected, onClick }: RouteCardProps) {",
  "  if (selected === undefined) selected = false;",
  "  var sc = route.score;",
  "  var scoreColor = sc >= 80 ? "+SQ+"#006767"+SQ+" : sc >= 60 ? "+SQ+"#b8860b"+SQ+" : "+SQ+"#3d4949"+SQ+";",
  "  return (",
  "    <div onClick={onClick} style={{background: selected ? "+SQ+"rgba(0,103,103,0.06)"+SQ+" : "+SQ+"rgba(255,255,255,0.7)"+SQ+",",
  "      backdropFilter: "+SQ+"blur(24px)"+SQ+", border: selected ? "+SQ+"2px solid #006767"+SQ+" : "+SQ+"1px solid rgba(0,0,0,0.08)"+SQ+",",
  "      borderRadius: 16, padding: "+SQ+"24px 20px"+SQ+", cursor: "+SQ+"pointer"+SQ+"}}>",
  "      <h3 style={{fontSize:18,fontWeight:700,color:"+SQ+"#191c1d"+SQ+"}}>{route.name}</h3>",
  "      <p>Score: {route.score} | Cost: {route.total_cost} | Days: {route.days}</p>",
  "    </div>",
  "  );",
  "}",
].join(NL));

console.log("RouteCard done");