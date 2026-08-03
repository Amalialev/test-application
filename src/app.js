var express = require("express");
var fs = require("fs");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

var publicDir = path.join(__dirname, "..", "public");
var submissionsDir = path.join(__dirname, "..", "data", "submissions");

app.use(express.json({ limit: "200kb" }));
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.redirect("/intake-form.html");
});

app.get("/healthcheck", (req, res, next) => {
  res.send("OK");
});

app.post("/api/intake", (req, res) => {
  try {
    fs.mkdirSync(submissionsDir, { recursive: true });
    var stamp = new Date().toISOString().replace(/[:.]/g, "-");
    var file = path.join(submissionsDir, `intake-${stamp}.json`);
    fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Failed to save intake submission", err);
    res.status(500).json({ ok: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
