var fs = require("fs");
var path = require("path");

var dbPath = path.join(__dirname, "..", "data", "db.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
  } catch (err) {
    return { patients: [] };
  }
}

function save(db) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  var tmp = dbPath + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, dbPath);
}

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

module.exports = { load: load, save: save, newId: newId };
