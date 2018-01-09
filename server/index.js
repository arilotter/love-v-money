const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const flatfile = require("flat-file-db");

const DB_PATH = path.resolve(__dirname, "..", "userdata.db");
const db = flatfile.sync(DB_PATH);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.put("/api/people", (req, res) => {
  const guid = req.body.guid;
  delete req.body.guid;
  res.sendStatus(200);
});

app.post("/api/people", (req, res) => {
  res.send(db.get(req.body.guid) || {} );
});

app.get("/api/people", (req, res) => {
  const keys = db.keys();
  const itemsToTake = Math.min(keys.length, 10);
  const randKeys = getRandom(keys, itemsToTake);
  const people = randKeys.map(key => db.get(key));
  res.send({ people });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

function getRandom(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
  return result;
}
