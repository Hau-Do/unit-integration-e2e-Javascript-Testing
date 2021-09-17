const express = require("express");
const feed = require("./fixtures/feed.json");

const app = express();
const port = 3002;

// Allow CORS for local setup
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => res.send("Hello world!"));
app.get("/feed", (req, res) => res.send(feed));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
