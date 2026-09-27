var fs = require("fs");
var path = require("path");
var express = require("express");
var analytics = require("./analytics");
var app = express();
var port = process.env.PORT || 3000;

var homePage = fs.readFileSync(path.join(__dirname, "pages", "home.html"), "utf8");

app.use(analytics(process.env.GA_MEASUREMENT_ID));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res, next) => {
  res.type("html").send(homePage);
});

app.get("/healthcheck", (req, res, next) => {
  res.send("OK");
});
