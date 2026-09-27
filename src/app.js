var express = require("express");
var analytics = require("./analytics");
var app = express();
var port = process.env.PORT || 3000;

app.use(analytics(process.env.GA_MEASUREMENT_ID));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/healthcheck", (req, res, next) => {
  res.send("OK");
});
