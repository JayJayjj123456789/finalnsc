var fs2 = require("fs");
var path = require("path");
var BASE = path.resolve(__dirname, "src");
function w(rel, body) {
  var full = path.join(BASE, rel);
  fs2.mkdirSync(path.dirname(full), {recursive:true});
  fs2.writeFileSync(full, body);
  console.log("OK", rel);
}

w("components/home/HeroSection.tsx",
[]
  .join("
"));