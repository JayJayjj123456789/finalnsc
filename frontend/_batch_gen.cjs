var fs2 = require("fs");
var path = require("path");
var BASE = path.resolve(__dirname, "src");
var TMP = path.join(__dirname, "_tmp.txt");
function w(rel) {
  var full = path.join(BASE, rel);
  fs2.mkdirSync(path.dirname(full), {recursive:true});
  fs2.writeFileSync(full, fs2.readFileSync(TMP, "utf8"));
  console.log("OK", rel);
}