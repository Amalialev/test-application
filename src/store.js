var fs = require("fs");
var path = require("path");

// שני מצבי אחסון:
// 1. DATABASE_URL מוגדר (פריסה בענן) - שמירה ב-Postgres (למשל Neon בחינם)
// 2. אחרת (הרצה מקומית) - שמירה בקובץ data/db.json
var databaseUrl = process.env.DATABASE_URL || "";

var load, save;

if (databaseUrl) {
  var Pool = require("pg").Pool;
  var pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes("localhost") ? false : { rejectUnauthorized: false }
  });
  var ready = pool.query(
    "CREATE TABLE IF NOT EXISTS clinic_db (id int PRIMARY KEY, doc jsonb NOT NULL)"
  );

  load = function () {
    return ready.then(function () {
      return pool.query("SELECT doc FROM clinic_db WHERE id = 1");
    }).then(function (r) {
      return r.rows.length ? r.rows[0].doc : { patients: [] };
    });
  };

  save = function (db) {
    return ready.then(function () {
      return pool.query(
        "INSERT INTO clinic_db (id, doc) VALUES (1, $1) " +
        "ON CONFLICT (id) DO UPDATE SET doc = $1",
        [JSON.stringify(db)]
      );
    });
  };
} else {
  var dataDir = process.env.DATA_DIR || path.join(__dirname, "..", "data");
  var dbPath = path.join(dataDir, "db.json");

  load = function () {
    return new Promise(function (resolve) {
      try {
        resolve(JSON.parse(fs.readFileSync(dbPath, "utf8")));
      } catch (err) {
        resolve({ patients: [] });
      }
    });
  };

  save = function (db) {
    return new Promise(function (resolve, reject) {
      try {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        var tmp = dbPath + ".tmp";
        fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
        fs.renameSync(tmp, dbPath);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
}

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

module.exports = { load: load, save: save, newId: newId };
