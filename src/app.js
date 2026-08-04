var express = require("express");
var path = require("path");
var store = require("./store");

var app = express();
var port = process.env.PORT || 3000;

var publicDir = path.join(__dirname, "..", "public");

app.use(express.json({ limit: "500kb" }));
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.redirect("/intake-form.html");
});

app.get("/healthcheck", (req, res, next) => {
  res.send("OK");
});

// שאלון מקדים - יוצר או מעדכן כרטיס מטופלת
app.post("/api/intake", (req, res) => {
  try {
    var db = store.load();
    var intake = req.body || {};
    var name = (intake["שם מלא"] || "").trim();
    var phone = (intake["טלפון"] || "").trim();

    var patient = db.patients.find(function (p) {
      if (phone && p.phone && p.phone === phone) return true;
      return name && p.name === name;
    });

    if (patient) {
      patient.intake = intake;
      if (!patient.phone && phone) patient.phone = phone;
    } else {
      patient = {
        id: store.newId(),
        name: name || "ללא שם",
        phone: phone,
        createdAt: new Date().toISOString(),
        intake: intake,
        firstVisit: null,
        sessions: [],
        notes: "",
        seriesSummary: null
      };
      db.patients.push(patient);
    }

    store.save(db);
    res.status(201).json({ ok: true, patientId: patient.id });
  } catch (err) {
    console.error("Failed to save intake submission", err);
    res.status(500).json({ ok: false });
  }
});

app.get("/api/patients", (req, res) => {
  var db = store.load();
  res.json(
    db.patients.map(function (p) {
      var last = p.sessions.length ? p.sessions[p.sessions.length - 1].date : null;
      return {
        id: p.id,
        name: p.name,
        phone: p.phone,
        createdAt: p.createdAt,
        hasIntake: !!p.intake,
        hasFirstVisit: !!p.firstVisit,
        sessionCount: p.sessions.length,
        lastSessionDate: last
      };
    })
  );
});

app.post("/api/patients", (req, res) => {
  var db = store.load();
  var patient = {
    id: store.newId(),
    name: (req.body.name || "").trim() || "ללא שם",
    phone: (req.body.phone || "").trim(),
    createdAt: new Date().toISOString(),
    intake: null,
    firstVisit: null,
    sessions: [],
    notes: "",
    seriesSummary: null
  };
  db.patients.push(patient);
  store.save(db);
  res.status(201).json(patient);
});

function findPatient(db, id) {
  return db.patients.find(function (p) { return p.id === id; });
}

app.get("/api/patients/:id", (req, res) => {
  var db = store.load();
  var patient = findPatient(db, req.params.id);
  if (!patient) return res.status(404).json({ ok: false });
  res.json(patient);
});

app.put("/api/patients/:id", (req, res) => {
  var db = store.load();
  var patient = findPatient(db, req.params.id);
  if (!patient) return res.status(404).json({ ok: false });

  ["name", "phone", "intake", "firstVisit", "sessions", "notes", "seriesSummary"]
    .forEach(function (key) {
      if (key in req.body) patient[key] = req.body[key];
    });

  store.save(db);
  res.json({ ok: true });
});

app.delete("/api/patients/:id", (req, res) => {
  var db = store.load();
  var before = db.patients.length;
  db.patients = db.patients.filter(function (p) { return p.id !== req.params.id; });
  if (db.patients.length === before) return res.status(404).json({ ok: false });
  store.save(db);
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
